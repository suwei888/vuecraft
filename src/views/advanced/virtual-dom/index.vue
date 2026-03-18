<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>虚拟 DOM</h1>
      <p>虚拟 DOM 是 Vue 渲染系统的基础，通过 JavaScript 对象描述真实 DOM 结构。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>为什么需要虚拟 DOM？</h2>
      <div class="reasons">
        <el-card v-for="reason in reasons" :key="reason.title" class="reason-card">
          <h4>{{ reason.title }}</h4>
          <p>{{ reason.desc }}</p>
        </el-card>
      </div>
    </section>
    
    <section class="knowledge-page__section">
      <h2>VNode 结构</h2>
      <CodeBlock :files="vnodeExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const reasons = ref([
  { title: '跨平台', desc: '虚拟 DOM 可以渲染到不同平台：浏览器、原生应用、Canvas 等' },
  { title: '批量更新', desc: '多次修改可以合并为一次 DOM 更新，减少重排重绘' },
  { title: 'Diff 算法', desc: '通过比较新旧 VNode，最小化 DOM 操作' }
])

const vnodeExample = ref([
  {
    name: 'VNode 结构',
    code: `interface VNode {
  type: string | Component  // 元素标签或组件
  props: object | null      // 属性
  children: VNodeChildren   // 子节点
  key: string | number      // 用于 diff
  el: Element | null        // 对应的真实 DOM
}

// 示例
const vnode = {
  type: 'div',
  props: { class: 'container', id: 'app' },
  children: [
    { type: 'h1', props: null, children: '标题' },
    { type: 'p', props: null, children: '内容' }
  ],
  key: null,
  el: null
}`
  }
])
</script>

<style lang="scss" scoped>
.reasons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.reason-card {
  h4 {
    margin-bottom: 8px;
    color: #409eff;
  }
  
  p {
    color: #606266;
    font-size: 14px;
  }
}
</style>