"""
o2-workbench 后端服务 (FastAPI)
端口: 8527
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from backend.models import init_db
from backend.routes.tools import router as tools_router
from backend.routes.websites import router as websites_router
from backend.routes.tasks import router as tasks_router
from backend.routes.departments import router as depts_router
from backend.routes.hexiao import router as hexiao_router
from backend.routes.o2oa_auth import router as o2oa_router
from backend.routes.product_search import router as product_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """启动时初始化数据库并写入种子数据"""
    init_db()
    _seed_data()
    print('[ok] 数据库已就绪')
    yield


app = FastAPI(
    title='o2-workbench API',
    version='0.1.0',
    lifespan=lifespan,
)

# CORS - 允许前端 dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://localhost:5173', 'http://192.168.1.37:3000', '*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# 注册路由
app.include_router(depts_router)
app.include_router(tools_router)
app.include_router(websites_router)
app.include_router(tasks_router)
app.include_router(hexiao_router)
app.include_router(o2oa_router)
app.include_router(product_router)


@app.get('/api/health')
def health():
    return {'status': 'ok', 'service': 'o2-workbench'}


# ===== 种子数据 =====
def _seed_data():
    from sqlalchemy.orm import sessionmaker
    from backend.models import Department, User, Tool, Website, engine
    import hashlib

    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    try:
        # 检查是否已有数据
        if db.query(Department).count() > 0:
            return

        # 部门：分销部（第一个正式部门）
        depts = [
            Department(code='dept_dist', name='分销部'),
        ]
        db.add_all(depts)
        db.flush()

        # 用户（密码: 123456）
        pw = hashlib.sha256('123456'.encode()).hexdigest()
        users = [
            User(username='bingbing', display_name='冰冰', password_hash=pw, department_id=depts[0].id),
            User(username='admin', display_name='管理员', password_hash=pw, department_id=depts[0].id, is_admin=1),
        ]
        db.add_all(users)
        db.flush()

        # 工具 - 分销部
        dist_tools = [
            Tool(name='核销工具', icon='ri:file-text-line', color='#1a7cf7', type='exe',
                 path='_internal_',
                 department_id=depts[0].id, sort_order=1),
        ]
        db.add_all(dist_tools)

        # 网站 - 分销部
        dist_sites = [
            Website(name='店管家', url='https://www.dgjapp.com', icon='ri:store-3-line', category='电商',
                    department_id=depts[0].id, sort_order=1),
            Website(name='聚水潭', url='https://www.jushuitan.com', icon='ri:water-flash-line', category='电商',
                    department_id=depts[0].id, sort_order=2),
            Website(name='企微文档', url='https://docs.qq.com', icon='ri:file-text-line', category='办公',
                    department_id=depts[0].id, sort_order=3),
        ]
        db.add_all(dist_sites)

        db.commit()
        print(f'✓ 种子数据写入: {len(depts)} 部门, {len(users)} 用户, {len(dist_tools)} 工具, {len(dist_sites)} 网站')
    except Exception as e:
        db.rollback()
        print(f'⚠ 种子数据写入失败: {e}')
    finally:
        db.close()


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='0.0.0.0', port=8527, reload=True)
