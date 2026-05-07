import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    component: () => import('../layout/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { title: '首页' },
      },
      {
        path: 'oa/tasks',
        name: 'OATasks',
        component: () => import('../views/oa/TaskList.vue'),
        meta: { title: '待办列表' },
      },
      {
        path: 'oa/tasks-completed',
        name: 'OATasksCompleted',
        component: () => import('../views/oa/TaskCompleted.vue'),
        meta: { title: '已办列表' },
      },
      {
        path: 'oa/reads',
        name: 'OAReads',
        component: () => import('../views/oa/ReadList.vue'),
        meta: { title: '待阅列表' },
      },
      {
        path: 'tools',
        name: 'Tools',
        component: () => import('../views/tools/ToolList.vue'),
        meta: { title: '工具列表' },
      },
      {
        path: 'tools/history',
        name: 'ToolHistory',
        component: () => import('../views/tools/ToolHistory.vue'),
        meta: { title: '历史任务' },
      },
      {
        path: 'workbench/tools',
        name: 'ToolZone',
        component: () => import('../views/workbench/ToolZone.vue'),
        meta: { title: '工具区' },
      },
      {
        path: 'workbench/websites',
        name: 'WebsiteZone',
        component: () => import('../views/workbench/WebsiteZone.vue'),
        meta: { title: '网站区' },
      },
      {
        path: 'workbench/launch',
        name: 'TaskLaunch',
        component: () => import('../views/workbench/TaskLaunch.vue'),
        meta: { title: '发起区' },
      },
      {
        path: 'workbench/receive',
        name: 'TaskReceive',
        component: () => import('../views/workbench/TaskReceive.vue'),
        meta: { title: '接受区' },
      },
      {
        path: 'workbench/todo',
        name: 'TaskTodo',
        component: () => import('../views/workbench/TaskTodo.vue'),
        meta: { title: '待办区' },
      },
      {
        path: 'workbench/done',
        name: 'TaskDone',
        component: () => import('../views/workbench/TaskDone.vue'),
        meta: { title: '已完成区' },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: { title: '个人中心' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
