<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>项目配置</h1>
      <p>前端项目工程化配置：Vite、TypeScript、ESLint、Prettier 等。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>ES Module 原理</h2>
      <p>ES Module 是 JavaScript 的官方模块标准，具有静态结构，支持 Tree Shaking。</p>
      <CodeBlock :files="esmExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const esmExample = ref([
  {
    name: 'ES Module 特性',
    code: `// 导出
export const name = 'Vue3'
export function hello() {
  return 'Hello ' + name
}
export default { name, hello }

// 导入
import { name, hello } from './module'
import myModule from './module'  // 默认导出
import * as all from './module'   // 命名空间导入

// 动态导入
const module = await import('./module')

// ES Module 特点：
// 1. 静态分析 - 编译时确定依赖关系
// 2. 活绑定 - 导入的是引用而非副本
// 3. 异步加载 - 模块异步加载
// 4. 严格模式 - 自动启用严格模式`
  }
])
</script>