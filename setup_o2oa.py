"""O2OA: Create department (unit) and setup tools"""
import urllib.request, json

# Login
req = urllib.request.Request('http://localhost/x_organization_assemble_authentication/jaxrs/authentication', method='POST')
req.add_header('Content-Type', 'application/json')
data = json.dumps({'credential': 'xadmin', 'password': 'admin123'}).encode()
resp = urllib.request.urlopen(req, data, timeout=5)
d = json.loads(resp.read())
token = d['data']['token']
print(f'TOKEN: {token[:30]}...\n')

def o2(method, path, body=None):
    url = f'http://localhost{path}'
    req = urllib.request.Request(url, method=method)
    req.add_header('Cookie', f'x-token={token}')
    req.add_header('Content-Type', 'application/json')
    data_bytes = json.dumps(body).encode() if body else None
    try:
        resp = urllib.request.urlopen(req, data_bytes, timeout=10)
        return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        return {'error': e.code, 'body': e.read().decode()[:300]}
    except Exception as e:
        return {'error': str(e)[:200]}

# 1. Create Distribution Department (分销部)
print('=== 创建分销部 ===')
result = o2('POST', '/x_organization_assemble_control/jaxrs/unit', {
    'name': '分销部',
    'unique': 'dept_distribution',
    'shortName': '分销',
    'description': '负责商品分销业务',
    'typeList': ['department'],
    'orderNumber': 1
})
print(json.dumps(result, ensure_ascii=False, indent=2)[:500])
print()

# 2. Create a user for the department  
print('=== 创建用户: 冰冰 ===')
result = o2('POST', '/x_organization_assemble_control/jaxrs/person', {
    'name': '冰冰',
    'unique': 'bingbing',
    'password': '123456',
    'description': '分销部员工'
})
print(json.dumps(result, ensure_ascii=False, indent=2)[:500])
print()

# 3. List all units to verify
print('=== 当前部门列表 ===')
result = o2('GET', '/x_organization_assemble_control/jaxrs/unit/list/top')
data = result.get('data', [])
print(f'共 {len(data)} 个部门')
for u in data:
    print(f'  - {u.get("name","")} ({u.get("unique","")})')
print()

# 4. List all persons
print('=== 当前人员列表 ===')
result = o2('GET', '/x_organization_assemble_authentication/jaxrs/authentication')
print(f'当前登录: {json.dumps(result.get("data",{}), ensure_ascii=False)[:200]}')
