import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/Landing.vue'),
    meta: { title: 'VueCraft - Secure Crypto Trading', icon: 'TrendCharts', noLayout: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页', icon: 'HomeFilled' }
  },
  // 基础篇
  {
    path: '/foundation',
    name: 'Foundation',
    component: () => import('@/views/foundation/index.vue'),
    meta: { title: '基础篇', icon: 'Collection' },
    children: [
      {
        path: 'reactive',
        name: 'ReactiveSystem',
        component: () => import('@/views/foundation/reactive-system/index.vue'),
        meta: { title: '响应式系统', icon: 'Connection' }
      },
      {
        path: 'lifecycle',
        name: 'Lifecycle',
        component: () => import('@/views/foundation/lifecycle/index.vue'),
        meta: { title: '生命周期', icon: 'Refresh' }
      },
      {
        path: 'composition',
        name: 'CompositionAPI',
        component: () => import('@/views/foundation/composition-api/index.vue'),
        meta: { title: '组合式API', icon: 'Grid' }
      },
      {
        path: 'component',
        name: 'Component',
        component: () => import('@/views/foundation/component/index.vue'),
        meta: { title: '组件系统', icon: 'Box' }
      },
      {
        path: 'directive',
        name: 'Directive',
        component: () => import('@/views/foundation/directive/index.vue'),
        meta: { title: '指令系统', icon: 'Aim' }
      }
    ]
  },
  // 进阶篇
  {
    path: '/advanced',
    name: 'Advanced',
    component: () => import('@/views/advanced/index.vue'),
    meta: { title: '进阶篇', icon: 'TrendCharts' },
    children: [
      {
        path: 'teleport-suspense',
        name: 'TeleportSuspense',
        component: () => import('@/views/advanced/teleport-suspense/index.vue'),
        meta: { title: 'Teleport/Suspense', icon: 'Position' }
      },
      {
        path: 'render-function',
        name: 'RenderFunction',
        component: () => import('@/views/advanced/render-function/index.vue'),
        meta: { title: '渲染函数', icon: 'Edit' }
      },
      {
        path: 'virtual-dom',
        name: 'VirtualDOM',
        component: () => import('@/views/advanced/virtual-dom/index.vue'),
        meta: { title: '虚拟DOM', icon: 'Document' }
      },
      {
        path: 'compiler',
        name: 'Compiler',
        component: () => import('@/views/advanced/compiler/index.vue'),
        meta: { title: '编译器原理', icon: 'Cpu' }
      }
    ]
  },
  // 生态篇
  {
    path: '/ecosystem',
    name: 'Ecosystem',
    component: () => import('@/views/ecosystem/index.vue'),
    meta: { title: '生态篇', icon: 'Share' },
    children: [
      {
        path: 'vue-router',
        name: 'VueRouter',
        component: () => import('@/views/ecosystem/vue-router/index.vue'),
        meta: { title: 'Vue Router', icon: 'Guide' }
      },
      {
        path: 'pinia',
        name: 'Pinia',
        component: () => import('@/views/ecosystem/pinia/index.vue'),
        meta: { title: 'Pinia状态管理', icon: 'DataBoard' }
      },
      {
        path: 'vite',
        name: 'Vite',
        component: () => import('@/views/ecosystem/vite/index.vue'),
        meta: { title: 'Vite构建工具', icon: 'Lightning' }
      }
    ]
  },
  // 工程化篇
  {
    path: '/engineering',
    name: 'Engineering',
    component: () => import('@/views/engineering/index.vue'),
    meta: { title: '工程化篇', icon: 'Setting' },
    children: [
      {
        path: 'project-config',
        name: 'ProjectConfig',
        component: () => import('@/views/engineering/project-config/index.vue'),
        meta: { title: '项目配置', icon: 'Tools' }
      },
      {
        path: 'module-system',
        name: 'ModuleSystem',
        component: () => import('@/views/engineering/module-system/index.vue'),
        meta: { title: '模块化系统', icon: 'Menu' }
      },
      {
        path: 'package-manager',
        name: 'PackageManager',
        component: () => import('@/views/engineering/package-manager/index.vue'),
        meta: { title: '包管理', icon: 'Box' }
      },
      {
        path: 'cicd',
        name: 'CICD',
        component: () => import('@/views/engineering/cicd/index.vue'),
        meta: { title: 'CI/CD', icon: 'Promotion' }
      }
    ]
  },
  // 安全篇
  {
    path: '/security',
    name: 'Security',
    component: () => import('@/views/security/index.vue'),
    meta: { title: '安全篇', icon: 'Lock' },
    children: [
      {
        path: 'xss',
        name: 'XSS',
        component: () => import('@/views/security/xss/index.vue'),
        meta: { title: 'XSS防护', icon: 'Warning' }
      },
      {
        path: 'csrf',
        name: 'CSRF',
        component: () => import('@/views/security/csrf/index.vue'),
        meta: { title: 'CSRF防御', icon: 'Shield' }
      },
      {
        path: 'encryption',
        name: 'Encryption',
        component: () => import('@/views/security/encryption/index.vue'),
        meta: { title: '加密算法', icon: 'Key' }
      },
      {
        path: 'data-protection',
        name: 'DataProtection',
        component: () => import('@/views/security/data-protection/index.vue'),
        meta: { title: '数据保护', icon: 'User' }
      }
    ]
  },
  // 优化篇
  {
    path: '/optimization',
    name: 'Optimization',
    component: () => import('@/views/optimization/index.vue'),
    meta: { title: '优化篇', icon: 'Odometer' },
    children: [
      {
        path: 'bundle',
        name: 'Bundle',
        component: () => import('@/views/optimization/bundle/index.vue'),
        meta: { title: '打包优化', icon: 'Files' }
      },
      {
        path: 'compress',
        name: 'Compress',
        component: () => import('@/views/optimization/compress/index.vue'),
        meta: { title: '压缩策略', icon: 'Compress' }
      },
      {
        path: 'loading',
        name: 'Loading',
        component: () => import('@/views/optimization/loading/index.vue'),
        meta: { title: '加载优化', icon: 'Loading' }
      },
      {
        path: 'cache',
        name: 'Cache',
        component: () => import('@/views/optimization/cache/index.vue'),
        meta: { title: '缓存策略', icon: 'Clock' }
      }
    ]
  },
  // 高级篇
  {
    path: '/mastery',
    name: 'Mastery',
    component: () => import('@/views/mastery/index.vue'),
    meta: { title: '高级篇', icon: 'Star' },
    children: [
      {
        path: 'typescript',
        name: 'TypeScriptAdvanced',
        component: () => import('@/views/mastery/typescript/index.vue'),
        meta: { title: 'TypeScript进阶', icon: 'Document' }
      },
      {
        path: 'performance',
        name: 'Performance',
        component: () => import('@/views/mastery/performance/index.vue'),
        meta: { title: '性能优化', icon: 'Speedometer' }
      },
      {
        path: 'design-patterns',
        name: 'DesignPatterns',
        component: () => import('@/views/mastery/design-patterns/index.vue'),
        meta: { title: '设计模式', icon: 'Grid' }
      },
      {
        path: 'source-architecture',
        name: 'SourceArchitecture',
        component: () => import('@/views/mastery/source-architecture/index.vue'),
        meta: { title: '源码架构', icon: 'DataAnalysis' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - Vue3+TS学习`
  }
  next()
})

export default router