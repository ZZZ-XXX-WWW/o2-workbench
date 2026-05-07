<template>
  <div class="page-full">
    <el-card class="page-card">
      <template #header>
        <div class="card-header">
          <span>工具列表</span>
          <el-button type="primary" size="small">
            <Icon icon="ri:add-line" width="14" height="14" style="margin-right:4px" />注册工具
          </el-button>
        </div>
      </template>
      <el-table :data="tools" stripe style="width: 100%">
        <el-table-column prop="name" label="工具名称" />
        <el-table-column prop="desc" label="说明" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'ready' ? 'success' : 'info'" size="small">
              {{ row.status === 'ready' ? '就绪' : '未配置' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default>
            <el-button size="small" type="primary" @click="runTool">运行</el-button>
            <el-button size="small">配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tools = ref([
  { name: '自动填商品件数', desc: '批量填写商品件数到抖店', status: 'ready' },
  { name: 'Excel 批量处理', desc: '按规则计算件数并写入 Excel', status: 'ready' },
])

function runTool() {
  ElMessage.info('工具执行引擎待接入')
}
</script>

<style scoped>
.page-full { flex: 1; display: flex; min-height: 0; }
.page-card { flex: 1; }
</style>
