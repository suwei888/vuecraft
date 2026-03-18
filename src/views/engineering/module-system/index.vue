<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>模块化系统</h1>
      <p>理解 JavaScript 模块化的发展历程和不同规范的原理。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>模块规范对比</h2>
      <el-table :data="moduleComparison" border stripe>
        <el-table-column prop="name" label="规范" width="150" />
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column prop="load" label="加载方式" width="120" />
        <el-table-column prop="feature" label="特点" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const moduleComparison = ref([
  { name: 'ES Module', type: '官方标准', load: '编译时', feature: '静态分析，Tree Shaking 支持' },
  { name: 'CommonJS', type: 'Node.js', load: '运行时', feature: '同步加载，require/exports' },
  { name: 'AMD', type: '浏览器端', load: '运行时', feature: '异步加载，define/require' },
  { name: 'UMD', type: '通用', load: '运行时', feature: '兼容 CommonJS 和 AMD' }
])
</script>