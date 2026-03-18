<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>源码架构</h1>
      <p>Vue3 源码架构解析：调度器、渲染器、响应式系统模块设计。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>Vue3 架构分层</h2>
      <div class="architecture">
        <el-card v-for="layer in architecture" :key="layer.name" class="layer-card">
          <h4>{{ layer.name }}</h4>
          <p>{{ layer.desc }}</p>
          <div class="modules">
            <el-tag v-for="m in layer.modules" :key="m" size="small">{{ m }}</el-tag>
          </div>
        </el-card>
      </div>
    </section>
    
    <section class="knowledge-page__section">
      <h2>核心模块</h2>
      <el-table :data="coreModules" border stripe>
        <el-table-column prop="module" label="模块" width="150" />
        <el-table-column prop="path" label="源码路径" width="180" />
        <el-table-column prop="desc" label="功能" />
      </el-table>
    </section>
    
    <section class="knowledge-page__section">
      <h2>调度器原理</h2>
      <CodeBlock :files="schedulerExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const architecture = ref([
  {
    name: '编译器',
    desc: '将模板编译为渲染函数',
    modules: ['compiler-core', 'compiler-dom', 'compiler-sfc']
  },
  {
    name: '响应式',
    desc: '数据响应式系统',
    modules: ['reactivity']
  },
  {
    name: '运行时',
    desc: '组件渲染和更新',
    modules: ['runtime-core', 'runtime-dom']
  },
  {
    name: '服务端渲染',
    desc: 'SSR 支持',
    modules: ['server-renderer']
  }
])

const coreModules = ref([
  { module: 'reactivity', path: 'packages/reactivity', desc: '响应式系统：reactive、ref、computed、effect' },
  { module: 'runtime-core', path: 'packages/runtime-core', desc: '运行时核心：组件、渲染器、调度器' },
  { module: 'runtime-dom', path: 'packages/runtime-dom', desc: '浏览器运行时：DOM 操作、事件处理' },
  { module: 'compiler-core', path: 'packages/compiler-core', desc: '编译器核心：AST、转换、代码生成' },
  { module: 'compiler-dom', path: 'packages/compiler-dom', desc: '浏览器编译器：HTML 模板编译' }
])

const schedulerExample = ref([
  {
    name: '调度器实现',
    code: `// Vue3 调度器原理
// 批量更新：多次数据修改合并为一次更新

const queue: Function[] = []
let isFlushing = false
let isFlushPending = false

const resolvedPromise = Promise.resolve()

// 添加到队列
export function queueJob(job: Function) {
  if (!queue.includes(job)) {
    queue.push(job)
    queueFlush()
  }
}

// 刷新队列
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true
    resolvedPromise.then(flushJobs)
  }
}

// 执行队列中的任务
function flushJobs() {
  isFlushPending = false
  isFlushing = true
  
  // 按优先级排序
  queue.sort((a, b) => a.id - b.id)
  
  try {
    for (let i = 0; i < queue.length; i++) {
      const job = queue[i]
      job()
    }
  } finally {
    queue.length = 0
    isFlushing = false
  }
}

// 使用示例
state.count++
state.count++
state.count++
// 最终只触发一次更新（批量更新）`
  }
])
</script>

<style lang="scss" scoped>
.architecture {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  .layer-card {
    h4 {
      color: #409eff;
      margin-bottom: 8px;
    }
    
    p {
      color: #606266;
      margin-bottom: 12px;
    }
    
    .modules {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
}
</style>