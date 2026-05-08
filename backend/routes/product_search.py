"""
商品图片搜索 API 路由
"""
import os, json, uuid, io, base64
from datetime import datetime
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, List
import numpy as np

from ..product_models import Product, PriceHistory, DistributorPrice, FactoryProduct, init_db, get_session, PriceChangeLog, log_price_change, FIELD_LABELS

router = APIRouter(prefix='/api/products', tags=['商品图片搜索'])

BASE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IMAGES_DIR = os.path.join(BASE, 'product_search', 'images')

# 确保图片目录存在
os.makedirs(IMAGES_DIR, exist_ok=True)

# 初始化数据库
init_db()


# ---- Pydantic 模型 ----
class ProductCreate(BaseModel):
    name: str = ''
    manufacturer_code: str = ''
    cost_price: float = 0
    shipping_fee: float = 0
    color: str = ''
    size: str = ''
    inquiry_date: str = ''
    manufacturer_name: str = ''
    address: str = ''
    manufacturer_link: str = ''
    remarks: str = ''
    dist1_name: str = ''
    dist1_base_price: str = ''
    dist1_shipping_fee: str = ''
    dist1_remarks: str = ''
    dist2_name: str = ''
    dist2_base_price: str = ''
    dist2_shipping_fee: str = ''
    dist2_remarks: str = ''


class PriceHistoryCreate(BaseModel):
    new_price: float
    effective_date: str  # YYYY-MM-DD
    note: str = ''


class DistributorPriceCreate(BaseModel):
    distributor_key: str  # dist1 / dist2
    distributor_name: str = ''
    base_price: float = 0
    shipping_fee: float = 0
    total_price: float = 0
    remarks: str = ''


# ---- 工具函数 ----
def extract_features_sync(image_path: str, prompt: str = None) -> list:
    """调用特征提取（同步包装）"""
    import sys
    sys.path.insert(0, os.path.join(BASE, 'product_search'))
    from extract_features import extract_image_features, extract_image_features_with_prompt
    if prompt:
        emb = extract_image_features_with_prompt(image_path, prompt)
    else:
        emb = extract_image_features(image_path)
    return emb.tolist() if hasattr(emb, 'tolist') else list(emb)


def product_to_dict(p: Product) -> dict:
    """Product ORM → dict"""
    return {
        'id': p.id,
        'image_path': p.image_path,
        'name': p.name,
        'manufacturer_code': p.manufacturer_code,
        'cost_price': p.cost_price,
        'shipping_fee': p.shipping_fee,
        'color': p.color,
        'size': p.size,
        'inquiry_date': p.inquiry_date,
        'manufacturer_name': p.manufacturer_name,
        'address': p.address,
        'manufacturer_link': p.manufacturer_link,
        'remarks': p.remarks,
        'dist1_name': p.dist1_name or '',
        'dist1_base_price': p.dist1_base_price or '',
        'dist1_shipping_fee': p.dist1_shipping_fee or '',
        'dist1_remarks': p.dist1_remarks or '',
        'dist2_name': p.dist2_name or '',
        'dist2_base_price': p.dist2_base_price or '',
        'dist2_shipping_fee': p.dist2_shipping_fee or '',
        'dist2_remarks': p.dist2_remarks or '',
        'created_at': p.created_at.isoformat() if p.created_at else '',
        'updated_at': p.updated_at.isoformat() if p.updated_at else '',
    }


def load_all_embeddings() -> tuple:
    """加载所有商品向量到内存"""
    db = get_session()
    try:
        products = db.query(Product).filter(Product.embedding.isnot(None)).all()
        if not products:
            return [], {}, np.zeros((0, 0))
        dims = [len(np.frombuffer(p.embedding, dtype=np.float32)) for p in products]
        dim = max(dims) if dims else 0
        emb_matrix = np.zeros((len(products), dim), dtype=np.float32)
        prod_map = {}
        ids = []
        for i, p in enumerate(products):
            emb = np.frombuffer(p.embedding, dtype=np.float32)
            emb_matrix[i] = emb
            prod_map[p.id] = p
            ids.append(p.id)
        return ids, prod_map, emb_matrix
    finally:
        db.close()


def search_by_image(query_emb: list, top_k: int = 10) -> list:
    """向量搜索最近邻"""
    q = np.array(query_emb, dtype=np.float32)
    ids, prod_map, emb_matrix = load_all_embeddings()
    if len(ids) == 0:
        return []

    min_dim = min(len(q), emb_matrix.shape[1])
    scores = np.dot(emb_matrix[:, :min_dim], q[:min_dim]) / (
        np.linalg.norm(emb_matrix[:, :min_dim], axis=1) * np.linalg.norm(q[:min_dim]) + 1e-9)
    top_indices = np.argsort(scores)[::-1][:top_k]

    results = []
    for idx in top_indices:
        pid = ids[idx]
        p = prod_map[pid]
        r = product_to_dict(p)
        r['score'] = float(scores[idx])
        r['price_history'] = get_price_history(pid)
        r['distributor_prices'] = get_distributor_prices(pid)
        results.append(r)
    return results


def get_price_history(product_id: str) -> list:
    db = get_session()
    try:
        rows = db.query(PriceHistory).filter(PriceHistory.product_id == product_id)\
            .order_by(PriceHistory.effective_date.desc()).all()
        return [{
            'id': ph.id,
            'old_price': ph.old_price,
            'new_price': ph.new_price,
            'effective_date': ph.effective_date,
            'note': ph.note,
            'created_at': ph.created_at.isoformat() if ph.created_at else '',
        } for ph in rows]
    finally:
        db.close()


def get_distributor_prices(product_id: str) -> list:
    db = get_session()
    try:
        rows = db.query(DistributorPrice).filter(DistributorPrice.product_id == product_id).all()
        return [{
            'id': dp.id,
            'distributor_key': dp.distributor_key,
            'distributor_name': dp.distributor_name,
            'base_price': dp.base_price,
            'shipping_fee': dp.shipping_fee,
            'total_price': dp.total_price,
            'remarks': dp.remarks,
        } for dp in rows]
    finally:
        db.close()


def get_effective_price(product_id: str, as_of_date: str = None) -> float:
    """获取指定日期的生效价格（考虑调价历史）"""
    db = get_session()
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            return 0
        base = product.cost_price
        if not as_of_date:
            return base

        # 找到该日期前最后一次调价
        rows = db.query(PriceHistory).filter(
            PriceHistory.product_id == product_id,
            PriceHistory.effective_date <= as_of_date,
        ).order_by(PriceHistory.effective_date.desc()).first()
        if rows:
            return rows.new_price
        return base
    finally:
        db.close()


# ---- API 端点 ----

@router.post('/upload')
async def upload_product(
    file: UploadFile = File(...),
    name: str = Form(''),
    manufacturer_code: str = Form(''),
    cost_price: float = Form(0),
    shipping_fee: float = Form(0),
    color: str = Form(''),
    size: str = Form(''),
    inquiry_date: str = Form(''),
    manufacturer_name: str = Form(''),
    address: str = Form(''),
    manufacturer_link: str = Form(''),
    remarks: str = Form(''),
    dist1_name: str = Form(''),
    dist1_base_price: str = Form(''),
    dist1_shipping_fee: str = Form(''),
    dist1_remarks: str = Form(''),
    dist2_name: str = Form(''),
    dist2_base_price: str = Form(''),
    dist2_shipping_fee: str = Form(''),
    dist2_remarks: str = Form(''),
    prompt: str = Form(None),
):
    """上传新商品（图片 + 信息）"""
    # 保存图片
    ext = os.path.splitext(file.filename)[1] or '.jpg'
    filename = f'{uuid.uuid4().hex}{ext}'
    img_path = os.path.join(IMAGES_DIR, filename)
    content = await file.read()
    with open(img_path, 'wb') as f:
        f.write(content)

    # 提取特征
    try:
        emb = extract_features_sync(img_path, prompt)
    except Exception as e:
        raise HTTPException(500, f'特征提取失败: {e}')

    # 保存到数据库
    product_id = uuid.uuid4().hex
    db = get_session()
    try:
        product = Product(
            id=product_id,
            image_path=img_path,
            name=name,
            manufacturer_code=manufacturer_code,
            cost_price=cost_price,
            shipping_fee=shipping_fee,
            color=color,
            size=size,
            inquiry_date=inquiry_date,
            manufacturer_name=manufacturer_name,
            address=address,
            manufacturer_link=manufacturer_link,
            remarks=remarks,
            dist1_name=dist1_name,
            dist1_base_price=dist1_base_price,
            dist1_shipping_fee=dist1_shipping_fee,
            dist1_remarks=dist1_remarks,
            dist2_name=dist2_name,
            dist2_base_price=dist2_base_price,
            dist2_shipping_fee=dist2_shipping_fee,
            dist2_remarks=dist2_remarks,
            embedding=np.array(emb, dtype=np.float32).tobytes(),
            embedding_dim=len(emb),
        )
        db.add(product)
        db.commit()
        return {'ok': True, 'id': product_id, 'product': product_to_dict(product)}
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f'保存失败: {e}')
    finally:
        db.close()


@router.post('/search')
async def search_product(file: UploadFile = File(...), top_k: int = Form(10), prompt: str = Form(None)):
    """以图搜图"""
    ext = os.path.splitext(file.filename)[1] or '.jpg'
    filename = f'query_{uuid.uuid4().hex}{ext}'
    tmp_path = os.path.join(IMAGES_DIR, filename)
    content = await file.read()
    with open(tmp_path, 'wb') as f:
        f.write(content)

    try:
        emb = extract_features_sync(tmp_path, prompt)
    except Exception as e:
        raise HTTPException(500, f'特征提取失败: {e}')
    finally:
        # 清理临时查询图片
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

    results = search_by_image(emb, top_k)
    return {'results': results}


@router.get('/list')
def list_products(page: int = 1, page_size: int = 20, search: str = ''):
    """商品列表"""
    db = get_session()
    try:
        query = db.query(Product)
        if search:
            query = query.filter(
                Product.name.contains(search) |
                Product.manufacturer_code.contains(search) |
                Product.manufacturer_name.contains(search) |
                Product.dist1_name.contains(search) |
                Product.dist2_name.contains(search)
            )
        total = query.count()
        products = query.order_by(Product.created_at.desc()).offset(
            (page - 1) * page_size).limit(page_size).all()
        return {
            'total': total,
            'page': page,
            'page_size': page_size,
            'products': [product_to_dict(p) for p in products],
        }
    finally:
        db.close()


@router.post('/upload-remark-image')
async def upload_remark_image(file: UploadFile = File(...)):
    """上传备注图片，返回可访问URL"""
    ext = os.path.splitext(file.filename)[1] or '.jpg'
    filename = f'remark_{uuid.uuid4().hex}{ext}'
    img_path = os.path.join(IMAGES_DIR, filename)
    content = await file.read()
    with open(img_path, 'wb') as f:
        f.write(content)
    return {'ok': True, 'url': f'/api/products/image-file/{filename}'}


@router.get('/image-file/{filename}')
def get_image_file(filename: str):
    """通过文件名获取图片"""
    from fastapi.responses import FileResponse
    img_path = os.path.join(IMAGES_DIR, filename)
    if not os.path.exists(img_path):
        raise HTTPException(404, '图片不存在')
    return FileResponse(img_path)


@router.get('/stats')
def stats():
    """数据统计"""
    db = get_session()
    try:
        total = db.query(Product).count()
        factory_pending = db.query(FactoryProduct).filter(
            FactoryProduct.status == 'pending').count()
        return {
            'total_products': total,
            'factory_pending': factory_pending,
        }
    finally:
        db.close()


@router.get('/image/{product_id}')
def get_product_image(product_id: str):
    """获取商品图片"""
    from fastapi.responses import FileResponse
    db = get_session()
    try:
        p = db.query(Product).filter(Product.id == product_id).first()
        if not p:
            raise HTTPException(404, '商品不存在')
        # 处理相对路径（旧数据 stored as images/xxx.png）
        img_path = p.image_path
        if not os.path.isabs(img_path):
            img_path = os.path.join(IMAGES_DIR, os.path.basename(img_path))
        if not os.path.exists(img_path):
            raise HTTPException(404, f'图片文件不存在: {img_path}')
        return FileResponse(img_path)
    finally:
        db.close()


@router.get('/price-changes')
def list_price_changes(page: int = 1, page_size: int = 50, product_id: str = '', field: str = ''):
    """获取价格变动日志（支持分页/按商品过滤/按字段过滤）"""
    db = get_session()
    try:
        query = db.query(PriceChangeLog).order_by(PriceChangeLog.created_at.desc())
        if product_id:
            query = query.filter(PriceChangeLog.product_id == product_id)
        if field:
            query = query.filter(PriceChangeLog.field_name == field)
        total = query.count()
        items = query.offset((page - 1) * page_size).limit(page_size).all()
        return {
            'total': total,
            'page': page,
            'page_size': page_size,
            'items': [{
                'id': log.id, 'product_id': log.product_id, 'product_name': log.product_name,
                'field_name': log.field_name, 'field_label': log.field_label,
                'old_value': log.old_value, 'new_value': log.new_value,
                'effective_date': log.effective_date, 'note': log.note,
                'created_at': log.created_at.isoformat() if log.created_at else '',
            } for log in items],
        }
    finally:
        db.close()


@router.get('/{product_id}/price-changes')
def list_product_price_changes(product_id: str, page: int = 1, page_size: int = 50):
    """获取单个商品的价格变动日志"""
    db = get_session()
    try:
        query = db.query(PriceChangeLog).filter(
            PriceChangeLog.product_id == product_id
        ).order_by(PriceChangeLog.created_at.desc())
        total = query.count()
        items = query.offset((page - 1) * page_size).limit(page_size).all()
        return {
            'total': total,
            'page': page,
            'page_size': page_size,
            'items': [{
                'id': log.id, 'product_id': log.product_id, 'product_name': log.product_name,
                'field_name': log.field_name, 'field_label': log.field_label,
                'old_value': log.old_value, 'new_value': log.new_value,
                'effective_date': log.effective_date, 'note': log.note,
                'created_at': log.created_at.isoformat() if log.created_at else '',
            } for log in items],
        }
    finally:
        db.close()


@router.get('/{product_id}')
def get_product(product_id: str):
    """商品详情"""
    db = get_session()
    try:
        p = db.query(Product).filter(Product.id == product_id).first()
        if not p:
            raise HTTPException(404, '商品不存在')
        r = product_to_dict(p)
        r['price_history'] = get_price_history(product_id)
        r['distributor_prices'] = get_distributor_prices(product_id)
        return r
    finally:
        db.close()


@router.put('/{product_id}')
def update_product(product_id: str, data: ProductCreate):
    """更新商品信息"""
    db = get_session()
    try:
        p = db.query(Product).filter(Product.id == product_id).first()
        if not p:
            raise HTTPException(404, '商品不存在')
        tracked = ['cost_price','shipping_fee','dist1_name','dist1_base_price','dist1_shipping_fee','dist2_name','dist2_base_price','dist2_shipping_fee']
        for k, v in data.model_dump().items():
            if k in tracked and str(getattr(p, k, '')) != str(v):
                log_price_change(db, product_id, k, getattr(p, k, ''), v)
        for k, v in data.model_dump().items():
            setattr(p, k, v)
        p.updated_at = datetime.now()
        db.commit()
        return {'ok': True, 'product': product_to_dict(p)}
    finally:
        db.close()


@router.delete('/{product_id}')
def delete_product(product_id: str):
    """删除商品"""
    db = get_session()
    try:
        p = db.query(Product).filter(Product.id == product_id).first()
        if not p:
            raise HTTPException(404, '商品不存在')
        # 删除图片文件
        if os.path.exists(p.image_path):
            os.remove(p.image_path)
        db.delete(p)
        db.commit()
        return {'ok': True, 'message': '已删除'}
    finally:
        db.close()


# ---- 调价 API ----
@router.post('/{product_id}/price-history')
def add_price_history(product_id: str, data: PriceHistoryCreate):
    """添加调价记录"""
    db = get_session()
    try:
        p = db.query(Product).filter(Product.id == product_id).first()
        if not p:
            raise HTTPException(404, '商品不存在')

        old_price = p.cost_price

        ph = PriceHistory(
            product_id=product_id,
            old_price=old_price,
            new_price=data.new_price,
            effective_date=data.effective_date,
            note=data.note,
        )
        db.add(ph)
        # 更新当前成本价
        p.cost_price = data.new_price
        db.commit()
        return {'ok': True, 'id': ph.id}
    finally:
        db.close()


@router.get('/{product_id}/price-history')
def list_price_history(product_id: str):
    """获取调价历史"""
    return get_price_history(product_id)


# ---- 通用价格变动日志 API ----
@router.get('/{product_id}/effective-price')
def effective_price(product_id: str, as_of_date: str = ''):
    """获取指定日期的生效成本价"""
    price = get_effective_price(product_id, as_of_date)
    return {'product_id': product_id, 'as_of_date': as_of_date or 'latest', 'price': price}


# ---- 分销商报价 API ----
@router.post('/{product_id}/distributor-price')
def add_distributor_price(product_id: str, data: DistributorPriceCreate):
    """添加/更新分销商报价"""
    db = get_session()
    try:
        p = db.query(Product).filter(Product.id == product_id).first()
        if not p:
            raise HTTPException(404, '商品不存在')

        # 查找是否已有该分销商报价
        existing = db.query(DistributorPrice).filter(
            DistributorPrice.product_id == product_id,
            DistributorPrice.distributor_key == data.distributor_key,
        ).first()

        if existing:
            for k, v in data.model_dump().items():
                setattr(existing, k, v)
        else:
            dp = DistributorPrice(product_id=product_id, **data.model_dump())
            db.add(dp)

        db.commit()
        return {'ok': True, 'message': '报价已保存'}
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f'保存失败: {e}')
    finally:
        db.close()


@router.post('/{product_id}/distributor-prices')
def save_distributor_prices(product_id: str, data: DistributorPriceCreate):
    """保存分销商报价"""
    db = get_session()
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise HTTPException(404, '商品不存在')
        dp = DistributorPrice(product_id=product_id, **data.model_dump())
        db.add(dp)
        db.commit()
        return {'ok': True, 'message': '报价已保存'}
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f'保存失败: {e}')
    finally:
        db.close()


@router.get('/{product_id}/distributor-prices')
def list_distributor_prices(product_id: str):
    """获取分销商报价列表"""
    return get_distributor_prices(product_id)


# ---- 工厂端上传 API ----
class FactoryProductCreate(BaseModel):
    factory_name: str
    product_name: str = ''
    manufacturer_code: str = ''
    cost_price: float = 0
    color: str = ''
    size: str = ''


@router.post('/factory/upload')
async def factory_upload(
    file: UploadFile = File(...),
    factory_name: str = Form(...),
    product_name: str = Form(''),
    manufacturer_code: str = Form(''),
    cost_price: float = Form(0),
    color: str = Form(''),
    size: str = Form(''),
):
    """工厂端上传新产品"""
    ext = os.path.splitext(file.filename)[1] or '.jpg'
    filename = f'factory_{uuid.uuid4().hex}{ext}'
    img_path = os.path.join(IMAGES_DIR, 'factory', filename)
    os.makedirs(os.path.dirname(img_path), exist_ok=True)
    content = await file.read()
    with open(img_path, 'wb') as f:
        f.write(content)

    db = get_session()
    try:
        fp = FactoryProduct(
            factory_name=factory_name,
            image_path=img_path,
            product_name=product_name,
            manufacturer_code=manufacturer_code,
            cost_price=cost_price,
            color=color,
            size=size,
        )
        db.add(fp)
        db.commit()
        return {'ok': True, 'id': fp.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f'保存失败: {e}')
    finally:
        db.close()


@router.get('/factory/list')
def factory_list(status: str = '', page: int = 1, page_size: int = 20):
    """工厂上传列表"""
    db = get_session()
    try:
        query = db.query(FactoryProduct)
        if status:
            query = query.filter(FactoryProduct.status == status)
        total = query.count()
        items = query.order_by(FactoryProduct.uploaded_at.desc()).offset(
            (page - 1) * page_size).limit(page_size).all()
        return {
            'total': total,
            'page': page,
            'page_size': page_size,
            'items': [{
                'id': fp.id,
                'factory_name': fp.factory_name,
                'image_path': fp.image_path,
                'product_name': fp.product_name,
                'manufacturer_code': fp.manufacturer_code,
                'cost_price': fp.cost_price,
                'color': fp.color,
                'size': fp.size,
                'status': fp.status,
                'uploaded_at': fp.uploaded_at.isoformat() if fp.uploaded_at else '',
            } for fp in items],
        }
    finally:
        db.close()


@router.post('/factory/{item_id}/approve')
def approve_factory_item(item_id: int):
    """审核通过并自动导入到商品库"""
    db = get_session()
    try:
        fp = db.query(FactoryProduct).filter(FactoryProduct.id == item_id).first()
        if not fp:
            raise HTTPException(404, '不存在')

        # 创建商品
        product_id = uuid.uuid4().hex
        product = Product(
            id=product_id,
            image_path=fp.image_path,
            name=fp.product_name,
            manufacturer_code=fp.manufacturer_code,
            cost_price=fp.cost_price,
            color=fp.color,
            size=fp.size,
            manufacturer_name=fp.factory_name,
        )
        db.add(product)
        fp.status = 'approved'
        db.commit()
        return {'ok': True, 'product_id': product_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f'操作失败: {e}')
    finally:
        db.close()

