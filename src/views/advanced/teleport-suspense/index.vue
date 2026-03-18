<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>Teleport & Suspense</h1>
      <p>Vue3 新增的内置组件，用于处理 DOM 传送和异步组件加载。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>Teleport 传送门</h2>
      <p>将组件的 DOM 内容渲染到指定位置，常用于模态框、通知等。</p>
      <CodeBlock :files="teleportExample" language="vue" />
    </section>
    
    <section class="knowledge-page__section">
      <h2>Suspense 异步组件</h2>
      <p>协调异步依赖的加载状态，提供 loading 和 error 状态处理。</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const teleportExample = ref([
  {
    name: 'Teleport 示例',
    code: `<template>
  <button @click="showModal = true">打开模态框</button>
  
  <!-- Teleport 将内容传送到 body 末尾 -->
  <Teleport to="body">
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>模态框标题</h2>
        <button @click="showModal = false">关闭</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
const showModal = ref(false)
<\/script>`
  }
])
</script>