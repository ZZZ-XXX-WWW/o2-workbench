<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useWorkbenchStore } from './store/workbench'

const workbench = useWorkbenchStore()
onMounted(() => {
  workbench.fetchData()
})
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
