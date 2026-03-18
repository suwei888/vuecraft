<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>编译器原理</h1>
      <p>Vue 编译器将模板转换为渲染函数的过程。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>编译流程</h2>
      <div class="compile-flow">
        <div class="flow-item" v-for="(step, i) in compileSteps" :key="i">
          <div class="flow-num">{{ i + 1 }}</div>
          <div class="flow-content">
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const compileSteps = ref([
  { title: 'Parse 解析', desc: '将模板字符串解析为 AST（抽象语法树）' },
  { title: 'Transform 转换', desc: '对 AST 进行转换和优化' },
  { title: 'Codegen 生成', desc: '将 AST 生成渲染函数代码' }
])
</script>

<style lang="scss" scoped>
.compile-flow {
  display: flex;
  gap: 24px;
}

.flow-item {
  flex: 1;
  display: flex;
  gap: 16px;
  background: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  
  .flow-num {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
  }
  
  h4 {
    margin-bottom: 4px;
  }
  
  p {
    color: #606266;
    font-size: 14px;
  }
}
</style>