<template>
  <div class="main-layout">
    <!-- 背景图 -->
    <div class="bg-layer" :style="{ backgroundImage: `url(${appStore.currentBg.file})` }" />

    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="top-nav-left">
        <div class="logo-area" @click="$router.push('/dashboard')">
          <Icon icon="ri:home-smile-2-line" width="35" height="35" color="#1a7cf7" />
          <span class="logo-text">O2 工作台</span>
        </div>
        <div class="top-tabs">
          <div
            v-for="tab in topTabs"
            :key="tab.key"
            class="top-tab"
            :class="{ active: appStore.topNavActive === tab.key }"
            @click="switchTopTab(tab.key)"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>
      <div class="top-nav-right">
        <Icon icon="ri:notification-line" width="35" height="35" class="nav-icon" />
        <Icon icon="ri:fullscreen-line" width="35" height="35" class="nav-icon" />
        <!-- 主题切换 -->
        <el-popover trigger="click" placement="bottom" :width="320" popper-class="bg-picker">
          <template #reference>
            <Icon icon="ri:paint-brush-line" width="35" height="35" class="nav-icon" />
          </template>
          <div class="bg-picker-grid">
            <div
              v-for="bg in appStore.backgrounds"
              :key="bg.id"
              class="bg-option"
              :class="{ active: appStore.currentBg.id === bg.id }"
              @click="appStore.setBackground(bg)"
            >
              <div class="bg-thumb" :style="{ backgroundImage: `url(${bg.file})` }" />
              <span class="bg-name">{{ bg.name }}</span>
            </div>
          </div>
        </el-popover>
        <el-dropdown trigger="click">
          <div class="user-info">
            <el-avatar :size="35">
              <Icon icon="ri:user-3-line" width="22" height="22" />
            </el-avatar>
            <span class="user-name">{{ appStore.user.name }}</span>
            <el-tag size="small" type="info" effect="plain" style="margin-left:6px">{{ userDept }}</el-tag>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/profile')">
                <Icon icon="ri:user-line" width="16" height="16" style="margin-right:6px;vertical-align:middle" />个人中心
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                <Icon icon="ri:logout-box-r-line" width="16" height="16" style="margin-right:6px;vertical-align:middle" />退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>

    <div class="main-body">
      <!-- 左侧边栏 -->
      <aside class="sidebar" :class="{ collapsed: appStore.sidebarCollapsed }">
        <div class="sidebar-inner">
          <template v-for="item in menuData" :key="item.id">
            <!-- 单个菜单项 -->
            <div
              v-if="item.type !== 'group'"
              class="menu-item"
              :class="{ active: isActive(item.route) }"
              @click="navigate(item)"
            >
              <Icon :icon="item.icon" width="24" height="24" />
              <span class="menu-label">{{ item.label }}</span>
              <el-badge v-if="item.badge" :value="item.badge" class="menu-badge" />
            </div>

            <!-- 分组标题 -->
            <div v-else class="menu-group">
              <div class="group-title" @click="toggleGroup(item.id)">
                <span class="group-label">{{ item.label }}</span>
                <Icon icon="ri:arrow-right-s-line" width="14" height="14" class="group-arrow" :class="{ rotated: expandedGroups[item.id] }">
                </Icon>
              </div>
              <Transition name="slide">
                <div v-show="expandedGroups[item.id]" class="group-children">
                  <div
                    v-for="child in item.children"
                    :key="child.id"
                    class="menu-item child-item"
                    :class="{ active: isActive(child.route) }"
                    @click="navigate(child)"
                  >
                    <Icon :icon="child.icon" width="22" height="22" />
                    <span class="menu-label">{{ child.label }}</span>
                  </div>
                </div>
              </Transition>
            </div>
          </template>
        </div>
      </aside>

      <!-- 主内容区 -->
      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '../store/app'
import { useWorkbenchStore } from '../store/workbench'
import { sidebarMenus } from './menuData'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const workbench = useWorkbenchStore()

const userDept = computed(() => {
  // Show department from identity or fallback
  return appStore.user.dept || '分销部'
})

// 融合菜单（加 badge）
const menuData = computed(() => sidebarMenus.map(item => {
  if (item.type !== 'group') return item
  return {
    ...item,
    children: item.children.map(child => {
      if (child.id === 'wb-receive' && workbench.receiveCount > 0) {
        return { ...child, badge: workbench.receiveCount }
      }
      if (child.id === 'wb-todo' && workbench.todoCount > 0) {
        return { ...child, badge: workbench.todoCount }
      }
      return child
    }),
  }
}))

const expandedGroups = reactive({})
menuData.value.forEach((item) => {
  if (item.type === 'group') {
    expandedGroups[item.id] = true
  }
})

const topTabs = [
  { key: 'home', label: '首页' },
  { key: 'oa', label: 'OA办公' },
  { key: 'tools', label: '工具集' },
]

function switchTopTab(key) {
  appStore.topNavActive = key
  if (key === 'home') router.push('/dashboard')
  else if (key === 'oa') router.push('/oa/tasks')
  else if (key === 'tools') router.push('/tools')
}

function toggleGroup(id) {
  expandedGroups[id] = !expandedGroups[id]
}

function isActive(menuRoute) {
  return route.path === menuRoute || route.path.startsWith(menuRoute + '/')
}

function navigate(item) {
  if (item.route) router.push(item.route)
}

function handleLogout() {
  appStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.main-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* ========= 背景 ========= */
/* ========= 背景 ========= */
.bg-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: center/cover no-repeat fixed;
  z-index: 0;
  transition: background-image 0.5s ease;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
}

/* ========= 顶部导航 ========= */
.top-nav {
  position: relative;
  z-index: 100;
  height: 64px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(232, 232, 232, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
  margin: 12px 16px 0;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.top-nav-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.top-tabs {
  display: flex;
  gap: 4px;
}

.top-tab {
  padding: 6px 16px;
  font-size: 14px;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.top-tab:hover {
  color: #1a7cf7;
  background: rgba(26, 124, 247, 0.08);
}

.top-tab.active {
  color: #1a7cf7;
  background: rgba(26, 124, 247, 0.1);
  font-weight: 500;
}

.top-nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-icon {
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  font-size: 35px;
  transition: all 0.2s;
}

.nav-icon:hover {
  background: rgba(0, 0, 0, 0.04);
  color: #1a7cf7;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.user-info:hover {
  background: rgba(0, 0, 0, 0.04);
}

.user-name {
  font-size: 14px;
  color: #333;
}

/* ========= 主体 ========= */
.main-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  padding: 12px 16px 16px;
  gap: 12px;
  position: relative;
  z-index: 1;
}

/* ========= 侧边栏 ========= */
.sidebar {
  width: 220px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 12px;
  overflow-y: auto;
  flex-shrink: 0;
  transition: width 0.3s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-inner {
  padding: 8px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
  border-radius: 0;
  position: relative;
}

.menu-item:hover {
  background: rgba(26, 124, 247, 0.06);
  color: #1a7cf7;
}

.menu-item.active {
  color: #1a7cf7;
  background: rgba(26, 124, 247, 0.1);
  font-weight: 500;
}

.menu-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: #1a7cf7;
  border-radius: 0 3px 3px 0;
}

.child-item {
  padding-left: 44px;
  font-size: 13px;
}

.menu-label {
  flex: 1;
}

.menu-badge {
  margin-left: auto;
}

/* ========= 分组 ========= */
.menu-group {
  margin-top: 4px;
}

.group-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px 6px;
  font-size: 12px;
  color: #999;
  cursor: pointer;
  user-select: none;
}

.group-label {
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.group-arrow {
  transition: transform 0.2s;
}

.group-arrow.rotated {
  transform: rotate(90deg);
}

.group-children {
  overflow: hidden;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 500px;
}

/* ========= 内容区 ========= */
.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: transparent;
  display: flex;
  flex-direction: column;
}


</style>
