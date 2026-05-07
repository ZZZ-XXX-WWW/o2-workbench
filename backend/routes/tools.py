"""工具管理 API"""
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from ..models import Tool, Department, engine
from ..schemas import ToolCreate, ToolUpdate, ToolInfo
from typing import List

router = APIRouter(prefix='/api/tools', tags=['工具'])


def get_session():
    from sqlalchemy.orm import sessionmaker
    SessionLocal = sessionmaker(bind=engine)
    return SessionLocal()


@router.get('/list/{dept_id}', response_model=List[ToolInfo])
def list_tools(dept_id: int):
    """获取部门工具列表"""
    db = get_session()
    try:
        tools = db.query(Tool).filter(
            Tool.department_id == dept_id
        ).order_by(Tool.sort_order).all()
        return tools
    finally:
        db.close()


@router.post('/create/{dept_id}', response_model=ToolInfo)
def create_tool(dept_id: int, data: ToolCreate):
    """添加工具"""
    db = get_session()
    try:
        dept = db.query(Department).filter(Department.id == dept_id).first()
        if not dept:
            raise HTTPException(404, '部门不存在')

        tool = Tool(
            name=data.name,
            icon=data.icon,
            color=data.color,
            type=data.type,
            path=data.path,
            url=data.url,
            department_id=dept_id,
        )
        db.add(tool)
        db.commit()
        db.refresh(tool)
        return tool
    finally:
        db.close()


@router.put('/update/{tool_id}', response_model=ToolInfo)
def update_tool(tool_id: int, data: ToolUpdate):
    """更新工具"""
    db = get_session()
    try:
        tool = db.query(Tool).filter(Tool.id == tool_id).first()
        if not tool:
            raise HTTPException(404, '工具不存在')

        for k, v in data.model_dump().items():
            setattr(tool, k, v)
        db.commit()
        db.refresh(tool)
        return tool
    finally:
        db.close()


@router.delete('/delete/{tool_id}')
def delete_tool(tool_id: int):
    """删除工具"""
    db = get_session()
    try:
        tool = db.query(Tool).filter(Tool.id == tool_id).first()
        if not tool:
            raise HTTPException(404, '工具不存在')
        db.delete(tool)
        db.commit()
        return {'ok': True}
    finally:
        db.close()


@router.post('/run/{tool_id}')
def run_tool(tool_id: int):
    """启动工具（调用 exe 或打开 web）"""
    db = get_session()
    try:
        tool = db.query(Tool).filter(Tool.id == tool_id).first()
        if not tool:
            raise HTTPException(404, '工具不存在')

        if tool.type == 'exe' and tool.path:
            import subprocess
            # 启动 exe，shell=True 让窗口正常显示
            subprocess.Popen(tool.path, shell=True)
            return {'ok': True, 'message': f'已启动: {tool.name}'}
        elif tool.type == 'web' and tool.url:
            import webbrowser
            webbrowser.open(tool.url)
            return {'ok': True, 'message': f'已打开: {tool.name}'}
        else:
            raise HTTPException(400, '工具配置不完整')
    finally:
        db.close()
