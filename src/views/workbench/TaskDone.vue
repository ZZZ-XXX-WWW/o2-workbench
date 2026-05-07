<template>
  <div class="task-done">
    <div class="page-header">
      <h2>已完成区</h2>
    </div>

    <div class="task-list">
      <div v-if="workbench.doneTasks.length === 0" class="empty-state">
        <Icon icon="ri:archive-line" width="48" height="48" color="#d1d5db" />
        <p>暂无已完成的任务</p>
      </div>
      <div
        v-for="task in workbench.doneTasks"
        :key="task.id"
        class="task-card glass"
      >
        <div class="task-main">
          <div class="task-title">{{ task.title }}</div>
          <div class="task-meta">
            <span class="meta-tag from">
              <Icon icon="ri:group-line" width="12" height="12" />
              {{ task.fromDept }} · {{ task.fromPerson }}
            </span>
            <span class="meta-time">完成于 {{ task.completedAt }}</span>
          </div>
          <div class="task-result" v-if="task.result">
            <Icon icon="ri:check-line" width="12" height="12" color="#22c55e" />
            {{ task.result }}
          </div>
        </div>
        <div class="task-status">
          <span class="status-dot" :style="{ background: TASK_STATUS.completed.color }"></span>
          {{ TASK_STATUS.completed.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWorkbenchStore, TASK_STATUS } from '../../store/workbench'

const workbench = useWorkbenchStore()
</script>

<style scoped>
.task-done {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
}

.page-header {
  flex-shrink: 0;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
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
}

.task-title {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.meta-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
}

.meta-tag.from { color: #1a7cf7; }

.meta-time {
  font-size: 13px;
  color: #999;
}

.task-result {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 13px;
  color: #666;
  background: #f9fafb;
  border-radius: 8px;
  padding: 8px 12px;
  line-height: 1.5;
}

.task-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
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
