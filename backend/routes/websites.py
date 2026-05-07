"""网站管理 API"""
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import sessionmaker
from ..models import Website, Department, engine
from ..schemas import WebsiteCreate, WebsiteUpdate, WebsiteInfo
from typing import List

router = APIRouter(prefix='/api/websites', tags=['网站'])
SessionLocal = sessionmaker(bind=engine)


@router.get('/list/{dept_id}', response_model=List[WebsiteInfo])
def list_websites(dept_id: int):
    db = SessionLocal()
    try:
        sites = db.query(Website).filter(
            Website.department_id == dept_id
        ).order_by(Website.sort_order).all()
        return sites
    finally:
        db.close()


@router.post('/create/{dept_id}', response_model=WebsiteInfo)
def create_website(dept_id: int, data: WebsiteCreate):
    db = SessionLocal()
    try:
        if not db.query(Department).filter(Department.id == dept_id).first():
            raise HTTPException(404, '部门不存在')
        site = Website(**data.model_dump(), department_id=dept_id)
        db.add(site)
        db.commit()
        db.refresh(site)
        return site
    finally:
        db.close()


@router.put('/update/{site_id}', response_model=WebsiteInfo)
def update_website(site_id: int, data: WebsiteUpdate):
    db = SessionLocal()
    try:
        site = db.query(Website).filter(Website.id == site_id).first()
        if not site:
            raise HTTPException(404, '网站不存在')
        for k, v in data.model_dump().items():
            setattr(site, k, v)
        db.commit()
        db.refresh(site)
        return site
    finally:
        db.close()


@router.delete('/delete/{site_id}')
def delete_website(site_id: int):
    db = SessionLocal()
    try:
        site = db.query(Website).filter(Website.id == site_id).first()
        if not site:
            raise HTTPException(404, '网站不存在')
        db.delete(site)
        db.commit()
        return {'ok': True}
    finally:
        db.close()
