"""任务流转 API"""
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from typing import List, Optional
from ..models import Task, Department, User, TaskStatus, RouteRule, engine
from ..schemas import TaskCreate, TaskComplete, TaskInfo

router = APIRouter(prefix='/api/tasks', tags=['任务'])
SessionLocal = sessionmaker(bind=engine)


def _task_to_info(task: Task) -> dict:
    return {
        'id': task.id,
        'title': task.title,
        'desc': task.desc or '',
        'attachment': task.attachment or '',
        'from_dept_name': task.from_dept.name if task.from_dept else '',
        'from_user_name': task.from_user.display_name if task.from_user else '',
        'to_dept_name': task.to_dept.name if task.to_dept else '',
        'to_user_name': task.to_user.display_name if task.to_user else '',
        'route_rule': task.route_rule,
        'status': task.status,
        'result': task.result or '',
        'created_at': task.created_at.strftime('%Y-%m-%d %H:%M') if task.created_at else '',
        'accepted_at': task.accepted_at.strftime('%Y-%m-%d %H:%M') if task.accepted_at else '',
        'completed_at': task.completed_at.strftime('%Y-%m-%d %H:%M') if task.completed_at else '',
    }


@router.post('/launch')
def launch_task(data: TaskCreate, user_id: int = 1):
    """发起任务（user_id 暂用默认值，后续改为从 token 读取）"""
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(404, '用户不存在')

        task = Task(
            title=data.title,
            desc=data.desc,
            attachment=data.attachment,
            from_dept_id=user.department_id,
            from_user_id=user.id,
            to_dept_id=data.to_dept_id,
            to_user_id=data.to_user_id,
            route_rule=data.route_rule,
            status=TaskStatus.pending.value,
        )
        db.add(task)
        db.commit()
        db.refresh(task)
        return _task_to_info(task)
    finally:
        db.close()


@router.get('/launched/{user_id}')
def my_launched_tasks(user_id: int):
    """我发起的任务列表"""
    db = SessionLocal()
    try:
        tasks = db.query(Task).filter(
            Task.from_user_id == user_id
        ).order_by(Task.created_at.desc()).all()
        return [_task_to_info(t) for t in tasks]
    finally:
        db.close()


@router.get('/receive/{dept_id}')
def receive_tasks(dept_id: int):
    """接受区：某个部门可领取的任务（未指定人 + 未领取）"""
    db = SessionLocal()
    try:
        tasks = db.query(Task).filter(
            Task.to_dept_id == dept_id,
            Task.to_user_id.is_(None),
            Task.status == TaskStatus.pending.value,
        ).order_by(Task.created_at.desc()).all()
        return [_task_to_info(t) for t in tasks]
    finally:
        db.close()


@router.post('/accept/{task_id}')
def accept_task(task_id: int, user_id: int = 1):
    """领取任务"""
    db = SessionLocal()
    try:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            raise HTTPException(404, '任务不存在')
        if task.status != TaskStatus.pending.value:
            raise HTTPException(400, '任务状态不允许领取')

        task.status = TaskStatus.accepted.value
        task.to_user_id = user_id
        task.accepted_at = datetime.now()
        db.commit()
        return {'ok': True, 'message': '任务已领取'}
    finally:
        db.close()


@router.get('/todo/{user_id}')
def my_todo_tasks(user_id: int):
    """待办区：我领取的任务（处理中）"""
    db = SessionLocal()
    try:
        tasks = db.query(Task).filter(
            Task.to_user_id == user_id,
            Task.status == TaskStatus.accepted.value,
        ).order_by(Task.accepted_at.desc()).all()
        return [_task_to_info(t) for t in tasks]
    finally:
        db.close()


@router.post('/complete/{task_id}')
def complete_task(task_id: int, data: TaskComplete):
    """完成任务"""
    db = SessionLocal()
    try:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            raise HTTPException(404, '任务不存在')

        task.status = TaskStatus.completed.value
        task.result = data.result
        task.completed_at = datetime.now()
        db.commit()
        return _task_to_info(task)
    finally:
        db.close()


@router.get('/done/{user_id}')
def my_done_tasks(user_id: int):
    """已完成区"""
    db = SessionLocal()
    try:
        tasks = db.query(Task).filter(
            Task.to_user_id == user_id,
            Task.status == TaskStatus.completed.value,
        ).order_by(Task.completed_at.desc()).all()
        return [_task_to_info(t) for t in tasks]
    finally:
        db.close()
