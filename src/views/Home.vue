<template>
  <div class="home-page">
    <!-- 欢迎区域 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Vue3 + TypeScript
          <span class="gradient-text">学习指南</span>
        </h1>
        <p class="hero-desc">
          从第一性原理深入理解 Vue3 和 TypeScript，每个知识点都包含概念讲解、API使用、原理实现和最佳实践
        </p>
        <div class="hero-actions">
          <el-button type="primary" size="large" @click="$router.push('/foundation/reactive')">
            开始学习
          </el-button>
          <el-button size="large" @click="$router.push('/mastery/source-architecture')">
            源码解读
          </el-button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="code-preview">
          <pre><code class="language-typescript">// 响应式原理
const state = reactive({ count: 0 })

effect(() => {
  console.log(state.count) // 自动追踪依赖
})

state.count++ // 自动触发更新</code></pre>
        </div>
      </div>
    </div>

    <!-- 知识图谱 -->
    <div class="knowledge-map">
      <h2 class="section-title">知识体系</h2>
      <div class="map-grid">
        <div 
          v-for="section in sections" 
          :key="section.path"
          class="map-card"
          @click="$router.push(section.path)"
        >
          <div class="map-card__icon">
            <el-icon :size="32"><component :is="section.icon" /></el-icon>
          </div>
          <div class="map-card__content">
            <h3>{{ section.title }}</h3>
            <p>{{ section.desc }}</p>
            <div class="map-card__tags">
              <el-tag v-for="tag in section.tags" :key="tag" size="small">{{ tag }}</el-tag>
            </div>
          </div>
          <div class="map-card__count">
            <span class="count">{{ section.count }}</span>
            <span class="label">知识点</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 核心特性 -->
    <div class="features-section">
      <h2 class="section-title">学习方式</h2>
      <div class="features-grid">
        <div class="feature-item" v-for="feature in features" :key="feature.title">
          <el-icon :size="24"><component :is="feature.icon" /></el-icon>
          <h4>{{ feature.title }}</h4>
          <p>{{ feature.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 快速入口 -->
    <div class="quick-links">
      <h2 class="section-title">快速入口</h2>
      <div class="links-grid">
        <div 
          v-for="link in quickLinks" 
          :key="link.path"
          class="link-item"
          @click="$router.push(link.path)"
        >
          <el-icon><component :is="link.icon" /></el-icon>
          <span>{{ link.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sections = ref([
  {
    title: '基础篇',
    desc: '响应式系统、生命周期、组合式API、组件系统、指令系统',
    icon: 'Collection',
    path: '/foundation/reactive',
    tags: ['入门必学', '核心概念'],
    count: 25
  },
  {
    title: '进阶篇',
    desc: 'Teleport/Suspense、渲染函数、虚拟DOM、Diff算法、编译器原理',
    icon: 'TrendCharts',
    path: '/advanced/virtual-dom',
    tags: ['源码原理', '性能优化'],
    count: 20
  },
  {
    title: '生态篇',
    desc: 'Vue Router路由、Pinia状态管理、Vite构建工具',
    icon: 'Share',
    path: '/ecosystem/vue-router',
    tags: ['工具生态', '项目实战'],
    count: 15
  },
  {
    title: '工程化篇',
    desc: '项目配置、模块化、包管理、CI/CD、代码规范',
    icon: 'Setting',
    path: '/engineering/project-config',
    tags: ['团队协作', '规范流程'],
    count: 18
  },
  {
    title: '安全篇',
    desc: 'XSS防护、CSRF防御、加密算法、数据保护',
    icon: 'Lock',
    path: '/security/xss',
    tags: ['安全实践', '防护策略'],
    count: 12
  },
  {
    title: '优化篇',
    desc: 'Tree Shaking、代码分割、压缩策略、缓存优化',
    icon: 'Odometer',
    path: '/optimization/bundle',
    tags: ['性能调优', '最佳实践'],
    count: 16
  },
  {
    title: '高级篇',
    desc: 'TypeScript进阶、性能优化、设计模式、源码架构',
    icon: 'Star',
    path: '/mastery/typescript',
    tags: ['高级技巧', '架构设计'],
    count: 22
  }
])

const features = ref([
  {
    title: '第一性原理',
    desc: '从最基础的概念出发，深入理解每个知识点的本质',
    icon: 'Cpu'
  },
  {
    title: '手写源码',
    desc: '每个核心功能都有简化版源码实现，理解底层逻辑',
    icon: 'Edit'
  },
  {
    title: '可运行示例',
    desc: '所有示例代码都可以直接运行，边学边练',
    icon: 'VideoPlay'
  },
  {
    title: '最佳实践',
    desc: '总结生产环境中的最佳实践和常见陷阱',
    icon: 'Medal'
  },
  {
    title: '可视化演示',
    desc: '复杂原理通过可视化动画展示，直观易懂',
    icon: 'DataLine'
  },
  {
    title: '知识关联',
    desc: '建立知识点之间的联系，形成完整知识体系',
    icon: 'Connection'
  }
])

const quickLinks = ref([
  { title: '响应式原理', path: '/foundation/reactive', icon: 'Connection' },
  { title: '组合式API', path: '/foundation/composition', icon: 'Grid' },
  { title: '虚拟DOM', path: '/advanced/virtual-dom', icon: 'Document' },
  { title: 'Vue Router', path: '/ecosystem/vue-router', icon: 'Guide' },
  { title: '加密算法', path: '/security/encryption', icon: 'Key' },
  { title: '打包优化', path: '/optimization/bundle', icon: 'Files' },
  { title: '源码架构', path: '/mastery/source-architecture', icon: 'DataAnalysis' },
  { title: 'TypeScript', path: '/mastery/typescript', icon: 'Document' }
])
</script>

<style lang="scss" scoped>
.home-page {
  max-width: 1400px;
  margin: 0 auto;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  margin-bottom: 48px;
  
  .hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
  }
  
  .hero-title {
    font-size: 42px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
    
    .gradient-text {
      display: block;
      background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  .hero-desc {
    font-size: 16px;
    line-height: 1.8;
    opacity: 0.9;
    margin-bottom: 32px;
  }
  
  .hero-actions {
    display: flex;
    gap: 16px;
  }
  
  .hero-visual {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .code-preview {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 24px;
    backdrop-filter: blur(10px);
    
    pre {
      margin: 0;
      color: #e0e0e0;
      font-size: 14px;
      line-height: 1.8;
    }
    
    code {
      font-family: 'SF Mono', Monaco, Consolas, monospace;
    }
  }
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #303133;
}

.knowledge-map {
  margin-bottom: 48px;
  
  .map-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }
  
  .map-card {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    gap: 16px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid #e4e7ed;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      border-color: #409eff;
    }
    
    &__icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      flex-shrink: 0;
    }
    
    &__content {
      flex: 1;
      
      h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #303133;
      }
      
      p {
        font-size: 13px;
        color: #909399;
        margin-bottom: 12px;
        line-height: 1.6;
      }
    }
    
    &__tags {
      display: flex;
      gap: 8px;
    }
    
    &__count {
      text-align: center;
      
      .count {
        display: block;
        font-size: 24px;
        font-weight: 700;
        color: #409eff;
      }
      
      .label {
        font-size: 12px;
        color: #909399;
      }
    }
  }
}

.features-section {
  margin-bottom: 48px;
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  
  .feature-item {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    border: 1px solid #e4e7ed;
    
    .el-icon {
      color: #409eff;
      margin-bottom: 16px;
    }
    
    h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #303133;
    }
    
    p {
      font-size: 13px;
      color: #909399;
      line-height: 1.6;
    }
  }
}

.quick-links {
  margin-bottom: 32px;
  
  .links-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .link-item {
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 8px;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      border-color: #409eff;
      color: #409eff;
    }
    
    .el-icon {
      font-size: 18px;
    }
    
    span {
      font-size: 14px;
    }
  }
}
</style>