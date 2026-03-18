<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>组合式 API</h1>
      <p>Vue3 引入的组合式 API 提供了更灵活的代码组织方式，使逻辑复用更加简单。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>setup 函数</h2>
      <p>setup 是组合式 API 的入口点，在组件创建之前执行。</p>
      
      <BestPractice title="setup 使用要点" type="success">
        <ul>
          <li>setup 在 beforeCreate 之前执行，此时组件实例尚未创建</li>
          <li>setup 中不能使用 this，因为它不会指向组件实例</li>
          <li>setup 可以返回一个对象，其中的属性可在模板中使用</li>
          <li>setup 也可以返回一个渲染函数</li>
        </ul>
      </BestPractice>
    </section>
  </div>
</template>

<script setup lang="ts">
import BestPractice from '@/components/common/BestPractice.vue'
</script>