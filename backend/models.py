"""
o2-workbench 后端 - 数据库模型
SQLite + SQLAlchemy
"""
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import DeclarativeBase, relationship
import enum
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'workbench.db')
engine = create_engine(f'sqlite:///{DB_PATH}', echo=False)


class Base(DeclarativeBase):
    pass


class TaskStatus(str, enum.Enum):
    pending = 'pending'       # 待领取
    accepted = 'accepted'     # 处理中
    completed = 'completed'   # 已完成
    returned = 'returned'     # 已退回


class RouteRule(str, enum.Enum):
    forward = 'forward'  # 流转至下一部门
    return_ = 'return'   # 反馈回上一部门
    end = 'end'          # 结束流程


# ===== 部门 =====
class Department(Base):
    __tablename__ = 'departments'

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(50), unique=True, nullable=False)
    name = Column(String(100), nullable=False)

    users = relationship('User', back_populates='department')
    tools = relationship('Tool', back_populates='department')
    websites = relationship('Website', back_populates='department')


# ===== 用户 =====
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False)
    display_name = Column(String(100), nullable=False)
    password_hash = Column(String(255), nullable=False)
    department_id = Column(Integer, ForeignKey('departments.id'), nullable=False)
    is_admin = Column(Integer, default=0)  # 0=普通 1=管理员
    avatar = Column(String(500), default='')
    created_at = Column(DateTime, default=datetime.now)

    department = relationship('Department', back_populates='users')


# ===== 工具 =====
class Tool(Base):
    __tablename__ = 'tools'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    icon = Column(String(100), default='ri:tool-line')
    color = Column(String(20), default='#1a7cf7')
    type = Column(String(10), default='exe')       # exe / web
    path = Column(String(500), default='')          # exe 路径
    url = Column(String(500), default='')           # web 地址
    department_id = Column(Integer, ForeignKey('departments.id'), nullable=False)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.now)

    department = relationship('Department', back_populates='tools')


# ===== 网站 =====
class Website(Base):
    __tablename__ = 'websites'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    url = Column(String(500), nullable=False)
    icon = Column(String(100), default='ri:global-line')
    category = Column(String(50), default='')
    department_id = Column(Integer, ForeignKey('departments.id'), nullable=False)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.now)

    department = relationship('Department', back_populates='websites')


# ===== 任务 =====
class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    desc = Column(Text, default='')
    attachment = Column(String(500), default='')

    # 发送方
    from_dept_id = Column(Integer, ForeignKey('departments.id'), nullable=False)
    from_user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    # 接收方（null = 放接受区，非空 = 指定人员）
    to_dept_id = Column(Integer, ForeignKey('departments.id'), nullable=False)
    to_user_id = Column(Integer, ForeignKey('users.id'), nullable=True)

    route_rule = Column(String(20), default=RouteRule.forward.value)
    status = Column(String(20), default=TaskStatus.pending.value)

    result = Column(Text, default='')
    created_at = Column(DateTime, default=datetime.now)
    accepted_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)

    # 前驱任务（用于追溯流转链）
    parent_task_id = Column(Integer, ForeignKey('tasks.id'), nullable=True)

    from_dept = relationship('Department', foreign_keys=[from_dept_id])
    from_user = relationship('User', foreign_keys=[from_user_id])
    to_dept = relationship('Department', foreign_keys=[to_dept_id])
    to_user = relationship('User', foreign_keys=[to_user_id])


def init_db():
    """创建所有表（幂等）"""
    Base.metadata.create_all(engine)
