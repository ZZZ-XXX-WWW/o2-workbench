"""Pydantic schemas for request/response validation"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ===== 用户 =====
class UserLogin(BaseModel):
    username: str
    password: str


class UserInfo(BaseModel):
    id: int
    username: str
    display_name: str
    department_id: int
    department_name: str = ''
    is_admin: bool = False
    avatar: str = ''


# ===== 工具 =====
class ToolCreate(BaseModel):
    name: str
    icon: str = 'ri:tool-line'
    color: str = '#1a7cf7'
    type: str = 'exe'
    path: str = ''
    url: str = ''


class ToolUpdate(ToolCreate):
    pass


class ToolInfo(BaseModel):
    id: int
    name: str
    icon: str
    color: str
    type: str
    path: str
    url: str
    sort_order: int

    class Config:
        from_attributes = True


# ===== 网站 =====
class WebsiteCreate(BaseModel):
    name: str
    url: str
    icon: str = 'ri:global-line'
    category: str = ''


class WebsiteUpdate(WebsiteCreate):
    pass


class WebsiteInfo(BaseModel):
    id: int
    name: str
    url: str
    icon: str
    category: str
    sort_order: int

    class Config:
        from_attributes = True


# ===== 任务 =====
class TaskCreate(BaseModel):
    title: str
    desc: str = ''
    to_dept_id: int
    to_user_id: Optional[int] = None
    route_rule: str = 'forward'
    attachment: str = ''


class TaskComplete(BaseModel):
    result: str = ''


class TaskInfo(BaseModel):
    id: int
    title: str
    desc: str = ''
    attachment: str = ''
    from_dept_name: str = ''
    from_user_name: str = ''
    to_dept_name: str = ''
    to_user_name: str = ''
    route_rule: str
    status: str
    result: str = ''
    created_at: Optional[str] = ''
    accepted_at: Optional[str] = ''
    completed_at: Optional[str] = ''

    class Config:
        from_attributes = True
