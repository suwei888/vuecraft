import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface MenuItem {
  path: string
  title: string
  icon: string
  children?: MenuItem[]
}

export const useNavigationStore = defineStore('navigation', () => {
  const currentPath = ref<string>('')
  const expandedMenus = ref<string[]>(['/foundation', '/advanced', '/ecosystem', '/engineering', '/security', '/optimization', '/mastery'])
  
  const menuItems = ref<MenuItem[]>([
    {
      path: '/',
      title: '首页',
      icon: 'HomeFilled'
    },
    {
      path: '/foundation',
      title: '基础篇',
      icon: 'Collection',
      children: [
        { path: '/foundation/reactive', title: '响应式系统', icon: 'Connection' },
        { path: '/foundation/lifecycle', title: '生命周期', icon: 'Refresh' },
        { path: '/foundation/composition', title: '组合式API', icon: 'Grid' },
        { path: '/foundation/component', title: '组件系统', icon: 'Box' },
        { path: '/foundation/directive', title: '指令系统', icon: 'Aim' }
      ]
    },
    {
      path: '/advanced',
      title: '进阶篇',
      icon: 'TrendCharts',
      children: [
        { path: '/advanced/teleport-suspense', title: 'Teleport/Suspense', icon: 'Position' },
        { path: '/advanced/render-function', title: '渲染函数', icon: 'Edit' },
        { path: '/advanced/virtual-dom', title: '虚拟DOM', icon: 'Document' },
        { path: '/advanced/compiler', title: '编译器原理', icon: 'Cpu' }
      ]
    },
    {
      path: '/ecosystem',
      title: '生态篇',
      icon: 'Share',
      children: [
        { path: '/ecosystem/vue-router', title: 'Vue Router', icon: 'Guide' },
        { path: '/ecosystem/pinia', title: 'Pinia状态管理', icon: 'DataBoard' },
        { path: '/ecosystem/vite', title: 'Vite构建工具', icon: 'Lightning' }
      ]
    },
    {
      path: '/engineering',
      title: '工程化篇',
      icon: 'Setting',
      children: [
        { path: '/engineering/project-config', title: '项目配置', icon: 'Tools' },
        { path: '/engineering/module-system', title: '模块化系统', icon: 'Menu' },
        { path: '/engineering/package-manager', title: '包管理', icon: 'Box' },
        { path: '/engineering/cicd', title: 'CI/CD', icon: 'Promotion' }
      ]
    },
    {
      path: '/security',
      title: '安全篇',
      icon: 'Lock',
      children: [
        { path: '/security/xss', title: 'XSS防护', icon: 'Warning' },
        { path: '/security/csrf', title: 'CSRF防御', icon: 'Lock' },
        { path: '/security/encryption', title: '加密算法', icon: 'Key' },
        { path: '/security/data-protection', title: '数据保护', icon: 'User' }
      ]
    },
    {
      path: '/optimization',
      title: '优化篇',
      icon: 'Odometer',
      children: [
        { path: '/optimization/bundle', title: '打包优化', icon: 'Files' },
        { path: '/optimization/compress', title: '压缩策略', icon: 'Document' },
        { path: '/optimization/loading', title: '加载优化', icon: 'Timer' },
        { path: '/optimization/cache', title: '缓存策略', icon: 'Clock' }
      ]
    },
    {
      path: '/mastery',
      title: '高级篇',
      icon: 'Star',
      children: [
        { path: '/mastery/typescript', title: 'TypeScript进阶', icon: 'Document' },
        { path: '/mastery/performance', title: '性能优化', icon: 'Odometer' },
        { path: '/mastery/design-patterns', title: '设计模式', icon: 'Grid' },
        { path: '/mastery/source-architecture', title: '源码架构', icon: 'DataAnalysis' }
      ]
    }
  ])
  
  const currentMenu = computed(() => {
    return menuItems.value.find(item => currentPath.value.startsWith(item.path) && item.path !== '/')
  })
  
  function setCurrentPath(path: string) {
    currentPath.value = path
  }
  
  function toggleMenu(path: string) {
    const index = expandedMenus.value.indexOf(path)
    if (index > -1) {
      expandedMenus.value.splice(index, 1)
    } else {
      expandedMenus.value.push(path)
    }
  }
  
  function isExpanded(path: string) {
    return expandedMenus.value.includes(path)
  }
  
  return {
    menuItems,
    currentPath,
    expandedMenus,
    currentMenu,
    setCurrentPath,
    toggleMenu,
    isExpanded
  }
})