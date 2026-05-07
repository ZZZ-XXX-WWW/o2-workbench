<template>
  <div class="tool-zone">
    <div class="page-header">
      <h2>工具区</h2>
    </div>

    <div class="tool-grid">
      <div
        v-for="tool in workbench.tools"
        :key="tool.id"
        class="tool-card glass"
        @click="runTool(tool)"
      >
        <div class="tool-icon" :style="{ background: tool.color + '18' }">
          <Icon :icon="tool.icon" width="28" height="28" :color="tool.color" />
        </div>
        <div class="tool-name">{{ tool.name }}</div>
        <div class="tool-type">{{ tool.type === 'exe' ? '本地工具' : '在线工具' }}</div>
      </div>

      <div class="tool-card glass add-card" @click="showAddTip">
        <div class="add-icon">
          <Icon icon="ri:add-line" width="32" height="32" color="#9ca3af" />
        </div>
        <div class="tool-name">添加工具</div>
      </div>
    </div>

    <!-- 核销工具弹窗 -->
    <Teleport to="body">
    <div v-if="showHexiao" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:9000;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;">
      <div style="position:relative;width:75%;height:92vh;background:#fff;border-radius:8px;overflow:hidden;">
        <el-button
          @click="showHexiao = false"
          circle
          style="position:absolute;top:8px;right:8px;z-index:10;padding:6px;min-width:unset;width:32px;height:32px;background:rgba(0,0,0,0.3);color:white;border:none;"
        >
          <Icon icon="ri:close-line" width="16" height="16" />
        </el-button>
        <iframe
          :src="meooUrl"
          style="width:100%;height:100%;border:none;"
        />
      </div>
    </div>
    </Teleport>

    <!-- 商品图片搜索弹窗 -->
    <Teleport to="body">
    <div v-if="showProductSearch" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:9000;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;">
      <div style="position:relative;width:68%;height:82vh;background:#fff;border-radius:8px;overflow:hidden;">
        <el-button
          @click="showProductSearch = false"
          circle
          style="position:absolute;top:8px;right:8px;z-index:10;padding:6px;min-width:unset;width:32px;height:32px;background:rgba(0,0,0,0.3);color:white;border:none;"
        >
          <Icon icon="ri:close-line" width="16" height="16" />
        </el-button>
        <iframe
          :src="productSearchUrl"
          style="width:100%;height:100%;border:none;"
        />
      </div>
    </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useWorkbenchStore } from '../../store/workbench'

const workbench = useWorkbenchStore()
const showHexiao = ref(false)
const showProductSearch = ref(false)
const meooUrl = ref('/hexiao-new/index.html')
const productSearchUrl = ref('/product-search/index.html')

async function runTool(tool) {
  if (tool.name === '核销工具') {
    showHexiao.value = true
    return
  }
  if (tool.name === '商品图片搜索') {
    showProductSearch.value = true
    return
  }
  try {
    await workbench.runTool(tool)
    ElMessage.success(`已启动: ${tool.name}`)
  } catch (e) {
    ElMessage.error(`启动失败: ${tool.name}`)
  }
}

function showAddTip() {
  ElMessage.info('工具管理功能开发中')
}
</script>

<style scoped>
.tool-zone {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  align-content: start;
  overflow-y: auto;
  flex: 1;
}

.glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.tool-card {
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s;
  text-align: center;
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.tool-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-name {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.tool-type {
  font-size: 12px;
  color: #9ca3af;
}

.add-card {
  border-style: dashed;
  border-color: #d1d5db;
  background: transparent;
}

.add-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
