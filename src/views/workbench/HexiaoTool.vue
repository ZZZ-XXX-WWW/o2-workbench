<template>
  <el-dialog
    v-model="visible"
    title="核销工具"
    width="75%"
    :close-on-click-modal="false"
    @close="$emit('close')"
  >
    <div class="hexiao-container">
      <!-- 左栏：价格数据 -->
      <div class="left-panel">
        <h3>价格数据</h3>
        <div class="stats-card">
          <div class="stat-item">
            <span class="stat-num">{{ prices.length }}</span>
            <span class="stat-label">条价格</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">{{ shippingCount }}</span>
            <span class="stat-label">家运费</span>
          </div>
        </div>
        <el-button type="primary" style="width:100%;margin-bottom:12px" @click="showPriceEditor = true">
          编辑价格
        </el-button>
        <div class="price-list">
          <div v-for="p in prices.slice(0, 50)" :key="p.id" class="price-row">
            <span class="price-shop">{{ p.shop.slice(0, 18) }}</span>
            <span class="price-name">{{ p.k1.slice(0, 12) }}</span>
            <span class="price-val">¥{{ p.price }}</span>
          </div>
          <div v-if="prices.length > 50" class="price-more">... 还有 {{ prices.length - 50 }} 条</div>
        </div>
      </div>

      <!-- 右栏：处理区 -->
      <div class="right-panel">
        <h3>处理</h3>
        <!-- 文件上传区 -->
        <div
          class="drop-zone"
          :class="{ 'drop-active': isDragging }"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="handleDrop"
        >
          <div v-if="!selectedFile" class="drop-empty" @click="triggerFileInput">
            <input
              ref="fileInput"
              type="file"
              accept=".xlsx,.xls"
              style="display:none"
              @change="handleFileChange"
            />
            <el-icon :size="28" color="#3b82f6"><Upload /></el-icon>
            <p>点击或拖入发货明细 Excel</p>
            <el-button size="small">选择文件</el-button>
          </div>
          <div v-else class="drop-filled">
            <el-icon :size="20" color="#3b82f6"><Document /></el-icon>
            <span>{{ selectedFile.name }}</span>
            <el-button size="small" text @click="selectedFile = null">✕</el-button>
            <el-tag type="success" size="small">已选择</el-tag>
          </div>
        </div>

        <!-- 输出路径 -->
        <div class="output-row">
          <span class="label">输出</span>
          <el-input v-model="outputPath" placeholder="默认：发货明细同目录" />
          <el-button @click="selectOutputDir">选择目录</el-button>
        </div>

        <!-- 进度 -->
        <div class="progress-area">
          <span>{{ statusText }}</span>
          <el-progress :percentage="progress" :stroke-width="6" />
        </div>

        <!-- 日志 -->
        <div ref="logRef" class="log-area">
          <div v-for="(log, i) in logs" :key="i" class="log-line">{{ log }}</div>
          <div v-if="logs.length === 0" class="log-placeholder">等待处理...</div>
        </div>

        <!-- 底部按钮 -->
        <div class="action-bar">
          <el-button type="primary" :loading="processing" @click="startProcess" size="large">
            开始处理
          </el-button>
        </div>
      </div>
    </div>

    <!-- 价格编辑弹窗 -->
    <PriceEditor
      v-if="showPriceEditor"
      :prices="prices"
      :shipping="shipping"
      @save="savePrices"
      @close="showPriceEditor = false"
    />
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Upload, Document } from '@element-plus/icons-vue'
import PriceEditor from './PriceEditor.vue'

const emit = defineEmits(['close'])

const API = ''  // Same origin as o2 backend

// State
const visible = ref(true)
const prices = ref([])
const shipping = ref({})
const selectedFile = ref(null)
const outputPath = ref('')
const logs = ref([])
const processing = ref(false)
const progress = ref(0)
const statusText = ref('就绪')
const isDragging = ref(false)
const showPriceEditor = ref(false)
const fileInput = ref(null)
const logRef = ref(null)
const shippingCount = ref(0)

onMounted(async () => {
  await loadPrices()
})

async function loadPrices() {
  try {
    const res = await fetch(`${API}/api/hexiao/prices`)
    const data = await res.json()
    prices.value = (data.prices || []).map((p, i) => ({ ...p, id: i }))
    shipping.value = data.shipping || {}
    shippingCount.value = Object.keys(data.shipping || {}).length
    addLog(`加载 ${prices.value.length} 条价格, ${shippingCount.value} 家运费`)
  } catch (e) {
    addLog('加载价格失败: ' + e.message)
  }
}

function addLog(msg) {
  logs.value.push(msg)
  nextTick(() => {
    if (logRef.value) logRef.value.scrollTop = logRef.value.scrollHeight
  })
}

function triggerFileInput() { fileInput.value?.click() }
function handleFileChange(e) {
  const f = e.target.files[0]
  if (f) selectedFile.value = f
}
function handleDrop(e) {
  isDragging.value = false
  const f = e.dataTransfer.files[0]
  if (f) selectedFile.value = f
}
function selectOutputDir() {
  // In a web app, this would use Electron/browser file API
  addLog('输出目录已设为默认')
}

async function startProcess() {
  if (!selectedFile.value) {
    ElMessage.warning('请先选择文件')
    return
  }
  processing.value = true
  progress.value = 0
  statusText.value = '处理中...'
  addLog('开始处理...')

  try {
    const form = new FormData()
    form.append('file', selectedFile.value)
    const res = await fetch(`${API}/api/hexiao/process`, { method: 'POST', body: form })
    const data = await res.json()
    progress.value = 100
    statusText.value = '完成'
    addLog(`完成！${data.stats?.total || 0} 单, 匹配 ${data.stats?.matched || 0} 单`)
    addLog(`货款 ¥${data.stats?.goods_total || 0} · 运费 ¥${data.stats?.ship_total || 0} · 合计 ¥${data.stats?.grand_total || 0}`)
    ElMessage.success('处理完成')
  } catch (e) {
    addLog('处理失败: ' + e.message)
    ElMessage.error('处理失败')
  }
  processing.value = false
}

async function savePrices(newPrices, newShipping) {
  try {
    const pl = newPrices.map(({ id, ...rest }) => rest)
    await fetch(`${API}/api/hexiao/prices/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prices: pl, shipping: newShipping || shipping.value }),
    })
    prices.value = newPrices
    shipping.value = newShipping || shipping.value
    shippingCount.value = Object.keys(shipping.value).length
    showPriceEditor.value = false
    ElMessage.success('已保存')
  } catch (e) {
    ElMessage.error('保存失败: ' + e.message)
  }
}
</script>

<style scoped>
.hexiao-container {
  display: flex;
  gap: 24px;
  height: calc(80vh - 100px);
  max-height: 700px;
}
.left-panel {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.stats-card {
  display: flex;
  gap: 16px;
  background: #f8fafc;
  border-radius: 10px;
  padding: 12px 16px;
}
.stat-item { text-align: center; flex: 1; }
.stat-num { display: block; font-size: 22px; font-weight: 700; color: #1e293b; }
.stat-label { font-size: 12px; color: #94a3b8; }
.price-list {
  flex: 1;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 4px;
}
.price-row {
  display: flex;
  gap: 8px;
  padding: 4px 8px;
  font-size: 11px;
  border-bottom: 1px solid #f1f5f9;
}
.price-shop { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.price-name { width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.price-val { width: 60px; text-align: right; font-weight: 600; color: #3b82f6; }
.price-more { padding: 8px; font-size: 11px; color: #94a3b8; text-align: center; }
.drop-zone {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
}
.drop-zone:hover, .drop-active { border-color: #3b82f6; background: #eff6ff; }
.drop-empty p { margin: 8px 0; color: #64748b; font-size: 13px; }
.drop-filled { display: flex; align-items: center; gap: 12px; justify-content: center; }
.output-row { display: flex; align-items: center; gap: 12px; }
.output-row .label { min-width: 36px; color: #64748b; font-size: 13px; }
.progress-area { display: flex; align-items: center; gap: 12px; font-size: 12px; color: #94a3b8; }
.log-area {
  flex: 1;
  background: #1e293b;
  border-radius: 8px;
  padding: 12px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 12px;
}
.log-line { color: #a5f3fc; margin-bottom: 4px; }
.log-placeholder { color: #64748b; }
.action-bar { display: flex; justify-content: flex-end; }
</style>
