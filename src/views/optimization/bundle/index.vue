<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>打包优化</h1>
      <p>减少打包体积，提升加载速度：Tree Shaking、代码分割、包分析。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>Tree Shaking 原理</h2>
      <p>Tree Shaking 利用 ES Module 的静态分析特性，移除未使用的代码。</p>
      <CodeBlock :files="treeShakingExample" language="typescript" />
    </section>
    
    <section class="knowledge-page__section">
      <h2>代码分割</h2>
      <CodeBlock :files="codeSplitExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const treeShakingExample = ref([
  {
    name: 'Tree Shaking 原理',
    code: `// Tree Shaking 条件：
// 1. 使用 ES Module (import/export)
// 2. 没有副作用 (sideEffects: false)
// 3. 生产模式构建

// math.js
export function add(a, b) { return a + b }
export function subtract(a, b) { return a - b }

// main.js
import { add } from './math'
console.log(add(1, 2))

// Tree Shaking 后，subtract 函数会被移除

// package.json 配置
{
  "sideEffects": false  // 声明无副作用，允许 Tree Shaking
}`
  }
])

const codeSplitExample = ref([
  {
    name: '代码分割',
    code: `// 1. 动态导入 (推荐)
const AsyncComponent = defineAsyncComponent(() => 
  import('./components/Heavy.vue')
)

// 2. 路由懒加载
const routes = [
  { path: '/about', component: () => import('./views/About.vue') }
]

// 3. Vite 手动分割
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'ui': ['element-plus']
        }
      }
    }
  }
})`
  }
])
</script>