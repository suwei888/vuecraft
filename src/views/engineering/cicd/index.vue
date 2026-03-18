<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>CI/CD</h1>
      <p>持续集成和持续部署，自动化构建、测试和部署流程。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>Git Hooks</h2>
      <p>Git 钩子允许在特定事件发生时执行自定义脚本。</p>
      
      <el-table :data="gitHooks" border stripe>
        <el-table-column prop="hook" label="钩子" width="180" />
        <el-table-column prop="timing" label="触发时机" width="150" />
        <el-table-column prop="usage" label="用途" />
      </el-table>
    </section>
    
    <section class="knowledge-page__section">
      <h2>Husky 配置</h2>
      <p>Husky 简化了 Git Hooks 的配置和管理。</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const gitHooks = ref([
  { hook: 'pre-commit', timing: '提交前', usage: '代码检查、格式化' },
  { hook: 'commit-msg', timing: '提交信息编辑后', usage: '验证提交信息格式' },
  { hook: 'pre-push', timing: '推送前', usage: '运行测试' },
  { hook: 'post-merge', timing: '合并后', usage: '自动安装依赖' }
])
</script>