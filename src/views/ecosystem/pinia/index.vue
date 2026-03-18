<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>Pinia 状态管理</h1>
      <p>Vue 官方推荐的状态管理库，更简洁的 API 和更好的 TypeScript 支持。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>定义 Store</h2>
      <CodeBlock :files="storeExample" language="typescript" />
    </section>
    
    <section class="knowledge-page__section">
      <h2>Pinia vs Vuex</h2>
      <el-table :data="comparison" border stripe>
        <el-table-column prop="feature" label="特性" width="150" />
        <el-table-column prop="pinia" label="Pinia" />
        <el-table-column prop="vuex" label="Vuex" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const storeExample = ref([
  {
    name: 'Store 定义',
    code: `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 组合式 API 风格
export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0)
  
  // getters
  const double = computed(() => count.value * 2)
  
  // actions
  function increment() {
    count.value++
  }
  
  return { count, double, increment }
})

// 使用
const counter = useCounterStore()
counter.increment()
console.log(counter.count)
console.log(counter.double)`
  }
])

const comparison = ref([
  { feature: 'Mutation', pinia: '不需要，直接修改 state', vuex: '必须通过 mutation 修改' },
  { feature: 'TypeScript', pinia: '完美支持', vuex: '需要额外配置' },
  { feature: '模块化', pinia: '独立的 store', vuex: '单一 store + modules' },
  { feature: 'Devtools', pinia: '支持', vuex: '支持' }
])
</script>