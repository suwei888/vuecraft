<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>生态篇</h1>
      <p>Vue3 官方生态系统：Vue Router、Pinia 状态管理、Vite 构建工具。</p>
    </header>
    
    <div class="chapter-cards">
      <div class="card-grid">
        <el-card 
          v-for="(item, index) in chapters" 
          :key="item.path"
          class="chapter-card ecosystem-card"
          :class="`ecosystem-card--${index}`"
          @click="$router.push(item.path)"
        >
          <div class="card-decoration"></div>
          <div class="card-content">
            <div class="card-icon">
              <el-icon :size="36"><component :is="item.icon" /></el-icon>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="card-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <div class="card-footer">
            <span class="arrow-text">探索生态</span>
            <el-icon class="arrow-icon"><ArrowRight /></el-icon>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const chapters = ref([
  { 
    title: 'Vue Router', 
    desc: '官方路由管理器，构建单页应用的核心导航解决方案', 
    icon: 'Guide',
    path: '/ecosystem/vue-router',
    tags: ['路由', '导航守卫', '懒加载']
  },
  { 
    title: 'Pinia', 
    desc: 'Vue 官方状态管理库，简洁直观的类型安全存储', 
    icon: 'DataBoard',
    path: '/ecosystem/pinia',
    tags: ['状态管理', 'Store', 'Composition']
  },
  { 
    title: 'Vite', 
    desc: '下一代前端构建工具，提供极速的开发体验', 
    icon: 'Lightning',
    path: '/ecosystem/vite',
    tags: ['构建工具', 'ESM', 'HMR']
  }
])
</script>

<style lang="scss" scoped>
.chapter-cards {
  margin-top: 24px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.ecosystem-card {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: none;
  
  &--0 {
    .card-decoration { background: linear-gradient(135deg, #42b883 0%, #35495e 100%); }
    .card-icon { color: #42b883; }
  }
  
  &--1 {
    .card-decoration { background: linear-gradient(135deg, #ffd859 0%, #f7b731 100%); }
    .card-icon { color: #f7b731; }
  }
  
  &--2 {
    .card-decoration { background: linear-gradient(135deg, #646cff 0%, #747bff 100%); }
    .card-icon { color: #646cff; }
  }
  
  .card-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    .card-icon {
      transform: scale(1.1);
    }
    
    .card-footer {
      padding-left: 24px;
      
      .arrow-icon {
        transform: translateX(4px);
      }
    }
  }
  
  .card-content {
    padding: 20px 20px 16px;
    text-align: center;
  }
  
  .card-icon {
    margin-bottom: 16px;
    transition: transform 0.3s;
  }
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #303133;
  }
  
  p {
    color: #909399;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 16px;
  }
  
  .card-tags {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    
    .tag {
      background: #f5f7fa;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      color: #606266;
    }
  }
  
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 20px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
    transition: padding 0.3s;
    
    .arrow-text {
      font-size: 14px;
      color: #606266;
    }
    
    .arrow-icon {
      color: #909399;
      transition: transform 0.3s;
    }
  }
}
</style>