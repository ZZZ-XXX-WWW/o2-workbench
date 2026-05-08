"""
商品图片搜索 - 数据库模型 (SQLite + SQLAlchemy)
"""
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, Text, DateTime, ForeignKey, LargeBinary
from sqlalchemy.orm import DeclarativeBase, relationship
import os

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'product_search.db')
engine = create_engine(f'sqlite:///{DB_PATH}', echo=False)


class Base(DeclarativeBase):
    pass


class Product(Base):
    """商品主表"""
    __tablename__ = 'products'

    id = Column(String(64), primary_key=True)
    image_path = Column(String(500), nullable=False)
    image_paths = Column(Text, default='')  # JSON array of all image paths
    name = Column(String(200), default='')                     # 商品名称
    manufacturer_code = Column(String(200), default='')        # 厂家型号代码
    cost_price = Column(Float, default=0)                      # 成本价
    shipping_fee = Column(Float, default=0)                    # 运费
    color = Column(String(100), default='')                    # 颜色
    size = Column(String(100), default='')                     # 尺码

    # 咨询信息
    inquiry_date = Column(String(20), default='')
    manufacturer_name = Column(String(200), default='')        # 厂家名称
    address = Column(String(500), default='')                  # 厂家地址
    manufacturer_link = Column(String(500), default='')        # 厂家链接
    remarks = Column(Text, default='')

    # 分销商报价（直接存商品表，普通文本属性）
    dist1_name = Column(String(100), default='')
    dist1_base_price = Column(String(50), default='')
    dist1_shipping_fee = Column(String(50), default='')
    dist1_remarks = Column(String(200), default='')
    dist2_name = Column(String(100), default='')
    dist2_base_price = Column(String(50), default='')
    dist2_shipping_fee = Column(String(50), default='')
    dist2_remarks = Column(String(200), default='')

    # 特征向量（2560维 qwen3-vl-embedding）
    embedding = Column(LargeBinary, nullable=True)
    all_embeddings = Column(Text, default='')  # JSON: list of [emb1, emb2, ...] for multi-image search
    embedding_dim = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # 关联
    price_history = relationship("PriceHistory", back_populates="product", cascade="all, delete-orphan")
    distributor_prices = relationship("DistributorPrice", back_populates="product", cascade="all, delete-orphan")


class PriceHistory(Base):
    """调价历史"""
    __tablename__ = 'price_history'

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(String(64), ForeignKey('products.id'), nullable=False)
    old_price = Column(Float, default=0)
    new_price = Column(Float, nullable=False)
    effective_date = Column(String(20), nullable=False)        # 生效日期 YYYY-MM-DD
    note = Column(Text, default='')                            # 调价原因
    created_at = Column(DateTime, default=datetime.now)

    product = relationship("Product", back_populates="price_history")


class DistributorPrice(Base):
    """分销商报价"""
    __tablename__ = 'distributor_prices'

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(String(64), ForeignKey('products.id'), nullable=False)
    distributor_key = Column(String(20), nullable=False)       # dist1 / dist2
    distributor_name = Column(String(100), default='')         # 分销商名称
    base_price = Column(Float, default=0)                      # 裸货价格
    package_price = Column(Float, default=0)                   # 包装价格
    shipping_fee = Column(Float, default=0)                    # 运费
    total_price = Column(Float, default=0)                     # 总报价
    remarks = Column(Text, default='')                         # 备注(退货率控制等)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    product = relationship("Product", back_populates="distributor_prices")


class PriceChangeLog(Base):
    """通用价格变动日志（成本、运费、分销商价格等）"""
    __tablename__ = 'price_change_logs'

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(String(64), ForeignKey('products.id'), nullable=False)
    product_name = Column(String(200), default='')
    field_name = Column(String(50), nullable=False)
    field_label = Column(String(100), default='')
    old_value = Column(String(50), default='')
    new_value = Column(String(50), default='')
    effective_date = Column(String(20), default='')
    note = Column(Text, default='')
    created_at = Column(DateTime, default=datetime.now)

    product = relationship("Product")


FIELD_LABELS = {
    'cost_price': '成本价',
    'shipping_fee': '运费',
    'dist1_name': '分销商1名称',
    'dist1_base_price': '分销商1价格',
    'dist1_shipping_fee': '分销商1运费',
    'dist2_name': '分销商2名称',
    'dist2_base_price': '分销商2价格',
    'dist2_shipping_fee': '分销商2运费',
}


def log_price_change(db, product_id: str, field_name: str, old_value, new_value,
                      effective_date: str = '', note: str = ''):
    """记录价格变动"""
    if str(old_value) == str(new_value):
        return
    product = db.query(Product).filter(Product.id == product_id).first()
    log = PriceChangeLog(
        product_id=product_id,
        product_name=product.name if product else '',
        field_name=field_name,
        field_label=FIELD_LABELS.get(field_name, field_name),
        old_value=str(old_value) if old_value is not None else '',
        new_value=str(new_value) if new_value is not None else '',
        effective_date=effective_date,
        note=note,
    )
    db.add(log)


class FactoryProduct(Base):
    """工厂端上传产品"""
    __tablename__ = 'factory_products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    factory_name = Column(String(200), nullable=False)         # 工厂名称
    image_path = Column(String(500), nullable=False)
    product_name = Column(String(200), default='')
    manufacturer_code = Column(String(200), default='')        # 工厂型号
    cost_price = Column(Float, default=0)
    color = Column(String(100), default='')
    size = Column(String(100), default='')
    status = Column(String(20), default='pending')             # pending/approved/rejected
    uploaded_at = Column(DateTime, default=datetime.now)


def init_db():
    """创建所有表，并补充旧表缺少的字段"""
    Base.metadata.create_all(engine)
    # 为已有表补充新字段（SQLite不支持自动ALTER）
    import sqlite3
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        for col in ['image_paths','all_embeddings','package_price','dist1_name','dist1_base_price','dist1_shipping_fee','dist1_remarks','dist2_name','dist2_base_price','dist2_shipping_fee','dist2_remarks']:
            try:
                c.execute(f'ALTER TABLE products ADD COLUMN {col} VARCHAR(200) DEFAULT ""')
            except:
                pass
        try:
            c.execute('ALTER TABLE distributor_prices ADD COLUMN package_price FLOAT DEFAULT 0')
        except:
            pass
        conn.commit()
        conn.close()
    except:
        pass


def get_session():
    from sqlalchemy.orm import sessionmaker
    SessionLocal = sessionmaker(bind=engine)
    return SessionLocal()
