<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>渲染函数</h1>
      <p>使用 JavaScript 完全编程式地创建组件视图。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>h 函数</h2>
      <p>h 函数用于创建虚拟节点 (VNode)。</p>
      <CodeBlock :files="hExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const hExample = ref([
  {
    name: 'h 函数示例',
    code: `import { h } from 'vue'

// h(tag, props, children)
const vnode = h('div', { class: 'container' }, [
  h('h1', null, '标题'),
  h('p', null, '内容')
])

// 使用渲染函数的组件
export default {
  render() {
    return h('div', { class: 'app' }, [
      h('header', null, this.$slots.header?.()),
      h('main', null, this.$slots.default?.()),
      h('footer', null, this.$slots.footer?.())
    ])
  }
}`
  }
])
</script>