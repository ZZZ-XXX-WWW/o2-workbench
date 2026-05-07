import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API = ''  // 使用 Vite proxy

// 当前用户（TODO: 后续从登录信息读取）
const USER_ID = 1
const DEPT_ID = 1  // 市场部

// 流转规则选项
export const ROUTE_RULES = [
  { value: 'forward', label: '流转至下一部门' },
  { value: 'return', label: '反馈回上一部门' },
  { value: 'end', label: '结束流程' },
]

// 任务状态
export const TASK_STATUS = {
  pending: { label: '待领取', color: '#f59e0b' },
  accepted: { label: '处理中', color: '#3b82f6' },
  completed: { label: '已完成', color: '#22c55e' },
  returned: { label: '已退回', color: '#ef4444' },
}

// 把 API 返回的任务对象转成前端需要的格式
function adaptTask(t) {
  return {
    id: t.id,
    title: t.title,
    desc: t.desc || '',
    attachment: t.attachment || '',
    fromDept: t.from_dept_name || '',
    fromPerson: t.from_user_name || '',
    targetDept: t.to_dept_name || '',       // 发起区用
    targetPerson: t.to_user_name || '',
    routeRule: t.route_rule || 'forward',
    status: t.status || 'pending',
    result: t.result || '',
    createdAt: t.created_at || '',
    acceptedAt: t.accepted_at || '',
    completedAt: t.completed_at || '',
  }
}

export const useWorkbenchStore = defineStore('workbench', () => {
  // ===== 状态 =====
  const tools = ref([])
  const websites = ref([])
  const myLaunchTasks = ref([])
  const receiveTasks = ref([])
  const todoTasks = ref([])
  const doneTasks = ref([])
  const initialized = ref(false)
  const loading = ref(false)

  // ===== 加载所有数据 =====
  async function fetchData() {
    if (initialized.value) return
    loading.value = true
    try {
      const [toolsData, websitesData, launched, receive, todo, done] = await Promise.all([
        fetch(`${API}/api/tools/list/${DEPT_ID}`).then(r => r.json()),
        fetch(`${API}/api/websites/list/${DEPT_ID}`).then(r => r.json()),
        fetch(`${API}/api/tasks/launched/${USER_ID}`).then(r => r.json()),
        fetch(`${API}/api/tasks/receive/${DEPT_ID}`).then(r => r.json()),
        fetch(`${API}/api/tasks/todo/${USER_ID}`).then(r => r.json()),
        fetch(`${API}/api/tasks/done/${USER_ID}`).then(r => r.json()),
      ])
      tools.value = toolsData || []
      websites.value = websitesData || []
      myLaunchTasks.value = (launched || []).map(adaptTask)
      receiveTasks.value = (receive || []).map(adaptTask)
      todoTasks.value = (todo || []).map(adaptTask)
      doneTasks.value = (done || []).map(adaptTask)
      initialized.value = true
    } catch (e) {
      console.error('[workbench] 加载数据失败:', e)
    } finally {
      loading.value = false
    }
  }

  // ===== 工具操作 =====
  async function runTool(tool) {
    if (tool.type === 'exe') {
      try {
        const res = await fetch(`${API}/api/tools/run/${tool.id}`, { method: 'POST' })
        const data = await res.json()
        return data
      } catch (e) {
        console.error('[workbench] 启动工具失败:', e)
        throw e
      }
    } else if (tool.type === 'web' && tool.url) {
      window.open(tool.url, '_blank')
    }
  }

  // ===== 任务操作 =====
  async function launchTask(task) {
    // task: { title, targetDept, targetPerson, desc, routeRule }
    // 先从部门名找到 dept_id（简单做：按顺序映射）
    const deptNameMap = { '技术部': 2, '市场部': 1, '设计部': 3, '运营部': 4, '财务部': 5, '人事部': 6, '客服部': 7 }
    const toDeptId = deptNameMap[task.targetDept] || 1

    const payload = {
      title: task.title,
      desc: task.desc || '',
      to_dept_id: toDeptId,
      to_user_id: null,
      route_rule: task.routeRule || 'forward',
      attachment: '',
    }

    const res = await fetch(`${API}/api/tasks/launch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    myLaunchTasks.value.unshift(adaptTask(data))
  }

  async function acceptTask(taskId) {
    await fetch(`${API}/api/tasks/accept/${taskId}?user_id=${USER_ID}`, { method: 'POST' })
    // 移动：从 receive → todo
    const idx = receiveTasks.value.findIndex(t => t.id === taskId)
    if (idx !== -1) {
      const [task] = receiveTasks.value.splice(idx, 1)
      todoTasks.value.unshift({ ...task, status: 'accepted', acceptedAt: new Date().toLocaleString('zh-CN') })
    }
  }

  async function completeTask(taskId, result = '') {
    const res = await fetch(`${API}/api/tasks/complete/${taskId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result }),
    })
    const data = await res.json()
    // 移动：todo → done
    const idx = todoTasks.value.findIndex(t => t.id === taskId)
    if (idx !== -1) {
      const [task] = todoTasks.value.splice(idx, 1)
      doneTasks.value.unshift({ ...task, status: 'completed', result, completedAt: new Date().toLocaleString('zh-CN') })
    }
  }

  // ===== 计算属性 =====
  const todoCount = computed(() => todoTasks.value.length)
  const receiveCount = computed(() => receiveTasks.value.length)
  const myLaunchPending = computed(() => myLaunchTasks.value.filter(t => t.status === 'pending').length)

  return {
    tools,
    websites,
    myLaunchTasks,
    receiveTasks,
    todoTasks,
    doneTasks,
    loading,
    fetchData,
    runTool,
    acceptTask,
    completeTask,
    launchTask,
    todoCount,
    receiveCount,
    myLaunchPending,
  }
})
