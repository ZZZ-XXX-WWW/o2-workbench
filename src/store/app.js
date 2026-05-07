import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false)
  const user = ref({
    name: '管理员',
    avatar: '',
    role: 'admin',
  })
  const topNavActive = ref('home')

  // 背景主题
  const backgrounds = [
    { id: 'bg1', name: '莫兰迪清新', file: '/bg.jpg' },
    { id: 'bg2', name: '暖色水彩', file: '/bg2.jpg' },
    { id: 'bg3', name: '蓝紫科技', file: '/bg3.jpg' },
    { id: 'bg4', name: '青绿山水', file: '/bg4.jpg' },
    { id: 'bg5', name: '暖阳金', file: '/bg5.jpg' },
  ]
  const currentBg = ref(backgrounds[0])

  const isLoggedIn = computed(() => !!user.value.name)

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function setUser(info) {
    user.value = { ...user.value, ...info }
  }

  function setBackground(bg) {
    currentBg.value = bg
  }

  function logout() {
    user.value = { name: '', avatar: '', role: '' }
  }

  return {
    sidebarCollapsed,
    user,
    topNavActive,
    backgrounds,
    currentBg,
    isLoggedIn,
    toggleSidebar,
    setUser,
    setBackground,
    logout,
  }
})
