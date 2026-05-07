"""
O2OA API 客户端
封装 O2OA REST API 调用，供后端路由使用
"""
import urllib.request, json, time
from dataclasses import dataclass
from typing import Optional, Any

O2OA_BASE = 'http://localhost'

class O2OAClient:
    def __init__(self, base_url: str = O2OA_BASE):
        self.base = base_url

    def _request(self, method: str, path: str, body: Any = None, token: str = '',
                 timeout: int = 10) -> tuple[int, Any]:
        """底层 HTTP 请求"""
        url = f'{self.base}{path}'
        req = urllib.request.Request(url, method=method)
        req.add_header('Content-Type', 'application/json')
        if token:
            req.add_header('Cookie', f'x-token={token}')
        data = json.dumps(body).encode() if body else None
        try:
            resp = urllib.request.urlopen(req, data, timeout=timeout)
            return resp.status, json.loads(resp.read())
        except urllib.error.HTTPError as e:
            err_body = e.read().decode()[:500]
            return e.code, err_body

    def login(self, credential: str, password: str) -> tuple[bool, dict, str]:
        """O2OA 登录，返回 (成功?, 用户数据, token)"""
        status, result = self._request('POST',
            '/x_organization_assemble_authentication/jaxrs/authentication',
            {'credential': credential, 'password': password})
        if status == 200 and isinstance(result, dict):
            data = result.get('data', {})
            token = data.get('token', '')
            if token:
                return True, {
                    'name': data.get('name', ''),
                    'unique': data.get('unique', ''),
                    'tokenType': data.get('tokenType', ''),
                    'roleList': data.get('roleList', []),
                    'identityList': data.get('identityList', []),
                }, token
        return False, {}, ''

    def get_units(self, token: str) -> list:
        """获取顶级单位列表"""
        status, result = self._request('GET',
            '/x_organization_assemble_control/jaxrs/unit/list/top',
            token=token)
        if status == 200 and isinstance(result, dict):
            return result.get('data', [])
        return []

    def get_persons(self, token: str) -> list:
        """获取人员列表"""
        status, result = self._request('GET',
            '/x_organization_assemble_authentication/jaxrs/authentication',
            token=token)
        if status == 200 and isinstance(result, dict):
            return [result.get('data', {})]
        return []

    def get_identities(self, token: str, person: str) -> list:
        """获取人员身份"""
        status, result = self._request('GET',
            f'/x_organization_assemble_control/jaxrs/identity/list/person/{person}',
            token=token)
        if status == 200 and isinstance(result, dict):
            return result.get('data', [])
        return []
