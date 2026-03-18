<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>加载优化</h1>
      <p>优化资源加载：懒加载、预加载、骨架屏。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>加载策略</h2>
      <el-table :data="loadingStrategies" border stripe>
        <el-table-column prop="strategy" label="策略" width="120" />
        <el-table-column prop="timing" label="时机" width="120" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="usage" label="适用场景" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loadingStrategies = ref([
  { strategy: '懒加载', timing: '需要时', desc: '延迟加载非关键资源', usage: '图片、组件、路由' },
  { strategy: '预加载', timing: '空闲时', desc: '提前加载即将需要的资源', usage: '下一页资源' },
  { strategy: '预连接', timing: '页面加载时', desc: '提前建立连接', usage: 'CDN、API域名' },
  { strategy: '骨架屏', timing: '加载前', desc: '展示页面轮廓', usage: '首屏加载' }
])
</script>