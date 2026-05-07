<template>
  <div class="task-launch">
    <div class="page-header">
      <h2>发起任务</h2>
      <el-button type="primary" @click="dialogVisible = true">
        <Icon icon="ri:add-line" width="16" height="16" style="margin-right:4px" />新建任务
      </el-button>
    </div>

    <!-- 任务列表 -->
    <div class="task-list">
      <div v-if="workbench.myLaunchTasks.length === 0" class="empty-state">
        <Icon icon="ri:send-plane-line" width="48" height="48" color="#d1d5db" />
        <p>暂无发起的任务</p>
      </div>
      <div
        v-for="task in workbench.myLaunchTasks"
        :key="task.id"
        class="task-card glass"
      >
        <div class="task-info">
          <div class="task-title">{{ task.title }}</div>
          <div class="task-meta">
            <span class="meta-tag">
              <Icon icon="ri:team-line" width="12" height="12" />
              {{ task.targetDept }}
              <span v-if="task.targetPerson"> · {{ task.targetPerson }}</span>
            </span>
            <span class="meta-tag">
              <Icon icon="ri:arrow-right-line" width="12" height="12" />
              {{ getRuleLabel(task.routeRule) }}
            </span>
            <span class="meta-time">{{ task.createdAt }}</span>
          </div>
        </div>
        <div class="task-status">
          <span class="status-dot" :style="{ background: getStatus(task.status).color }"></span>
          <span>{{ getStatus(task.status).label }}</span>
        </div>
      </div>
    </div>

    <!-- 新建任务对话框 -->
    <el-dialog v-model="dialogVisible" title="发起新任务" width="520px" :close-on-click-modal="false">
      <el-form :model="form" label-position="top">
        <el-form-item label="任务标题" required>
          <el-input v-model="form.title" placeholder="请输入任务标题" maxlength="100" show-word-limit />
        </el-form-item>

        <el-form-item label="目标部门" required>
          <el-select v-model="form.targetDept" placeholder="请选择目标部门" style="width:100%">
            <el-option v-for="d in depts" :key="d" :label="d" :value="d" />
          </el-select>
        </el-form-item>

        <el-form-item label="指定人员（可选）">
          <el-input v-model="form.targetPerson" placeholder="可指定具体人员" />
        </el-form-item>

        <el-form-item label="任务描述">
          <el-input v-model="form.desc" type="textarea" :rows="4" placeholder="详细描述任务内容..." maxlength="500" show-word-limit />
        </el-form-item>

        <el-form-item label="附件">
          <el-upload
            action="#"
            :auto-upload="false"
            :limit="5"
            accept=".doc,.docx,.pdf,.xls,.xlsx,.zip,.rar"
          >
            <el-button size="small"><Icon icon="ri:upload-2-line" width="14" height="14" style="margin-right:4px" />上传附件</el-button>
            <template #tip>
              <div class="upload-tip">支持 doc/pdf/xls/zip 等格式，最多5个文件</div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item label="流转规则" required>
          <el-radio-group v-model="form.routeRule">
            <el-radio value="forward">流转至下一部门</el-radio>
            <el-radio value="return">反馈回上一部门</el-radio>
            <el-radio value="end">结束流程</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认发起</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useWorkbenchStore, ROUTE_RULES, TASK_STATUS } from '../../store/workbench'

const workbench = useWorkbenchStore()

const dialogVisible = ref(false)
const form = reactive({
  title: '',
  targetDept: '',
  targetPerson: '',
  desc: '',
  routeRule: 'forward',
})

const depts = ['技术部', '市场部', '设计部', '运营部', '财务部', '人事部', '客服部']

function getRuleLabel(rule) {
  return ROUTE_RULES.find(r => r.value === rule)?.label || rule
}

function getStatus(status) {
  return TASK_STATUS[status] || { label: status, color: '#999' }
}

async function handleSubmit() {
  if (!form.title.trim()) {
    ElMessage.warning('请填写任务标题')
    return
  }
  if (!form.targetDept) {
    ElMessage.warning('请选择目标部门')
    return
  }
  await workbench.launchTask({ ...form })
  ElMessage.success('任务已发起')
  dialogVisible.value = false
  Object.assign(form, { title: '', targetDept: '', targetPerson: '', desc: '', routeRule: 'forward' })
}
</script>

<style scoped>
.task-launch {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  align-items: center;
  transition: all 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
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
}

.meta-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
}

.meta-time {
  font-size: 13px;
  color: #999;
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

.upload-tip {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>
