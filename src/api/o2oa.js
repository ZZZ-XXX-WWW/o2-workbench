/**
 * O2OA API 工具函数
 */
const API = ''

// 存储 token (sessionStorage 跟随浏览器会话)
export function getToken() {
  return sessionStorage.getItem('o2oa_token') || localStorage.getItem('o2oa_token') || ''
}

export function setToken(token, remember = false) {
  sessionStorage.setItem('o2oa_token', token)
  if (remember) localStorage.setItem('o2oa_token', token)
}

export function clearToken() {
  sessionStorage.removeItem('o2oa_token')
  localStorage.removeItem('o2oa_token')
}

// 登录
export async function login(credential, password) {
  const res = await fetch(`${API}/api/o2oa/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential, password }),
  })
  if (!res.ok) throw new Error('登录失败')
  const data = await res.json()
  setToken(data.token)
  return data.user
}

// 调用 O2OA API (通过后端代理)
export async function o2oaGet(path) {
  const token = getToken()
  if (!token) throw new Error('未登录')
  const res = await fetch(`${API}/api/o2oa/proxy/${path}?token=${encodeURIComponent(token)}`)
  if (!res.ok) throw new Error(`API 错误: ${res.status}`)
  return await res.json()
}

// 获取待办列表
export async function getTasks() {
  const res = await o2oaGet('x_processplatform_assemble_surface/jaxrs/task/list/0/20')
  return res?.data?.list || res?.data || []
}

// 获取已办列表
export async function getReads() {
  const res = await o2oaGet('x_processplatform_assemble_surface/jaxrs/read/list/0/20')
  return res?.data?.list || res?.data || []
}

// 获取已完成
export async function getCompleted() {
  const res = await o2oaGet('x_processplatform_assemble_surface/jaxrs/workcompleted/list/0/20')
  return res?.data?.list || res?.data || []
}
