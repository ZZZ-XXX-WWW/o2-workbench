<template>
  <div class="dashboard">
    <!-- 欢迎区域 -->
    <div class="welcome-card glass">
      <div class="welcome-text">
        <h2>你好，{{ appStore.user.name }} 👋</h2>
        <p>欢迎回来，{{ deptName }} · 今天有 <strong>{{ taskCount }}</strong> 个待办需要处理</p>
      </div>
      <div class="welcome-actions">
        <el-button type="primary" size="large" @click="$router.push('/oa/tasks')">
          <Icon icon="ri:list-check" width="16" height="16" style="margin-right:4px" />查看待办
        </el-button>
        <el-button size="large" @click="$router.push('/workbench/tools')">
          <Icon icon="ri:tool-line" width="16" height="16" style="margin-right:4px" />打开工具
        </el-button>
      </div>
    </div>

    <!-- 快捷卡片 -->
    <div class="quick-cards">
      <div
        v-for="card in quickCards"
        :key="card.title"
        class="quick-card glass"
        @click="$router.push(card.route)"
      >
        <div class="card-icon" :style="{ background: card.bg }">
          <Icon :icon="card.icon" width="28" height="28" color="#fff" />
        </div>
        <div class="card-info">
          <span class="card-count">{{ card.count }}</span>
          <span class="card-label">{{ card.title }}</span>
        </div>
      </div>
    </div>

    <!-- 核销工具快捷入口 -->
    <div class="section section-tools">
      <div class="section-header">
        <h3>工具快捷入口</h3>
        <el-button text type="primary" @click="$router.push('/workbench/tools')">查看全部 →</el-button>
      </div>
      <div class="tool-grid">
        <div
          v-for="tool in workbench.tools"
          :key="tool.name"
          class="tool-card glass"
          @click="openTool(tool)"
        >
          <Icon :icon="tool.icon" width="24" height="24" :color="tool.color" />
          <span>{{ tool.name }}</span>
        </div>
        <div class="tool-card glass" style="border:2px dashed #d1d5db;background:transparent;cursor:default;">
          <Icon icon="ri:reactjs-line" width="24" height="24" color="#22c55e" />
          <span>核销工具(新版)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../store/app'
import { useWorkbenchStore } from '../store/workbench'
import { getToken, login as o2oaLogin } from '../api/o2oa'

const router = useRouter()
const appStore = useAppStore()
const workbench = useWorkbenchStore()

const taskCount = ref(0)
const deptName = ref('分销部')

// Quick cards with real data
const quickCards = reactive([
  { title: '待办事项', count: 0, icon: 'ri:task-line', bg: 'linear-gradient(135deg, #667eea, #764ba2)', route: '/oa/tasks' },
  { title: '已办事项', count: 0, icon: 'ri:checkbox-circle-line', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', route: '/oa/tasks-completed' },
  { title: '待阅消息', count: 0, icon: 'ri:mail-open-line', bg: 'linear-gradient(135deg, #fa709a, #fee140)', route: '/oa/reads' },
  { title: '可用工具', count: 0, icon: 'ri:apps-line', bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', route: '/workbench/tools' },
])

async function fetchData() {
  workbench.fetchData()
  quickCards[3].count = workbench.tools.length

  // Try to get O2OA task counts
  const token = getToken()
  if (!token) {
    try {
      const userData = await o2oaLogin(appStore.user.name || 'xadmin', 'admin123')
      if (!getToken()) return
    } catch (e) { return }
  }

  try {
    const res = await fetch(`/api/o2oa/proxy/x_processplatform_assemble_surface/jaxrs/task/list/0/100?token=${encodeURIComponent(getToken())}`)
    const d = await res.json()
    const tasks = d?.data?.list || d?.data || []
    taskCount.value = tasks.length
    quickCards[0].count = tasks.length
  } catch (e) { /* ignore */ }
}

function openTool(tool) {
  if (tool.name === '核销工具') {
    // Open internal hexiao dialog
    router.push('/workbench/tools')
  } else {
    router.push('/workbench/tools')
  }
}

onMounted(fetchData)
</script>

<style scoped>
.dashboard {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

.glass {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.welcome-card {
  padding: 32px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.welcome-text h2 {
  margin: 0 0 8px;
  font-size: 24px;
  color: #1a1a1a;
}

.welcome-text p {
  margin: 0;
  font-size: 15px;
  color: #666;
}

.welcome-text strong { color: #1a7cf7; }

.welcome-actions { display:flex; gap:12px; flex-shrink:0; }

.quick-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  flex-shrink: 0;
}

.quick-card {
  padding: 22px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.25s;
}

.quick-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 52px; height: 52px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.card-info { display: flex; flex-direction: column; }

.card-count {
  font-size: 26px; font-weight: 700; color: #1a1a1a; line-height: 1.2;
}

.card-label { font-size: 14px; color: #999; margin-top: 2px; }

.section-tools { flex:1; display:flex; flex-direction:column; min-height:0; }

.section-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 12px; padding: 0 2px; flex-shrink: 0;
}

.section-header h3 { margin:0; font-size:16px; color:#1a1a1a; font-weight:600; }

.tool-grid {
  flex:1; display:grid; grid-template-columns:repeat(4,1fr);
  gap:12px; align-content:start; min-height:0;
}

.tool-card {
  padding: 28px 20px; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:12px;
  cursor:pointer; transition:all 0.25s; font-size:14px; color:#333; min-height:100px;
}

.tool-card:hover {
  transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
</style>
