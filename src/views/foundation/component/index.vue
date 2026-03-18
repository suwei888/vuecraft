<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>组件系统</h1>
      <p>Vue 组件是可复用的 Vue 实例，通过组件化开发构建复杂应用。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>组件通信方式</h2>
      <el-table :data="communicationMethods" border stripe>
        <el-table-column prop="method" label="方式" width="150" />
        <el-table-column prop="direction" label="通信方向" width="120" />
        <el-table-column prop="scenario" label="适用场景" />
        <el-table-column prop="example" label="示例" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const communicationMethods = ref([
  { method: 'Props', direction: '父→子', scenario: '父组件向子组件传递数据', example: 'props: { msg: String }' },
  { method: 'Emits', direction: '子→父', scenario: '子组件向父组件传递事件', example: 'emit("update", value)' },
  { method: 'Slots', direction: '父→子', scenario: '父组件向子组件传递模板内容', example: '<slot name="header" />' },
  { method: 'Provide/Inject', direction: '祖先→后代', scenario: '跨层级组件通信', example: 'provide("key", value)' },
  { method: 'v-model', direction: '双向', scenario: '表单组件双向绑定', example: 'v-model="value"' },
  { method: 'ref/expose', direction: '父→子', scenario: '父组件调用子组件方法', example: 'childRef.value.method()' }
])
</script>