<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>性能优化</h1>
      <p>Vue3 性能优化实践：渲染优化、虚拟列表、首屏优化。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>优化清单</h2>
      <el-table :data="optimizationItems" border stripe>
        <el-table-column prop="category" label="类别" width="120" />
        <el-table-column prop="method" label="方法" width="180" />
        <el-table-column prop="effect" label="效果" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const optimizationItems = ref([
  { category: '渲染优化', method: 'v-once / v-memo', effect: '跳过不必要的更新' },
  { category: '渲染优化', method: '虚拟列表', effect: '大数据列表性能' },
  { category: '渲染优化', method: 'v-show vs v-if', effect: '频繁切换用 v-show' },
  { category: '计算优化', method: 'computed 缓存', effect: '避免重复计算' },
  { category: '计算优化', method: 'shallowRef', effect: '避免深层响应' },
  { category: '加载优化', method: '异步组件', effect: '按需加载' },
  { category: '加载优化', method: '路由懒加载', effect: '首屏体积减小' },
  { category: '首屏优化', method: 'SSR/SSG', effect: '首屏渲染速度' }
])
</script>