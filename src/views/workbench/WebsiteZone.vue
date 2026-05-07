<template>
  <div class="website-zone">
    <div class="page-header">
      <h2>网站区</h2>
      <el-button text type="primary" @click="showAddTip">
        <Icon icon="ri:add-line" width="14" height="14" style="margin-right:4px" />添加网站
      </el-button>
    </div>

    <div v-if="workbench.websites.length === 0" class="empty-state">
      <Icon icon="ri:global-line" width="48" height="48" color="#d1d5db" />
      <p>暂无网站收藏</p>
    </div>

    <div
      v-for="site in workbench.websites"
      :key="site.id"
      class="site-card glass"
      @click="openSite(site)"
    >
      <div class="site-icon">
        <Icon :icon="site.icon || 'ri:global-line'" width="24" height="24" color="#1a7cf7" />
      </div>
      <div class="site-info">
        <div class="site-name">{{ site.name }}</div>
        <div class="site-url">{{ site.url }}</div>
      </div>
      <div class="site-category">{{ site.category }}</div>
      <div class="site-arrow">
        <Icon icon="ri:arrow-right-up-line" width="18" height="18" color="#9ca3af" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useWorkbenchStore } from '../../store/workbench'

const workbench = useWorkbenchStore()

function openSite(site) {
  window.open(site.url, '_blank')
}

function showAddTip() {
  ElMessage.info('网站管理功能开发中')
}
</script>

<style scoped>
.website-zone {
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

.site-card {
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.site-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.site-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.site-info {
  flex: 1;
  min-width: 0;
}

.site-name {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.site-url {
  font-size: 13px;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-category {
  font-size: 12px;
  color: #666;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 20px;
  flex-shrink: 0;
}

.site-arrow {
  flex-shrink: 0;
}

.glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
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
