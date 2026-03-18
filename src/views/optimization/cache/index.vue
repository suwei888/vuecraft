<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>缓存策略</h1>
      <p>合理使用缓存，减少网络请求，提升加载速度。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>缓存类型</h2>
      <el-table :data="cacheTypes" border stripe>
        <el-table-column prop="type" label="类型" width="150" />
        <el-table-column prop="location" label="位置" width="120" />
        <el-table-column prop="feature" label="特点" />
      </el-table>
    </section>
    
    <section class="knowledge-page__section">
      <h2>HTTP 缓存策略</h2>
      <CodeBlock :files="httpCacheExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const cacheTypes = ref([
  { type: '强缓存', location: '浏览器', feature: '不发请求，直接使用缓存' },
  { type: '协商缓存', location: '浏览器+服务器', feature: '发请求验证，304 使用缓存' },
  { type: 'Service Worker', location: '浏览器', feature: '可编程缓存，支持离线' },
  { type: 'CDN 缓存', location: 'CDN 节点', feature: '边缘节点缓存，加速访问' }
])

const httpCacheExample = ref([
  {
    name: 'HTTP 缓存配置',
    code: `// 静态资源 - 强缓存 (1年)
// 文件名带 hash，内容变化时 hash 变化
Cache-Control: max-age=31536000, immutable

// HTML - 协商缓存
Cache-Control: no-cache
ETag: "abc123"

// API - 按需设置
Cache-Control: max-age=60, stale-while-revalidate=300

// Service Worker 缓存策略
// 1. Cache First - 缓存优先，适合静态资源
// 2. Network First - 网络优先，适合动态内容
// 3. Stale While Revalidate - 边缓存边更新`
  }
])
</script>