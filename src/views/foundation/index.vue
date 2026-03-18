<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>基础篇</h1>
      <p>Vue3 的核心基础知识，包括响应式系统、生命周期、组合式 API、组件系统和指令系统。</p>
    </header>
    
    <div class="chapter-cards">
      <el-row :gutter="24">
        <el-col :span="12" v-for="item in chapters" :key="item.path">
          <el-card class="chapter-card" @click="$router.push(item.path)">
            <div class="chapter-icon">
              <el-icon :size="32"><component :is="item.icon" /></el-icon>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="chapter-topics">
              <el-tag v-for="topic in item.topics" :key="topic" size="small">{{ topic }}</el-tag>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const chapters = ref([
  {
    title: '响应式系统',
    desc: '理解 Vue3 响应式原理，掌握 reactive、ref、computed、watch 等核心 API',
    icon: 'Connection',
    path: '/foundation/reactive',
    topics: ['reactive', 'ref', 'computed', 'watch', 'watchEffect']
  },
  {
    title: '生命周期',
    desc: '掌握 Vue3 组件生命周期钩子，理解组件实例化过程',
    icon: 'Refresh',
    path: '/foundation/lifecycle',
    topics: ['onMounted', 'onUpdated', 'onUnmounted', '生命周期图']
  },
  {
    title: '组合式 API',
    desc: '深入理解 setup 函数和组合式函数，掌握逻辑复用模式',
    icon: 'Grid',
    path: '/foundation/composition',
    topics: ['setup', 'Composables', 'Provide/Inject', '逻辑复用']
  },
  {
    title: '组件系统',
    desc: '掌握组件通信、Props、Emits、Slots、动态组件等核心概念',
    icon: 'Box',
    path: '/foundation/component',
    topics: ['Props', 'Emits', 'Slots', '动态组件', '异步组件']
  },
  {
    title: '指令系统',
    desc: '理解内置指令原理，掌握自定义指令开发',
    icon: 'Aim',
    path: '/foundation/directive',
    topics: ['v-model', 'v-if/v-show', 'v-for', '自定义指令']
  }
])
</script>

<style lang="scss" scoped>
.chapter-cards {
  margin-top: 24px;
}

.chapter-card {
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 24px;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
  
  .chapter-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin-bottom: 16px;
  }
  
  h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  
  p {
    color: #909399;
    margin-bottom: 16px;
    line-height: 1.6;
  }
  
  .chapter-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>