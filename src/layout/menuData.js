// 侧栏菜单结构（使用 Remix Icon）
// 图标名: https://icon-sets.iconify.design/ri/

export const sidebarMenus = [
  {
    id: 'home',
    label: '首页',
    icon: 'ri:home-4-line',
    route: '/dashboard',
  },
  {
    id: 'workbench',
    label: '工作台',
    type: 'group',
    children: [
      {
        id: 'wb-tools',
        label: '工具区',
        icon: 'ri:tool-line',
        route: '/workbench/tools',
      },
      {
        id: 'wb-websites',
        label: '网站区',
        icon: 'ri:global-line',
        route: '/workbench/websites',
      },
      {
        id: 'wb-launch',
        label: '发起区',
        icon: 'ri:send-plane-line',
        route: '/workbench/launch',
      },
      {
        id: 'wb-receive',
        label: '接受区',
        icon: 'ri:inbox-archive-line',
        route: '/workbench/receive',
        badgeType: 'count',
      },
      {
        id: 'wb-todo',
        label: '待办区',
        icon: 'ri:list-check-2',
        route: '/workbench/todo',
        badgeType: 'count',
      },
      {
        id: 'wb-done',
        label: '已完成区',
        icon: 'ri:checkbox-circle-line',
        route: '/workbench/done',
      },
    ],
  },
  {
    id: 'oa',
    label: 'OA办公',
    type: 'group',
    children: [
      { id: 'oa-tasks', label: '待办列表', icon: 'ri:task-line', route: '/oa/tasks' },
      { id: 'oa-tasks-done', label: '已办列表', icon: 'ri:checkbox-circle-line', route: '/oa/tasks-completed' },
      { id: 'oa-reads', label: '待阅列表', icon: 'ri:mail-open-line', route: '/oa/reads' },
      { id: 'oa-process', label: '发起流程', icon: 'ri:git-branch-line', route: '/oa/start' },
      { id: 'oa-address', label: '通讯录', icon: 'ri:contacts-line', route: '/oa/address' },
      { id: 'oa-content', label: '内容管理', icon: 'ri:article-line', route: '/oa/content' },
    ],
  },
  {
    id: 'profile',
    label: '个人中心',
    type: 'group',
    children: [
      { id: 'user-profile', label: '个人中心', icon: 'ri:user-line', route: '/profile' },
    ],
  },
]
