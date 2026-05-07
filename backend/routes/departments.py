"""部门管理 API"""
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import sessionmaker
from ..models import Department, engine
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix='/api/departments', tags=['部门'])
SessionLocal = sessionmaker(bind=engine)


class DeptCreate(BaseModel):
    code: str
    name: str


class DeptUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None


@router.get('/list')
def list_depts():
    db = SessionLocal()
    try:
        depts = db.query(Department).order_by(Department.id).all()
        return [{'id': d.id, 'code': d.code, 'name': d.name} for d in depts]
    finally:
        db.close()


@router.post('/create')
def create_dept(data: DeptCreate):
    db = SessionLocal()
    try:
        exists = db.query(Department).filter(Department.code == data.code).first()
        if exists:
            raise HTTPException(400, f'部门代码 {data.code} 已存在')
        dept = Department(code=data.code, name=data.name)
        db.add(dept)
        db.commit()
        db.refresh(dept)
        return {'id': dept.id, 'code': dept.code, 'name': dept.name}
    finally:
        db.close()


@router.put('/update/{dept_id}')
def update_dept(dept_id: int, data: DeptUpdate):
    db = SessionLocal()
    try:
        dept = db.query(Department).filter(Department.id == dept_id).first()
        if not dept:
            raise HTTPException(404, '部门不存在')
        if data.name is not None:
            dept.name = data.name
        if data.code is not None:
            dept.code = data.code
        db.commit()
        return {'ok': True, 'id': dept.id, 'name': dept.name}
    finally:
        db.close()


@router.delete('/delete/{dept_id}')
def delete_dept(dept_id: int):
    db = SessionLocal()
    try:
        dept = db.query(Department).filter(Department.id == dept_id).first()
        if not dept:
            raise HTTPException(404, '部门不存在')
        # 检查是否有关联数据
        from ..models import Tool, Website, User
        if db.query(Tool).filter(Tool.department_id == dept_id).count() > 0:
            raise HTTPException(400, '请先删除该部门的工具')
        if db.query(Website).filter(Website.department_id == dept_id).count() > 0:
            raise HTTPException(400, '请先删除该部门的网站')
        if db.query(User).filter(User.department_id == dept_id).count() > 0:
            raise HTTPException(400, '请先删除该部门的用户')
        db.delete(dept)
        db.commit()
        return {'ok': True, 'message': f'已删除部门: {dept.name}'}
    finally:
        db.close()
