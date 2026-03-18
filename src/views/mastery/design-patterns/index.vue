<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>设计模式</h1>
      <p>Vue3 中的设计模式：高阶组件、无渲染组件、组合模式。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>Vue3 设计模式</h2>
      <el-table :data="patterns" border stripe>
        <el-table-column prop="name" label="模式" width="150" />
        <el-table-column prop="purpose" label="目的" width="120" />
        <el-table-column prop="desc" label="描述" />
      </el-table>
    </section>
    
    <section class="knowledge-page__section">
      <h2>组合式函数示例</h2>
      <CodeBlock :files="composableExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const patterns = ref([
  { name: '组合式函数', purpose: '逻辑复用', desc: '将可复用逻辑封装为函数' },
  { name: '无渲染组件', purpose: '关注点分离', desc: '只提供行为，不渲染 UI' },
  { name: '高阶组件', purpose: '组件增强', desc: '包装组件添加额外功能' },
  { name: '提供/注入', purpose: '依赖注入', desc: '跨层级传递数据' }
])

const composableExample = ref([
  {
    name: '组合式函数',
    code: `// useCounter.ts - 可复用的计数器逻辑
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const double = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = initialValue
  }
  
  return {
    count,
    double,
    increment,
    decrement,
    reset
  }
}

// 使用
import { useCounter } from './useCounter'

const { count, double, increment } = useCounter(10)

// useMouse.ts - 鼠标位置追踪
export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  
  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
  }
  
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))
  
  return { x, y }
}`
  }
])
</script>