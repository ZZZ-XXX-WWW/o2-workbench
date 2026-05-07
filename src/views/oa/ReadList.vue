<template>
  <div class="page-full">
    <el-card class="page-card">
      <template #header>
        <div class="card-header">
          <span>已办列表</span>
          <el-tag v-if="reads.length" type="info">{{ reads.length }} 条已办</el-tag>
        </div>
      </template>
      <el-empty v-if="!loading && reads.length === 0" description="暂无已办事项" />
      <div v-else-if="loading" style="text-align:center;padding:40px;color:#999;">
        <el-icon class="is-loading" :size="24"><Loading /></el-icon>
        <p>加载中...</p>
      </div>
      <el-table v-else :data="reads" stripe style="width:100%">
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="processName" label="流程" width="120" />
        <el-table-column label="处理时间" width="160">
          <template #default="{ row }">{{ row.startTime || row.createTime || '' }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { getToken, getReads, login } from '../../api/o2oa'

const reads = ref([])
const loading = ref(true)

async function ensureLogin() {
  if (!getToken()) {
    try { await login('xadmin', 'admin123') } catch (e) { console.warn(e) }
  }
}

onMounted(async () => {
  try {
    await ensureLogin()
    reads.value = await getReads()
  } catch (e) {
    console.error('加载已办失败:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page-full { flex:1; display:flex; min-height:0; }
.page-card { flex:1; }
.card-header { display:flex; align-items:center; gap:12px; }
</style>
