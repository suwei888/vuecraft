<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>Vue Router</h1>
      <p>Vue.js 官方路由管理器，构建单页应用的核心工具。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>路由基础</h2>
      <CodeBlock :files="routerExample" language="typescript" />
    </section>
    
    <section class="knowledge-page__section">
      <h2>导航守卫</h2>
      <el-timeline>
        <el-timeline-item v-for="guard in guards" :key="guard.name" :type="guard.type">
          <h4>{{ guard.name }}</h4>
          <p>{{ guard.desc }}</p>
        </el-timeline-item>
      </el-timeline>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const routerExample = ref([
  {
    name: '路由配置',
    code: `import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user/:id', component: User }  // 动态路由
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router`
  }
])

const guards = ref([
  { name: 'beforeEach', desc: '全局前置守卫，常用于权限验证', type: 'primary' },
  { name: 'beforeResolve', desc: '全局解析守卫，所有组件内守卫完成后调用', type: 'success' },
  { name: 'afterEach', desc: '全局后置钩子，没有 next 函数', type: 'info' },
  { name: 'beforeEnter', desc: '路由独享守卫', type: 'warning' },
  { name: 'beforeRouteEnter', desc: '组件内守卫，不能访问 this', type: 'danger' },
  { name: 'beforeRouteUpdate', desc: '组件复用时调用', type: 'warning' },
  { name: 'beforeRouteLeave', desc: '离开组件时调用，常用于防止未保存离开', type: 'info' }
])
</script>