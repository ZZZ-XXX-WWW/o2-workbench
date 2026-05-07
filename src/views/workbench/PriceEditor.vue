<template>
  <el-dialog v-model="visible" title="编辑价格" width="800px" top="5vh" @close="$emit('close')">
    <div style="margin-bottom:12px;display:flex;align-items:center;gap:12px;">
      <span>筛选客户:</span>
      <el-select v-model="filterShop" clearable placeholder="全部客户" style="width:200px">
        <el-option v-for="s in shops" :key="s" :label="s" :value="s" />
      </el-select>
      <el-button type="primary" text @click="addRow">+ 新增</el-button>
      <el-button type="danger" text @click="deleteRow">— 删除</el-button>
      <el-button @click="importFromTemplate">从模板导入</el-button>
    </div>

    <el-table :data="filteredPrices" max-height="500" border stripe @selection-change="selected = $event">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="shop" label="客户" min-width="160">
        <template #default="{ row }">
          <el-input v-model="row.shop" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="k1" label="商品简称" min-width="160">
        <template #default="{ row }">
          <el-input v-model="row.k1" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="code" label="编码" width="140">
        <template #default="{ row }">
          <el-input v-model="row.code" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价" width="80">
        <template #default="{ row }">
          <el-input-number v-model="row.price" :min="0" :precision="2" size="small" controls-position="right" style="width:80px" />
        </template>
      </el-table-column>
      <el-table-column label="普通运费" width="100">
        <template #default="{ row }">
          <el-input-number v-model="row.n" :min="0" :precision="1" size="small" controls-position="right" style="width:80px" />
        </template>
      </el-table-column>
      <el-table-column label="偏远运费" width="100">
        <template #default="{ row }">
          <el-input-number v-model="row.r" :min="0" :precision="1" size="small" controls-position="right" style="width:80px" />
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  prices: { type: Array, default: () => [] },
  shipping: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['save', 'close'])

const visible = ref(true)
const filterShop = ref('')
const selected = ref([])

const shops = computed(() => [...new Set(props.prices.map(p => p.shop))])

const filteredPrices = computed(() => {
  const localPrices = props.prices.map(p => ({
    ...p,
    n: (props.shipping[p.shop] || {}).n || 2.5,
    r: (props.shipping[p.shop] || {}).r || 10,
  }))
  if (!filterShop.value) return localPrices
  return localPrices.filter(p => p.shop === filterShop.value)
})

function addRow() {
  props.prices.push({ shop: '', k1: '', code: '', price: null, id: Date.now() })
}
function deleteRow() {
  selected.value.forEach(s => {
    const idx = props.prices.findIndex(p => p.id === s.id)
    if (idx >= 0) props.prices.splice(idx, 1)
  })
}
function importFromTemplate() {
  emit('import')
}
function handleSave() {
  // Build shipping from table
  const newShipping = {}
  props.prices.forEach(p => {
    if (p.shop) {
      if (!newShipping[p.shop]) newShipping[p.shop] = { n: 2.5, r: 10 }
      newShipping[p.shop].n = p.n || newShipping[p.shop].n
      newShipping[p.shop].r = p.r || newShipping[p.shop].r
    }
  })
  emit('save', props.prices, newShipping)
}
</script>
