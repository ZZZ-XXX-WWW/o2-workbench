"""
O2OA 认证代理路由
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..o2oa_client import O2OAClient

router = APIRouter(prefix='/api/o2oa', tags=['O2OA认证'])
client = O2OAClient()

class LoginRequest(BaseModel):
    credential: str
    password: str

@router.post('/login')
def login(data: LoginRequest):
    """登录代理：前端登录 -> 后端转发 O2OA -> 返回 token"""
    ok, user_data, token = client.login(data.credential, data.password)
    if not ok:
        raise HTTPException(401, '用户名或密码错误')
    return {
        'ok': True,
        'token': token,
        'user': user_data,
    }

@router.get('/units')
def list_units(token: str):
    """获取 O2OA 组织列表"""
    units = client.get_units(token)
    return {'units': units}

@router.get('/verify')
def verify_token(token: str):
    units = client.get_units(token)
    return {'valid': True, 'units_count': len(units)}


@router.get('/proxy/{module:path}')
def o2oa_proxy(module: str, token: str, method: str = 'GET'):
    """通用 O2OA 代理：前端传 token，后端转发到 O2OA"""
    # 确定要调用的 O2OA 模块
    path = f'/{module}'
    status, result = client._request(method, path, token=token)
    if isinstance(result, dict):
        return result
    return {'error': result}
