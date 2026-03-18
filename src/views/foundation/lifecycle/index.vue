<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>生命周期</h1>
      <p>Vue3 组件从创建到销毁的完整生命周期，理解每个钩子函数的调用时机和使用场景。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>生命周期图示</h2>
      <el-timeline>
        <el-timeline-item v-for="stage in lifecycleStages" :key="stage.name" :type="stage.type">
          <el-card>
            <h4>{{ stage.name }}</h4>
            <p>{{ stage.desc }}</p>
            <code v-if="stage.hook">{{ stage.hook }}</code>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const lifecycleStages = ref([
  { name: '创建阶段', desc: '组件实例初始化', hook: 'beforeCreate / created (Options API)', type: 'primary' },
  { name: '挂载阶段', desc: '组件挂载到 DOM', hook: 'onBeforeMount / onMounted', type: 'success' },
  { name: '更新阶段', desc: '响应式数据变化触发更新', hook: 'onBeforeUpdate / onUpdated', type: 'warning' },
  { name: '卸载阶段', desc: '组件从 DOM 移除', hook: 'onBeforeUnmount / onUnmounted', type: 'danger' },
  { name: '错误捕获', desc: '捕获后代组件错误', hook: 'onErrorCaptured', type: 'info' }
])
</script>