<template>
  <div class="page-full">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>个人中心</span>
          <el-button type="primary" @click="refresh">刷新</el-button>
        </div>
      </template>
      <div v-if="loading" style="text-align:center;padding:40px;color:#999;">
        <el-icon class="is-loading" :size="24"><Loading /></el-icon>
        <p>加载中...</p>
      </div>
      <div v-else-if="user" class="profile-body">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="用户名">{{ user.name }}</el-descriptions-item>
          <el-descriptions-item label="唯一标识">{{ user.unique || '—' }}</el-descriptions-item>
          <el-descriptions-item label="角色">
            <el-tag v-for="r in (user.roleList || [])" :key="r" size="small" style="margin:0 4px 4px 0">{{ r }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Token类型">
            <el-tag :type="user.tokenType === 'manager' ? 'danger' : 'success'" size="small">
              {{ user.tokenType }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { getToken, login } from '../api/o2oa'

const loading = ref(true)
const user = ref(null)

async function fetchUser() {
  loading.value = true
  try {
    const token = getToken()
    if (!token) {
      await login('xadmin', 'admin123')
    }
    // Verify token via proxy
    const res = await fetch(`/api/o2oa/proxy/x_organization_assemble_authentication/jaxrs/authentication?token=${encodeURIComponent(getToken())}`)
    const d = await res.json()
    user.value = d?.data || null
  } catch (e) {
    console.error('加载用户信息失败:', e)
  } finally {
    loading.value = false
  }
}

function refresh() { fetchUser() }

onMounted(fetchUser)
</script>

<style scoped>
.page-full { flex:1; display:flex; min-height:0; padding:20px; }
.profile-card { flex:1; max-width:600px; }
.card-header { display:flex; align-items:center; justify-content:space-between; }
.profile-body { padding:10px 0; }
</style>
