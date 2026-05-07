<template>
  <div class="task-todo">
    <div class="page-header">
      <h2>待办区</h2>
      <span class="badge" v-if="workbench.todoTasks.length">{{ workbench.todoTasks.length }}</span>
    </div>

    <div class="task-list">
      <div v-if="workbench.todoTasks.length === 0" class="empty-state">
        <Icon icon="ri:checkbox-indeterminate-line" width="48" height="48" color="#d1d5db" />
        <p>暂无待处理任务</p>
      </div>
      <div
        v-for="task in workbench.todoTasks"
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
            <span class="meta-time">领取于 {{ task.acceptedAt }}</span>
          </div>
        </div>
        <div class="task-action">
          <el-button @click="showDetail(task)">查看详情</el-button>
          <el-button type="primary" @click="showComplete(task)">
            <Icon icon="ri:check-line" width="14" height="14" style="margin-right:4px" />完成
          </el-button>
        </div>
      </div>
    </div>

    <!-- 完成对话框 -->
    <el-dialog v-model="completeDialogVisible" title="完成任务" width="480px">
      <el-form :model="completeForm" label-position="top">
        <el-form-item label="处理结果">
          <el-input v-model="completeForm.result" type="textarea" :rows="4" placeholder="请输入任务完成情况..." maxlength="500" show-word-limit />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="completeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleComplete">确认完成</el-button>
      </template>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog v-model="detailDialogVisible" :title="currentTask?.title" width="520px">
      <div class="detail-body" v-if="currentTask">
        <div class="detail-row">
          <span class="detail-label">来自部门</span>
          <span>{{ currentTask.fromDept }} · {{ currentTask.fromPerson }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">领取时间</span>
          <span>{{ currentTask.acceptedAt }}</span>
        </div>
        <div class="detail-row" v-if="currentTask.desc">
          <span class="detail-label">任务描述</span>
          <span>{{ currentTask.desc }}</span>
        </div>
      </div>
      <template #footer>
        <el-button @click="detailDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="() => { detailDialogVisible = false; showComplete(currentTask) }">
          完成任务
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useWorkbenchStore } from '../../store/workbench'

const workbench = useWorkbenchStore()

const completeDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const currentTask = ref(null)
const completeForm = reactive({ result: '', taskId: null })

function showDetail(task) {
  currentTask.value = task
  detailDialogVisible.value = true
}

function showComplete(task) {
  currentTask.value = task
  completeForm.taskId = task.id
  completeForm.result = ''
  detailDialogVisible.value = false
  completeDialogVisible.value = true
}

async function handleComplete() {
  await workbench.completeTask(completeForm.taskId, completeForm.result)
  ElMessage.success('任务已完成')
  completeDialogVisible.value = false
}
</script>

<style scoped>
.task-todo {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.badge {
  background: #ef4444;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
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

.meta-time {
  font-size: 13px;
  color: #999;
}

.task-action {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-row {
  display: flex;
  gap: 16px;
  font-size: 14px;
  line-height: 1.6;
}

.detail-label {
  color: #999;
  flex-shrink: 0;
  width: 80px;
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
