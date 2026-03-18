<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>包管理</h1>
      <p>理解 npm、pnpm、yarn 的原理和差异，掌握 Monorepo 架构。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>npm vs pnpm vs yarn</h2>
      <el-table :data="packageComparison" border stripe>
        <el-table-column prop="feature" label="特性" width="150" />
        <el-table-column prop="npm" label="npm" />
        <el-table-column prop="pnpm" label="pnpm" />
        <el-table-column prop="yarn" label="yarn" />
      </el-table>
    </section>
    
    <section class="knowledge-page__section">
      <h2>pnpm 原理</h2>
      <p>pnpm 使用硬链接和符号链接实现高效的磁盘空间利用。</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const packageComparison = ref([
  { feature: 'node_modules 结构', npm: '扁平化', pnpm: '硬链接 + 符号链接', yarn: '扁平化' },
  { feature: '安装速度', npm: '中等', pnpm: '快', yarn: '快' },
  { feature: '磁盘空间', npm: '每个项目独立存储', pnpm: '全局存储 + 链接', yarn: '每个项目独立存储' },
  { feature: '幽灵依赖', npm: '存在', pnpm: '不存在', yarn: '存在' }
])
</script>