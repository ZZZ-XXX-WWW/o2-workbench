<template>
  <div class="task-receive">
    <div class="page-header">
      <h2>接受区</h2>
      <span class="header-sub">来自其他部门的任务，可自由领取</span>
    </div>

    <div class="task-list">
      <div v-if="workbench.receiveTasks.length === 0" class="empty-state">
        <Icon icon="ri:inbox-archive-line" width="48" height="48" color="#d1d5db" />
        <p>暂无待领取的任务</p>
      </div>
      <div
        v-for="task in workbench.receiveTasks"
        :key="task.id"
        class="task-card glass"
      >
        <div class="task-main">
          <div class="task-title">{{ task.title }}</div>
          <div class="task-desc" v-if="task.desc">{{ task.desc }}</div>
          <div class="task-meta">
            <span class="meta-tag from">
              <Icon icon="ri:group-line" width="12" height="12" />
              {{ task.fromDept }} · {{ task.fromPerson }}
            </span>
            <span class="meta-tag rule">
              <Icon icon="ri:arrow-right-line" width="12" height="12" />
              {{ getRuleLabel(task.routeRule) }}
            </span>
            <span class="meta-time">{{ task.createdAt }}</span>
          </div>
          <div class="task-attachment" v-if="task.attachment">
            <Icon icon="ri:attachment" width="12" height="12" />
            {{ task.attachment }}
          </div>
        </div>
        <div class="task-action">
          <el-button type="primary" @click="handleAccept(task.id)">
            <Icon icon="ri:hand-heart-line" width="14" height="14" style="margin-right:4px" />领取任务
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useWorkbenchStore, ROUTE_RULES } from '../../store/workbench'

const workbench = useWorkbenchStore()

function getRuleLabel(rule) {
  return ROUTE_RULES.find(r => r.value === rule)?.label || rule
}

async function handleAccept(taskId) {
  await workbench.acceptTask(taskId)
  ElMessage.success('任务已领取，请在待办区处理')
}
</script>

<style scoped>
.task-receive {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
}

.page-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-shrink: 0;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.header-sub {
  font-size: 14px;
  color: #999;
}

.task-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.task-card {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  transition: all 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.task-main {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.task-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
}

.meta-tag.from { color: #1a7cf7; }
.meta-tag.rule { color: #10b981; }

.meta-time {
  font-size: 13px;
  color: #999;
}

.task-attachment {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
  margin-top: 8px;
}

.task-action {
  flex-shrink: 0;
  padding-top: 4px;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #9ca3af;
}

.empty-state p {
  margin: 0;
  font-size: 15px;
}
</style>
