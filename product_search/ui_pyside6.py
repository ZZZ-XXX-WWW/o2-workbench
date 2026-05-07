# -*- coding: utf-8 -*-
"""ui_pyside6.py - PySide6 Modern UI with Image Remarks"""
import os, sys, io, re, threading
if getattr(sys, 'frozen', False):
    AP = os.path.dirname(sys.executable)
else:
    AP = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AP)
from database import ProductDatabase
from PySide6.QtWidgets import *
from PySide6.QtCore import *


class _SearchWorker(QObject):
    finished = Signal(object)
    error = Signal(str)

    def __init__(self, parent, db, search_path, use_rerank, top_k, prompt):
        # 必须保持无父对象，否则 moveToThread 会失败，任务可能跑在主线程导致 UI 卡死
        super().__init__(None)
        self.db = db
        self.search_path = search_path
        self.use_rerank = use_rerank
        self.top_k = top_k
        self.prompt = prompt

    def run(self):
        try:
            if self.use_rerank:
                rs = self.db.search_with_rerank(
                    self.search_path,
                    top_k=self.top_k,
                    recall_k=10,
                    batch_size=3,
                    prompt=self.prompt
                )
            else:
                rs = self.db.search(self.search_path, top_k=self.top_k, prompt=self.prompt)
            self.finished.emit(rs)
        except Exception as e:
            self.error.emit(str(e))
from PySide6.QtGui import *
from PIL import Image

DB = os.path.join(AP, "data", "products.json")
HDR_BLUE_IMG = os.path.join(AP, "header_grad.png")
HDR_PURPLE_IMG = os.path.join(AP, "header_grad2.png")
C = {"bg":"#F5F5F7","inp":"#F0F0F5","blu":"#4A90E2","pur":"#9B59B6",
     "grn":"#27AE60","orng":"#E67E22","red":"#E74C3C","drk":"#1A1A1A","mid":"#555","lt":"#999","bdr":"#E0E0E5"}

# 商品图片入库时的语义对齐指令（内衣/内裤专用）
PRODUCT_PROMPT = (
    "请仔细对比商品的罩杯款式（全罩杯/半罩杯/三角杯）、肩带宽度与位置、"
    "蕾丝/刺绣的花纹与密度、边缘做工（包边，光面、无线头）、"
    "材质质感（蕾丝、棉质、网纱、缎面），以及颜色与图案分布。"
    "请忽略背景和模特因素的差异。"
)

# 搜索时的 Rerank 指令（精排阶段使用）
RERANK_PROMPT = (
    "请仔细对比商品图片的款式细节、花纹图案、腰带设计以及材质质感，"
    "忽略背景和模特因素的差异，找出与图中商品款式和风格完全一致的同款。"
)

def sh(w, blur=12):
    s = QGraphicsDropShadowEffect()
    s.setBlurRadius(blur); s.setOffset(0, 2); s.setColor(QColor(0, 0, 0, 35)); w.setGraphicsEffect(s)

def bst(btn, bg, fg="#FFF", r=8):
    btn.setStyleSheet(
        "QPushButton{background:" + bg + ";color:" + fg +
        ";border:none;border-radius:" + str(r) + "px;padding:8px 16px;font:10pt Microsoft YaHei;}"
        "QPushButton:hover{opacity:0.85;}"
    )

def gpx(path, w, h):
    if not path: return QPixmap()
    try:
        if not os.path.isabs(path): path = os.path.join(AP, path)
        i = Image.open(path); i.thumbnail((w, h), Image.LANCZOS)
        buf = io.BytesIO(); i.save(buf, format="PNG"); buf.seek(0)
        return QPixmap.fromImage(QImage.fromData(buf.read()))
    except: return QPixmap()

def card(f):
    f.setStyleSheet("QFrame{background:#FFF;border-radius:12px;border:1px solid #E8E8EC;}"); sh(f, 6)

class Dl(QLabel):
    def __init__(s, cb=None):
        super().__init__(); s.cb = cb
        s.setAcceptDrops(True); s.setAlignment(Qt.AlignCenter)
        s.setStyleSheet("QLabel{background:#F0F0F5;border:2px dashed #CCC;border-radius:8px;color:#999;font:10pt Microsoft YaHei;}")
    def dragEnterEvent(s, e):
        if e.mimeData().hasUrls(): e.acceptProposedAction()
    def dropEvent(s, e):
        if e.mimeData().hasUrls() and s.cb: s.cb(e.mimeData().urls()[0].toLocalFile())

class MW(QMainWindow):
    def __init__(s):
        super().__init__()
        s.db = ProductDatabase(DB); s.sel = None; s.search_path = None; s._all_prods_cache = None
        s._searching = False; s._search_thread = None; s._search_worker = None
        s._active_use_rerank = False; s._search_id = 0
        s.setWindowTitle("商品图片同款搜索")
        s.setFixedSize(1200, 870); s.setMinimumSize(1020, 820)
        s.setStyleSheet("QMainWindow{background:#F5F5F7;}")
        # Gradient header bar
        hdr = QFrame(); hdr.setFixedHeight(68)
        hdr.setAutoFillBackground(False)
        hdrGrad = QLabel(hdr)
        hdrGrad.setPixmap(QPixmap(HDR_BLUE_IMG).scaled(3000, 68, Qt.IgnoreAspectRatio, Qt.SmoothTransformation))
        hdrGrad.setFixedSize(3000, 68)
        hdrGrad.lower()
        hdrLayout = QHBoxLayout(hdr); hdrLayout.setContentsMargins(24, 0, 20, 0)
        hdrTitle = QLabel("🛍️ 商品图片同款搜索")
        hdrTitle.setStyleSheet("color:white;font:14pt Microsoft YaHei;font-weight:bold;")
        hdrLayout.addWidget(hdrTitle); hdrLayout.addStretch(1)
        s.statLbl = QLabel("📦 共 0 件商品")
        s.statLbl.setStyleSheet("color:white;font:10pt Microsoft YaHei;padding:4px 8px;")
        hdrLayout.addWidget(s.statLbl)
        w = QWidget(); s.setCentralWidget(w)
        mainLayout = QVBoxLayout(w); mainLayout.setContentsMargins(15, 10, 15, 10); mainLayout.setSpacing(15)
        mainLayout.addWidget(hdr)
        bodyLayout = QHBoxLayout(); bodyLayout.setSpacing(15)
        bodyLayout.addWidget(s.lp()); bodyLayout.addWidget(s.rp(), 1)
        mainLayout.addLayout(bodyLayout)
        # 搜索/精排时居中悬浮提示（非模态，不阻塞主线程）
        s._loading_w = QFrame(s)
        s._loading_w.setFixedSize(220, 80)
        s._loading_w.setWindowFlags(Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint | Qt.Tool)
        s._loading_w.setStyleSheet("QFrame{background:rgba(30,30,30,200);border-radius:10px;}")
        lv = QVBoxLayout(s._loading_w); lv.setAlignment(Qt.AlignCenter); lv.setSpacing(6)
        s._spin_lbl = QLabel("⏳")
        s._spin_lbl.setStyleSheet("font-size:24pt;text-align:center;")
        s._spin_lbl.setAlignment(Qt.AlignCenter)
        s._loading_msg = QLabel("搜索中...")
        s._loading_msg.setStyleSheet("color:white;font:10pt Microsoft YaHei;")
        s._loading_msg.setAlignment(Qt.AlignCenter)
        lv.addWidget(s._spin_lbl); lv.addWidget(s._loading_msg)
        s._loading_w.hide()

        # 启动时预热数据库（加载向量到内存，后续搜索极速）
        total = s.db.warmup()
        s.upd()

    def lp(s):
        w = QWidget(); w.setStyleSheet("QWidget{background:#F5F5F7;}")
        l = QVBoxLayout(w); l.setSpacing(8)
        t = QLabel("📦 录入商品")
        t.setStyleSheet("color:#1A1A1A;font:12pt Microsoft YaHei;font-weight:bold;"); l.addWidget(t)
        pc = QFrame(); card(pc); pc.setFixedHeight(155); l.addWidget(pc)
        pv = QVBoxLayout(pc); pv.setContentsMargins(10, 10, 10, 10)
        s.prev = Dl(lambda p: s.si(p, True)); s.prev.setFixedHeight(110); pv.addWidget(s.prev, 1)
        b = QPushButton("📁 选择图片"); bst(b, "#1ABC9C")
        b.clicked.connect(lambda: s.si(None, True)); pv.addWidget(b)
        fc = QFrame(); card(fc); fc.setFixedHeight(500); l.addWidget(fc)
        fv = QVBoxLayout(fc); fv.setContentsMargins(10, 10, 10, 10); fv.setSpacing(6)
        s.ents = {}
        for lb, k in [("咨询日期","inquiry_date"),("厂家名称","manufacturer_name"),("地址","address"),("厂家链接","manufacturer_link"),("成本价格","cost_price")]:
            r2 = QHBoxLayout(); la = QLabel(lb)
            la.setStyleSheet("color:#555;font:9pt Microsoft YaHei;min-width:70px;"); la.setFixedWidth(72)
            le = QLineEdit()
            le.setStyleSheet("QLineEdit{background:#F0F0F5;border:1px solid #E0E0E5;border-radius:6px;padding:4px 8px;font:10pt Microsoft YaHei;color:#1A1A1A;}")
            s.ents[k] = le; r2.addWidget(la); r2.addWidget(le, 1); fv.addLayout(r2)
        # 分销商报价（折叠）
        s._dist_expanded = False
        dist_toggle = QPushButton("📊 分销商报价 ▼")
        dist_toggle.setStyleSheet("QPushButton{background:#F0F0F5;color:#555;border:1px solid #E0E0E5;border-radius:6px;padding:4px 8px;font:9pt Microsoft YaHei;text-align:left;}")
        dist_toggle.clicked.connect(lambda: s._toggle_dist_fields(dist_toggle))
        fv.addWidget(dist_toggle)
        s._dist_widget = QWidget()
        s._dist_layout = QVBoxLayout(s._dist_widget); s._dist_layout.setContentsMargins(0, 0, 0, 0); s._dist_layout.setSpacing(6)
        s._dist_widget.setVisible(False)
        for lb, k in [("分销1 价格","dist1_base_price"),("分销1 运费","dist1_shipping_fee"),("分销1 备注","dist1_remarks"),
                       ("分销2 价格","dist2_base_price"),("分销2 运费","dist2_shipping_fee"),("分销2 备注","dist2_remarks")]:
            r2 = QHBoxLayout(); la = QLabel(lb)
            la.setStyleSheet("color:#555;font:9pt Microsoft YaHei;min-width:70px;"); la.setFixedWidth(72)
            le = QLineEdit()
            le.setStyleSheet("QLineEdit{background:#F0F0F5;border:1px solid #E0E0E5;border-radius:6px;padding:4px 8px;font:10pt Microsoft YaHei;color:#1A1A1A;}")
            s.ents[k] = le; r2.addWidget(la); r2.addWidget(le, 1); s._dist_layout.addLayout(r2)
        fv.addWidget(s._dist_widget)
        rl = QLabel("备注"); rl.setStyleSheet("color:#555;font:9pt Microsoft YaHei;"); fv.addWidget(rl)
        # Image insert toolbar for remarks
        rtk = QHBoxLayout(); rtk.setSpacing(6)
        insImgBtn = QPushButton("📷 插入图片"); insImgBtn.setFixedSize(80, 24)
        insImgBtn.setStyleSheet("QPushButton{background:#E0E0E5;color:#555;border:none;border-radius:4px;padding:2px 6px;font:8pt Microsoft YaHei;}")
        insImgBtn.clicked.connect(s._insert_remark_image); rtk.addWidget(insImgBtn); rtk.addStretch(1); fv.addLayout(rtk)
        s.rmk = QTextEdit(); s.rmk.setFixedHeight(60)
        s.rmk.setStyleSheet("QTextEdit{background:#F0F0F5;border:1px solid #E0E0E5;border-radius:6px;padding:4px 8px;font:10pt Microsoft YaHei;color:#1A1A1A;}")
        s.rmk.setAcceptDrops(True)
        s.rmk.dragEnterEvent = lambda e: e.acceptProposedAction() if e.mimeData().hasUrls() else None
        s.rmk.dropEvent = lambda e: s._handle_remark_drop(e)
        fv.addWidget(s.rmk)
        bc = QFrame(); card(bc); bc.setFixedHeight(135); l.addWidget(bc)
        bv = QVBoxLayout(bc); bv.setContentsMargins(10, 10, 10, 10); bv.setSpacing(6)
        s.info = QLabel(); s.info.setStyleSheet("color:#999;font:9pt Microsoft YaHei;"); bv.addWidget(s.info)
        ba = QPushButton("✅ 添加到数据库")
        ba.setStyleSheet("QPushButton{background:#27AE60;color:white;border:none;border-radius:8px;padding:12px 20px;font:12pt Microsoft YaHei;}")
        ba.clicked.connect(s.add); bv.addWidget(ba)
        bm = QPushButton("🗂️ 管理数据库")
        bm.setStyleSheet("QPushButton{background:#9B59B6;color:white;border:none;border-radius:8px;padding:12px 20px;font:12pt Microsoft YaHei;}")
        bm.clicked.connect(s.oman); bv.addWidget(bm)
        l.addStretch(1); return w

    # ---- Remark image methods ----
    def _insert_remark_image(s):
        path, _ = QFileDialog.getOpenFileName(s, "选择图片", "", "图片文件 (*.jpg *.png *.bmp *.gif)")
        if path: s._do_insert_remark_image(path)

    def _do_insert_remark_image(s, path):
        try:
            i = Image.open(path); i.thumbnail((250, 250), Image.LANCZOS)
            buf = io.BytesIO(); i.save(buf, format="PNG"); buf.seek(0)
            qimg = QImage.fromData(buf.read())
            if qimg.isNull(): return
            if not hasattr(s, "_remark_imgs"): s._remark_imgs = []
            s._remark_imgs.append(qimg)   # keep ref to prevent GC
            cursor = s.rmk.textCursor()
            cursor.insertBlock()
            cursor.insertImage(qimg)
            cursor.insertBlock()
            cursor.insertText("[图片: " + path + "]")
            cursor.insertBlock()
            s.rmk.setTextCursor(cursor)
        except Exception as e:
            QMessageBox.warning(s, "错误", "图片加载失败:" + str(e))

    def _handle_remark_drop(s, e):
        if not e.mimeData().hasUrls(): return
        path = e.mimeData().urls()[0].toLocalFile()
        ext = os.path.splitext(path)[1].lower()
        if ext not in [".jpg",".jpeg",".png",".bmp",".gif",".tiff"]: return
        s._do_insert_remark_image(path)

    def _get_remarks_text(s):
        return s.rmk.toPlainText().strip()

    def _clear_remarks(s):
        s.rmk.clear()
        if hasattr(s, "_remark_imgs"):
            s._remark_imgs.clear()
            del s._remark_imgs

    def _load_remarks_images(s, text_widget, remarks):
        text_widget.clear()
        if not remarks: return
        img_refs = []
        pattern = re.compile(r"\[图片:\s*([^\]]+)\]")
        last_end = 0
        for m in pattern.finditer(remarks):
            if m.start() > last_end:
                text_widget.insertPlainText(remarks[last_end:m.start()])
            img_path = m.group(1).strip()
            if not os.path.isabs(img_path): img_path = os.path.join(AP, img_path)
            if os.path.exists(img_path):
                try:
                    i2 = Image.open(img_path); i2.thumbnail((250, 250), Image.LANCZOS)
                    buf2 = io.BytesIO(); i2.save(buf2, format="PNG"); buf2.seek(0)
                    qimg2 = QImage.fromData(buf2.read())
                    if not qimg2.isNull():
                        img_refs.append(qimg2)  # keep ref
                        c2 = text_widget.textCursor(); c2.movePosition(QTextCursor.End)
                        c2.insertBlock(); c2.insertImage(qimg2); c2.insertBlock()
                    else:
                        text_widget.insertPlainText("[图片加载失败: " + img_path + "]")
                except:
                    text_widget.insertPlainText("[图片加载失败: " + img_path + "]")
            else:
                text_widget.insertPlainText("[图片不存在: " + img_path + "]")
            last_end = m.end()
        if last_end < len(remarks):
            text_widget.insertPlainText(remarks[last_end:])
        text_widget._img_refs = img_refs

    def _build_remarks_content(s, remarks):
        w = QWidget(); v = QVBoxLayout(w); v.setContentsMargins(0, 0, 0, 0); v.setSpacing(4)
        if not remarks:
            lb = QLabel("（无）"); lb.setStyleSheet("color:#999;font:9pt Microsoft YaHei;"); v.addWidget(lb)
            return w
        img_refs = []
        pattern = re.compile(r"\[图片:\s*([^\]]+)\]")
        last_end = 0
        for m in pattern.finditer(remarks):
            if m.start() > last_end:
                txt = remarks[last_end:m.start()].strip()
                if txt:
                    lb = QLabel(txt); lb.setStyleSheet("color:#1A1A1A;font:9pt Microsoft YaHei;"); lb.setWordWrap(True); v.addWidget(lb)
            img_path = m.group(1).strip()
            if not os.path.isabs(img_path): img_path = os.path.join(AP, img_path)
            if os.path.exists(img_path):
                try:
                    i2 = Image.open(img_path); i2.thumbnail((450, 300), Image.LANCZOS)
                    buf2 = io.BytesIO(); i2.save(buf2, format="PNG"); buf2.seek(0)
                    qimg2 = QImage.fromData(buf2.read())
                    if not qimg2.isNull():
                        pm2 = QPixmap.fromImage(qimg2); img_refs.append(pm2)
                        il = QLabel(); il.setPixmap(pm2); il.setAlignment(Qt.AlignCenter)
                        v.addWidget(il)
                    else:
                        lb = QLabel("[图片加载失败]"); lb.setStyleSheet("color:#E74C3C;font:9pt Microsoft YaHei;"); v.addWidget(lb)
                except:
                    lb = QLabel("[图片加载失败]"); lb.setStyleSheet("color:#E74C3C;font:9pt Microsoft YaHei;"); v.addWidget(lb)
            else:
                lb = QLabel("[图片不存在: " + os.path.basename(img_path) + "]"); lb.setStyleSheet("color:#E74C3C;font:9pt Microsoft YaHei;"); v.addWidget(lb)
            last_end = m.end()
        if last_end < len(remarks):
            txt = remarks[last_end:].strip()
            if txt:
                lb = QLabel(txt); lb.setStyleSheet("color:#1A1A1A;font:9pt Microsoft YaHei;"); lb.setWordWrap(True); v.addWidget(lb)
        w._img_refs = img_refs
        return w
    # -----------------------------

    def rp(s):
        w = QWidget(); w.setStyleSheet("QWidget{background:#F5F5F7;}")
        l = QVBoxLayout(w); l.setSpacing(8)
        t = QLabel("🔍 搜索同款")
        t.setStyleSheet("color:#1A1A1A;font:12pt Microsoft YaHei;font-weight:bold;"); l.addWidget(t)
        sc = QFrame(); card(sc); sc.setFixedHeight(155); l.addWidget(sc)
        sl = QHBoxLayout(sc); sl.setContentsMargins(10, 10, 10, 10); sl.setSpacing(10)
        s.sprv = Dl(lambda p: s.si(p, False)); s.sprv.setMinimumSize(280, 110); s.sprv.setSizePolicy(QSizePolicy.Preferred, QSizePolicy.Preferred)
        s.sprv.setText("点击选择\n搜索图片"); sl.addWidget(s.sprv)
        sl.addSpacing(10)
        right = QWidget(); right.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Preferred)
        rv = QVBoxLayout(right); rv.setSpacing(6)
        # Row 1: rerank checkbox + spinbox + status
        row1 = QHBoxLayout(); row1.setSpacing(8)
        s.rerank_cb = QCheckBox("精排(Rerank)")
        s.rerank_cb.setToolTip("启用 qwen3-vl-rerank 精排，结果更精准但速度稍慢")
        s.rerank_cb.setStyleSheet("QCheckBox{color:#555;font:9pt Microsoft YaHei;}")
        row1.addWidget(s.rerank_cb)
        row1.addWidget(QLabel("返回:", styleSheet="color:#555;font:9pt Microsoft YaHei;"))
        s.ks = QSpinBox(); s.ks.setValue(10); s.ks.setRange(1, 20); s.ks.setFixedWidth(60); s.ks.setFixedHeight(28)
        s.ks.setStyleSheet("QSpinBox{background:#F0F0F5;border:1px solid #E0E0E5;border-radius:6px;padding:2px 6px;font:9pt Microsoft YaHei;}")
        row1.addWidget(s.ks)
        s.st = QLabel("请选择搜索图片"); s.st.setStyleSheet("color:#999;font:9pt Microsoft YaHei;"); s.st.setFixedHeight(28); s.st.setWordWrap(False)
        row1.addWidget(s.st, 1)
        rv.addLayout(row1)
        # Row 2: two buttons only
        row2 = QHBoxLayout(); row2.setSpacing(8)
        bi = QPushButton("📷 选择图片"); bi.setFixedHeight(52)
        bi.setStyleSheet("QPushButton{background:#4A90E2;color:white;border:none;border-radius:8px;padding:8px 12px;font:12pt Microsoft YaHei;}")
        bi.clicked.connect(lambda: s.si(None, False)); row2.addWidget(bi)
        bs = QPushButton("🔎 开始搜索"); bs.setFixedHeight(52)
        bs.setStyleSheet("QPushButton{background:#E67E22;color:white;border:none;border-radius:8px;padding:8px 12px;font:12pt Microsoft YaHei;}")
        bs.clicked.connect(s.do_search); row2.addWidget(bs)
        s._bi = bi; s._bs = bs
        rv.addLayout(row2)
        sl.addWidget(right, 1)
        s.rs = QScrollArea(); s.rs.setWidgetResizable(True)
        s.rs.setStyleSheet("QScrollArea{background:#F5F5F7;border:none;}")
        s.rw = QWidget(); s.rl = QGridLayout(s.rw); s.rl.setSpacing(10)
        s.rs.setWidget(s.rw); l.addWidget(s.rs, 1); return w

    def si(s, path, add):
        if not path: path, _ = QFileDialog.getOpenFileName(s, "选择图片", "", "图片文件 (*.jpg *.png *.bmp)")
        if not path: return
        if add:
            s.sel = path; pm = gpx(path, 290, 110)
            if not pm.isNull(): s.prev.setPixmap(pm.scaled(290, 110, Qt.KeepAspectRatio, Qt.SmoothTransformation))
            s.prev.setText(""); s.prev.setStyleSheet("QLabel{background:#F0F0F5;border:2px solid #4A90E2;border-radius:8px;}")
        else:
            s.search_path = path; pm = gpx(path, 175, 100)
            if not pm.isNull(): s.sprv.setPixmap(pm.scaled(175, 100, Qt.KeepAspectRatio, Qt.SmoothTransformation))
            s.sprv.setText(""); s.sprv.setStyleSheet("QLabel{background:#F0F0F5;border:2px solid #4A90E2;border-radius:8px;}")

    def add(s):
        if not s.sel: QMessageBox.warning(s, "错误", "请先选择商品图片！"); return
        import shutil
        fname = os.path.basename(s.sel)
        images_dir = os.path.join(AP, 'images')
        os.makedirs(images_dir, exist_ok=True)
        dest = os.path.join(images_dir, fname)
        shutil.copy2(s.sel, dest)
        rel_path = os.path.join('images', fname)
        n = os.path.splitext(fname)[0]
        try:
            pid = s.db.add_product(
                image_path=rel_path, name=n,
                inquiry_date=s.ents["inquiry_date"].text().strip(),
                manufacturer_name=s.ents["manufacturer_name"].text().strip(),
                address=s.ents["address"].text().strip(),
                manufacturer_link=s.ents["manufacturer_link"].text().strip(),
                cost_price=s.ents["cost_price"].text().strip(),
                remarks=s._get_remarks_text(),
                dist1_base_price=s.ents["dist1_base_price"].text().strip(),
                dist1_shipping_fee=s.ents["dist1_shipping_fee"].text().strip(),
                dist1_remarks=s.ents["dist1_remarks"].text().strip(),
                dist2_base_price=s.ents["dist2_base_price"].text().strip(),
                dist2_shipping_fee=s.ents["dist2_shipping_fee"].text().strip(),
                dist2_remarks=s.ents["dist2_remarks"].text().strip(),
            )
            QMessageBox.information(s, "成功", "商品添加成功！\nID:" + pid)
            s.clr(); s.upd()
        except Exception as e: QMessageBox.critical(s, "错误", "添加失败:" + str(e))

    def _toggle_dist_fields(s, btn):
        s._dist_expanded = not s._dist_expanded
        s._dist_widget.setVisible(s._dist_expanded)
        btn.setText("📊 分销商报价 " + ("▲" if s._dist_expanded else "▼"))

    def clr(s):
        for v in s.ents.values(): v.clear()
        s._clear_remarks()
        s.prev.setText(""); s.prev.setPixmap(QPixmap())
        s.prev.setStyleSheet("QLabel{background:#F0F0F5;border:2px dashed #CCC;border-radius:8px;color:#999;font:10pt Microsoft YaHei;}"); s.sel = None

    def upd(s):
        i = s.db.info()
        s.info.setText("数据库共 " + str(i["total"]) + " 件商品")
        s.statLbl.setText(" 📦 共 " + str(i["total"]) + " 件商品 ")

    def do_search(s):
        if not s.search_path: QMessageBox.warning(s, "错误", "请先选择搜索图片！"); return
        if s._searching:
            s.st.setText("搜索中，请稍候..."); s.st.setStyleSheet("color:#E67E22;font:9pt Microsoft YaHei;"); return
        use_rerank = s.rerank_cb.isChecked()
        s._active_use_rerank = use_rerank
        if use_rerank:
            s.st.setText("精排中（Embedding召回 + Rerank精排）..."); s.st.setStyleSheet("color:#555;font:9pt Microsoft YaHei;")
        else:
            s.st.setText("正在搜索..."); s.st.setStyleSheet("color:#555;font:9pt Microsoft YaHei;")

        # 清理上一个线程（若还在运行则 quit，不等它结束，避免阻塞主线程）
        if s._search_thread is not None:
            try:
                if s._search_thread.isRunning():
                    s._search_thread.quit()
            except RuntimeError:
                pass
        s._searching = True
        s._bs.setEnabled(False); s._bi.setEnabled(False); s.rerank_cb.setEnabled(False)

        # 递增搜索 ID，旧线程的回调会因 ID 不匹配而跳过
        s._search_id += 1
        current_id = s._search_id

        # 显示居中悬浮提示（非模态，不阻塞主线程）
        s._loading_msg.setText("精排中，请稍候..." if use_rerank else "搜索中，请稍候...")
        s._loading_w.move(s.x() + (s.width() - s._loading_w.width()) // 2,
                          s.y() + (s.height() - s._loading_w.height()) // 2)
        s._loading_w.raise_()
        s._loading_w.show()

        # 后台线程执行，防止UI卡死
        s._search_thread = QThread()
        s._search_worker = _SearchWorker(
            None, s.db, s.search_path, use_rerank, s.ks.value(), RERANK_PROMPT if use_rerank else None
        )
        s._search_worker._sid = current_id
        s._search_worker.moveToThread(s._search_thread)
        s._search_thread.started.connect(s._search_worker.run)
        s._search_worker.finished.connect(lambda rs, sid=current_id: s._on_search_done(rs, sid))
        s._search_worker.error.connect(lambda msg, sid=current_id: s._on_search_error(msg, sid))
        s._search_worker.finished.connect(s._search_thread.quit)
        s._search_worker.error.connect(s._search_thread.quit)
        s._search_thread.finished.connect(s._search_thread.deleteLater)
        s._search_thread.finished.connect(s._search_worker.deleteLater)
        s._search_thread.start()

    def _on_search_done(s, rs, sid):
        if sid != s._search_id:
            return  # 旧线程的结果，丢弃
        s._loading_w.hide()
        s.dspl(rs)
        if rs:
            mode = "（精排模式）" if s._active_use_rerank else ""
            s.st.setText("找到 " + str(len(rs)) + " 个相似商品 " + mode)
            s.st.setStyleSheet("color:#27AE60;font:9pt Microsoft YaHei;")
        else:
            s.st.setText("未找到相似商品"); s.st.setStyleSheet("color:#E67E22;font:9pt Microsoft YaHei;")
        s._searching = False
        s._bs.setEnabled(True); s._bi.setEnabled(True); s.rerank_cb.setEnabled(True)

    def _on_search_error(s, err_msg, sid):
        if sid != s._search_id:
            return
        s._loading_w.hide()
        s.st.setText("搜索失败"); s.st.setStyleSheet("color:#E74C3C;font:9pt Microsoft YaHei;")
        QMessageBox.critical(s, "错误", "搜索失败:" + err_msg)
        s._searching = False
        s._bs.setEnabled(True); s._bi.setEnabled(True); s.rerank_cb.setEnabled(True)

    def dspl(s, rs):
        while s.rl.count():
            w = s.rl.takeAt(0).widget()
            if w: w.deleteLater()
        for i, p in enumerate(rs):
            r2, c = i // 3, i % 3
            fr = QFrame(); card(fr); fr.setFixedSize(252, 330)
            vl = QVBoxLayout(fr); vl.setContentsMargins(10, 10, 10, 10); vl.setSpacing(4)
            il = QLabel(); il.setFixedSize(232, 180); il.setAlignment(Qt.AlignCenter)
            il.setStyleSheet("background:#E0E0E5;border-radius:6px;")
            try:
                pm = gpx(p["image_path"], 232, 180)
                if not pm.isNull(): il.setPixmap(pm.scaled(232, 180, Qt.KeepAspectRatio, Qt.SmoothTransformation))
            except: il.setText("[图]")
            vl.addWidget(il)
            sc = p["score"]
            if sc >= 0.9: sg, sb = "极高 " + "{:.0%}".format(sc), C["grn"]
            elif sc >= 0.8: sg, sb = "高度 " + "{:.0%}".format(sc), C["blu"]
            elif sc >= 0.7: sg, sb = "中等 " + "{:.0%}".format(sc), C["orng"]
            else: sg, sb = "相似 " + "{:.0%}".format(sc), C["lt"]
            sl = QLabel(sg); sl.setAlignment(Qt.AlignCenter)
            sl.setStyleSheet("QLabel{background:" + sb + ";color:white;border-radius:4px;padding:2px 8px;font:8pt Microsoft YaHei;}")
            vl.addWidget(sl)
            for tx in [p.get("manufacturer_name") or "-", p.get("cost_price") or "-"]:
                ll = QLabel(tx); ll.setStyleSheet("color:#555;font:9pt Microsoft YaHei;"); vl.addWidget(ll)
            vl.addStretch(1)
            b = QPushButton("查看详情"); bst(b, C["blu"])
            b.clicked.connect(lambda _, pid=p["id"]: s.dod(pid)); vl.addWidget(b)
            s.rl.addWidget(fr, r2, c)

    def dod(s, pid):
        if s._all_prods_cache is None:
            s._all_prods_cache = s.db.get_all_products()
        prd = next((p for p in s._all_prods_cache if p["id"] == pid), None)
        if not prd: QMessageBox.warning(s, "错误", "未找到商品"); return
        dlg = QDialog(s); dlg.setWindowTitle("商品详情-" + prd.get("name","")); dlg.setFixedSize(620, 780)
        dlg.setStyleSheet("QDialog{background:#F5F5F7;}")
        vl = QVBoxLayout(dlg); vl.setContentsMargins(0, 0, 0, 0); vl.setSpacing(0)
        editing = [False]
        # Header
        h = QFrame(); h.setFixedHeight(55)
        hGrad = QLabel(h)
        hGrad.setPixmap(QPixmap(HDR_BLUE_IMG).scaled(2000, 55, Qt.IgnoreAspectRatio, Qt.SmoothTransformation))
        hGrad.setFixedSize(2000, 55); hGrad.lower()
        hl = QHBoxLayout(h); hl.setContentsMargins(20, 0, 10, 0)
        hl.addWidget(QLabel("商品详情", styleSheet="color:white;font:12pt Microsoft YaHei;font-weight:bold;"))
        hl.addStretch(1)
        edit_btn = QPushButton("✏️ 编辑")
        edit_btn.setStyleSheet("QPushButton{background:rgba(255,255,255,.15);color:white;border:none;border-radius:6px;padding:4px 12px;font:10pt Microsoft YaHei;}")
        hl.addWidget(edit_btn)
        xb = QPushButton("✕"); xb.setFixedSize(32, 32)
        xb.setStyleSheet("QPushButton{background:rgba(255,255,255,.15);color:white;border:none;border-radius:6px;font:12pt;}")
        xb.clicked.connect(dlg.close); hl.addWidget(xb); vl.addWidget(h)
        cw = QWidget(); cl = QVBoxLayout(cw); cl.setContentsMargins(20, 15, 20, 15); cl.setSpacing(10)
        il = QLabel(); il.setFixedHeight(240); il.setAlignment(Qt.AlignCenter)
        il.setStyleSheet("background:#E0E0E5;border-radius:10px;")
        try:
            pm = gpx(prd["image_path"], 560, 240)
            if not pm.isNull(): il.setPixmap(pm.scaled(560, 240, Qt.KeepAspectRatio, Qt.SmoothTransformation))
        except: il.setText("[图]")
        cl.addWidget(il)
        edit_widgets = {}
        def make_section(title, fields):
            f = QFrame(); f.setStyleSheet("QFrame{background:#FFF;border-radius:12px;border:1px solid #E0E0E5;padding:12px;}")
            v = QVBoxLayout(f); v.setContentsMargins(12, 10, 12, 10); v.setSpacing(4)
            tl = QLabel(title)
            tl.setStyleSheet("color:#4A90E2;font:9pt Microsoft YaHei;font-weight:bold;"); v.addWidget(tl)
            for k, lb in fields:
                r2 = QHBoxLayout()
                r2.addWidget(QLabel(lb, styleSheet="color:#555;font:9pt Microsoft YaHei;min-width:70px;"))
                val_lb = QLabel(str(prd.get(k, "-") or "-"))
                val_lb.setStyleSheet("color:#1A1A1A;font:9pt Microsoft YaHei;"); val_lb.setWordWrap(True)
                le = QLineEdit(str(prd.get(k, "") or ""))
                le.setStyleSheet("QLineEdit{background:#F0F0F5;border:1px solid #E0E0E5;border-radius:6px;padding:4px 8px;font:10pt Microsoft YaHei;color:#1A1A1A;}")
                le.setVisible(False)
                r2.addWidget(val_lb, 1); r2.addWidget(le, 1)
                edit_widgets[k] = (val_lb, le)
                v.addLayout(r2)
            return f
        cl.addWidget(make_section("基本信息", [
            ("name","商品名称"),("inquiry_date","咨询日期"),("manufacturer_name","厂家名称"),("address","地址"),
        ]))
        cl.addWidget(make_section("价格与规格", [("cost_price","成本价格"),("manufacturer_link","厂家链接")]))
        # 分销商报价
        dist_section = QFrame()
        dist_section.setStyleSheet("QFrame{background:#FFF;border-radius:12px;border:1px solid #E0E0E5;padding:12px;}")
        dist_v = QVBoxLayout(dist_section); dist_v.setContentsMargins(12, 10, 12, 10); dist_v.setSpacing(4)
        dist_v.addWidget(QLabel("分销商报价", styleSheet="color:#4A90E2;font:9pt Microsoft YaHei;font-weight:bold;"))
        for dk, dl in [("dist1","分销商1"),("dist2","分销商2")]:
            d_frame = QFrame()
            d_frame.setStyleSheet("QFrame{background:#F8F9FA;border-radius:8px;border:1px solid #E8E8EC;padding:8px;}")
            dv = QVBoxLayout(d_frame); dv.setContentsMargins(8,6,8,6); dv.setSpacing(4)
            dv.addWidget(QLabel(dl, styleSheet="color:#333;font:9pt Microsoft YaHei;font-weight:bold;"))
            for k, lb in [(f"{dk}_base_price","价格"),(f"{dk}_shipping_fee","运费"),(f"{dk}_remarks","备注")]:
                r2 = QHBoxLayout()
                r2.addWidget(QLabel(lb, styleSheet="color:#555;font:9pt Microsoft YaHei;min-width:50px;"))
                val_lb = QLabel(str(prd.get(k, "-") or "-"))
                val_lb.setStyleSheet("color:#1A1A1A;font:9pt Microsoft YaHei;")
                le = QLineEdit(str(prd.get(k, "") or ""))
                le.setStyleSheet("QLineEdit{background:#F0F0F5;border:1px solid #E0E0E5;border-radius:6px;padding:4px 8px;font:10pt Microsoft YaHei;color:#1A1A1A;}")
                le.setVisible(False)
                r2.addWidget(val_lb, 1); r2.addWidget(le, 1)
                edit_widgets[k] = (val_lb, le)
                dv.addLayout(r2)
            dist_v.addWidget(d_frame)
        cl.addWidget(dist_section)
        # 备注
        rc = QFrame()
        rc.setStyleSheet("QFrame{background:#FFF;border-radius:12px;border:1px solid #E0E0E5;padding:12px;}")
        rv_c = QVBoxLayout(rc); rv_c.setContentsMargins(12, 10, 12, 10); rv_c.setSpacing(4)
        rv_c.addWidget(QLabel("备注", styleSheet="color:#4A90E2;font:9pt Microsoft YaHei;font-weight:bold;"))
        rw = s._build_remarks_content(prd.get("remarks") or "")
        rv_c.addWidget(rw)
        rmk_edit = QTextEdit()
        rmk_edit.setPlainText(prd.get("remarks",""))
        rmk_edit.setStyleSheet("QTextEdit{background:#F0F0F5;border:1px solid #E0E0E5;border-radius:6px;padding:4px 8px;font:10pt Microsoft YaHei;color:#1A1A1A;}")
        rmk_edit.setFixedHeight(80); rmk_edit.setVisible(False)
        rv_c.addWidget(rmk_edit)
        cl.addWidget(rc)
        rt2=QFrame()
        rt2.setStyleSheet("QFrame{background:#FFF;border-radius:12px;border:1px solid #E0E0E5;padding:8px 12px;}")
        rtl=QVBoxLayout(rt2);rtl.setContentsMargins(0,0,0,0);rtl.addWidget(QLabel("录入时间:"+prd.get("added_at",""),styleSheet="color:#999;font:8pt Microsoft YaHei;"));cl.addWidget(rt2)
        br = QHBoxLayout(); br.addStretch()
        cb = QPushButton("关闭"); bst(cb, C["lt"]); cb.clicked.connect(dlg.close); br.addWidget(cb)
        save_btn = QPushButton("💾 保存修改")
        bst(save_btn, C["grn"]); save_btn.setVisible(False)
        db = QPushButton("🗑️ 删除"); bst(db, C["red"])
        db.clicked.connect(lambda: (s.db.delete(prd["id"]), dlg.close(), s.upd()))
        br.addWidget(save_btn); br.addWidget(db)
        cl.addLayout(br)
        def toggle_edit():
            editing[0] = not editing[0]
            is_edit = editing[0]
            edit_btn.setText("🔍 预览" if is_edit else "✏️ 编辑")
            for k, (vl, le) in edit_widgets.items():
                vl.setVisible(not is_edit)
                le.setVisible(is_edit)
                if is_edit:
                    le.setText(str(prd.get(k, "")))
            rw.setVisible(not is_edit)
            rmk_edit.setVisible(is_edit)
            save_btn.setVisible(is_edit)
        def do_save():
            nonlocal prd
            for k, (_, le) in edit_widgets.items():
                prd[k] = le.text()
            prd["remarks"] = rmk_edit.toPlainText()
            s.db.update_product(prd["id"],
                name=prd.get("name",""),
                inquiry_date=prd.get("inquiry_date",""),
                manufacturer_name=prd.get("manufacturer_name",""),
                address=prd.get("address",""),
                manufacturer_link=prd.get("manufacturer_link",""),
                cost_price=prd.get("cost_price",""),
                remarks=prd.get("remarks",""),
                dist1_base_price=prd.get("dist1_base_price",""),
                dist1_shipping_fee=prd.get("dist1_shipping_fee",""),
                dist1_remarks=prd.get("dist1_remarks",""),
                dist2_base_price=prd.get("dist2_base_price",""),
                dist2_shipping_fee=prd.get("dist2_shipping_fee",""),
                dist2_remarks=prd.get("dist2_remarks",""),
            )
            s._all_prods_cache = None; s.upd()
            for k, (vl, _) in edit_widgets.items():
                vl.setText(str(prd.get(k, "-") or "-"))
            toggle_edit()
            QMessageBox.information(dlg, "成功", "商品信息已更新！")
        edit_btn.clicked.connect(toggle_edit)
        save_btn.clicked.connect(do_save)
        sa = QScrollArea(); sa.setWidget(cw); sa.setWidgetResizable(True)
        sa.setStyleSheet("QScrollArea{background:#F5F5F7;border:none;}")
        vl.addWidget(sa)
        dlg.exec()

    def oman(s):
        dlg = QDialog(s); dlg.setWindowTitle("🗂️ 数据库管理"); dlg.setFixedSize(960, 740)
        dlg.setStyleSheet("QDialog{background:#F5F5F7;}"); vl = QVBoxLayout(dlg)
        vl.setContentsMargins(0, 0, 0, 0); vl.setSpacing(0)

        # === Header ===
        h = QFrame(); h.setFixedHeight(52); h.setAutoFillBackground(False)
        hGrad = QLabel(h)
        hGrad.setPixmap(QPixmap(HDR_PURPLE_IMG).scaled(3000, 52, Qt.IgnoreAspectRatio, Qt.SmoothTransformation))
        hGrad.setFixedSize(3000, 52); hGrad.lower()
        hl = QHBoxLayout(h); hl.setContentsMargins(20, 0, 20, 0)
        hl.addWidget(QLabel("🗂️ 数据库管理", styleSheet="color:white;font:12pt Microsoft YaHei;font-weight:bold;"))
        i = s.db.info()
        hl.addWidget(QLabel("共 " + str(i["total"]) + " 件商品", styleSheet="color:rgba(255,255,255,.85);font:9pt Microsoft YaHei;"))
        vl.addWidget(h)

        # === Placeholder (shown before data loads) ===
        ph = QWidget(); ph.setStyleSheet("background:#F5F5F7;")
        vl.addWidget(ph)

        # === Page Nav Bar (hidden until loaded) ===
        nav = QFrame(); nav.setFixedHeight(44)
        nav.setStyleSheet("QFrame{background:#FFF;border-top:1px solid #E0E0E5;}")
        nav.setVisible(False)
        nl = QHBoxLayout(nav); nl.setContentsMargins(10, 4, 10, 4)
        vl.addWidget(nav)

        page_lbl = QLabel(); page_lbl.setStyleSheet("color:#555;font:9pt Microsoft YaHei;")
        nl.addWidget(page_lbl)
        nl.addStretch()

        btn_style = "QPushButton{background:#F0F0F5;color:#555;border:none;border-radius:6px;padding:4px 10px;font:9pt Microsoft YaHei;}"
        btn_style += "QPushButton:hover{background:#E0E0E5;}"
        btn_style_dis = "QPushButton{background:#F0F0F5;color:#AAA;border:none;border-radius:6px;padding:4px 10px;font:9pt Microsoft YaHei;}"

        pb_first = QPushButton("<<"); pb_first.setStyleSheet(btn_style); pb_first.setFixedWidth(36)
        pb_prev  = QPushButton("<");  pb_prev.setStyleSheet(btn_style);  pb_prev.setFixedWidth(36)
        pb_next  = QPushButton(">");  pb_next.setStyleSheet(btn_style);  pb_next.setFixedWidth(36)
        pb_last  = QPushButton(">>"); pb_last.setStyleSheet(btn_style); pb_last.setFixedWidth(36)
        page_btns = []
        nl.addWidget(pb_first); nl.addWidget(pb_prev)
        for p in range(1, 25):
            b = QPushButton(str(p)); b.setStyleSheet(btn_style); b.setFixedWidth(36); b.setVisible(False)
            page_btns.append(b)
            nl.addWidget(b)
        nl.addWidget(pb_next); nl.addWidget(pb_last)
        nl.addStretch()

        # Scroll Area + Grid (built once, reused per page)
        sa = QScrollArea(); sa.setWidgetResizable(True)
        sa.setStyleSheet("QScrollArea{background:#F5F5F7;border:none;}")
        sa.setVisible(False)
        cw = QWidget(); vbl = QVBoxLayout(cw); vbl.setContentsMargins(15, 15, 15, 10); vbl.setSpacing(10)
        gl = QGridLayout(); gl.setSpacing(10)
        vbl.addLayout(gl)
        sa.setWidget(cw); vl.addWidget(sa)

        PAGESIZE = 60
        total_pages = [0]
        current_page = [1]
        all_products = [None]

        # Loading animation on placeholder
        load_lbl = QLabel("⏳ 正在加载商品数据...", ph)
        load_lbl.setAlignment(Qt.AlignCenter)
        load_lbl.setStyleSheet("color:#999;font:12pt Microsoft YaHei;background:transparent;")
        load_lbl.setGeometry(0, 300, 960, 40)
        opacity_anim = QGraphicsOpacityEffect(load_lbl)
        load_lbl.setGraphicsEffect(opacity_anim)
        anim = QPropertyAnimation(opacity_anim, b"opacity")
        anim.setDuration(800); anim.setStartValue(1.0); anim.setEndValue(0.3)
        anim.setLoopCount(-1); anim.setEasingCurve(QEasingCurve.Type.InOutSine)
        anim.start()

        def update_nav():
            page = current_page[0]
            page_lbl.setText("第 " + str(page) + " / " + str(total_pages[0]) + " 页")
            for p, b in enumerate(page_btns, 1):
                b.setStyleSheet(btn_style_dis if p == page else btn_style)
                b.setEnabled(p != page)
            pb_first.setEnabled(page > 1)
            pb_prev.setEnabled(page > 1)
            pb_next.setEnabled(page < total_pages[0])
            pb_last.setEnabled(page < total_pages[0])
            if page > 1:
                pb_first.setStyleSheet(btn_style); pb_prev.setStyleSheet(btn_style)
            else:
                pb_first.setStyleSheet(btn_style_dis); pb_prev.setStyleSheet(btn_style_dis)
            if page < total_pages[0]:
                pb_next.setStyleSheet(btn_style); pb_last.setStyleSheet(btn_style)
            else:
                pb_next.setStyleSheet(btn_style_dis); pb_last.setStyleSheet(btn_style_dis)

        def render_page(page):
            while gl.count():
                w = gl.takeAt(0).widget()
                if w: w.deleteLater()
            total = len(all_products[0])
            start = (page - 1) * PAGESIZE
            end = min(start + PAGESIZE, total)
            for idx in range(start, end):
                prd = all_products[0][idx]
                r2, c = (idx - start) // 3, (idx - start) % 3
                fr = QFrame(); card(fr); fr.setFixedSize(300, 360)
                v = QVBoxLayout(fr); v.setContentsMargins(10, 10, 10, 10); v.setSpacing(4)
                il = QLabel(); il.setFixedHeight(200); il.setAlignment(Qt.AlignCenter)
                il.setStyleSheet("background:#E0E0E5;border-radius:6px;")
                il.setText("加载中...")
                def load_img(lbl=il, path=prd["image_path"]):
                    try:
                        pm = gpx(path, 280, 200)
                        if not pm.isNull():
                            lbl.setPixmap(pm.scaled(280, 200, Qt.KeepAspectRatio, Qt.SmoothTransformation))
                        else: lbl.setText("[图]")
                    except: lbl.setText("[图]")
                QTimer.singleShot(0, load_img)
                v.addWidget(il)
                for tx in ["日期:"+prd.get("inquiry_date","-"), "厂家:"+prd.get("manufacturer_name","-"), "价格:"+prd.get("cost_price","-")]:
                    ll = QLabel(tx); ll.setStyleSheet("color:#555;font:9pt Microsoft YaHei;"); v.addWidget(ll)
                v.addStretch(1)
                br = QHBoxLayout()
                bb = QPushButton("查看详情"); bst(bb, C["blu"])
                bb.clicked.connect(lambda _, pid=prd["id"]: s.dod(pid)); br.addWidget(bb)
                bd = QPushButton("删除"); bst(bd, C["red"])
                bd.clicked.connect(lambda _, pid=prd["id"], pn=prd["name"]: s.delp(pid, pn)); br.addWidget(bd)
                v.addLayout(br); gl.addWidget(fr, r2, c)
            sa.verticalScrollBar().setValue(0)

        def go_page(p):
            p = max(1, min(p, total_pages[0]))
            current_page[0] = p
            update_nav()
            render_page(p)

        pb_first.clicked.connect(lambda: go_page(1))
        pb_prev.clicked.connect(lambda: go_page(current_page[0] - 1))
        pb_next.clicked.connect(lambda: go_page(current_page[0] + 1))
        pb_last.clicked.connect(lambda: go_page(total_pages[0]))
        for p, b in enumerate(page_btns, 1):
            b.clicked.connect(lambda _, pp=p: go_page(pp))

        class LoadEmitter(QObject):
            loaded = Signal(list)

        emitter = LoadEmitter()
        emitter.loaded.connect(lambda prods: None)  # placeholder, defined below
        def on_products_loaded(prods):
            anim.stop()
            all_products[0] = prods
            ph.setVisible(False)
            nav.setVisible(True)
            sa.setVisible(True)
            tp = max(1, (len(prods) + PAGESIZE - 1) // PAGESIZE)
            total_pages[0] = tp
            for b in page_btns:
                b.setVisible(False)
            for p in range(1, tp + 1):
                if p <= len(page_btns):
                    page_btns[p-1].setText(str(p))
                    page_btns[p-1].setVisible(True)
            go_page(1)
        emitter.loaded.disconnect()
        emitter.loaded.connect(on_products_loaded)

        def do_load_in_thread():
            if s._all_prods_cache is None:
                s._all_prods_cache = s.db.get_all_products()
            prods = s._all_prods_cache
            emitter.loaded.emit(prods)

        dlg.finished.connect(lambda _: setattr(s, '_all_prods_cache', None))
        dlg.show()
        t = threading.Thread(target=do_load_in_thread, daemon=True)
        t.start()
        dlg.exec(); s.upd()

    def delp(s, pid, pname):
        if QMessageBox.question(s, "确认删除", "删除商品「"+pname+"」？\n不可恢复。") == QMessageBox.Yes:
            s.db.delete(pid)
            s._all_prods_cache = None
            s.upd()

if __name__ == "__main__":
    app = QApplication([]); win = MW(); win.show(); app.exec()
