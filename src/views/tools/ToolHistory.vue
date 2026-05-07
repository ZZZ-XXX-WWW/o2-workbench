<template>
  <div class="page-full">
    <el-card class="page-card">
      <template #header>
        <div class="card-header">
          <span>历史任务</span>
        </div>
      </template>
      <el-empty description="暂无任务记录" />
    </el-card>
  </div>
</template>

<style scoped>
.page-full { flex: 1; display: flex; min-height: 0; }
.page-card { flex: 1; }
</style>
