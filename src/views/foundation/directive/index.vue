<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>指令系统</h1>
      <p>Vue 指令是带有 v- 前缀的特殊属性，用于在模板中添加特殊行为。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>内置指令</h2>
      <el-table :data="builtInDirectives" border stripe>
        <el-table-column prop="name" label="指令" width="120" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="example" label="示例" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const builtInDirectives = ref([
  { name: 'v-if', desc: '条件渲染，为 false 时元素不存在于 DOM', example: '<div v-if="show">显示</div>' },
  { name: 'v-else', desc: '与 v-if 配合使用', example: '<div v-else>隐藏</div>' },
  { name: 'v-show', desc: '条件显示，通过 CSS display 控制', example: '<div v-show="show">显示</div>' },
  { name: 'v-for', desc: '列表渲染', example: '<li v-for="item in list">{{ item }}</li>' },
  { name: 'v-model', desc: '双向数据绑定', example: '<input v-model="value" />' },
  { name: 'v-on', desc: '事件监听，简写 @', example: '<button @click="handle">点击</button>' },
  { name: 'v-bind', desc: '属性绑定，简写 :', example: '<img :src="url" />' },
  { name: 'v-slot', desc: '插槽，简写 #', example: '<template #default>' }
])
</script>