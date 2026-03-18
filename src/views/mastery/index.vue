<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>高级篇</h1>
      <p>深入 TypeScript、性能优化、设计模式、Vue3 源码架构。</p>
    </header>
    
    <div class="chapter-cards">
      <div class="mastery-grid">
        <el-card 
          v-for="(item, index) in chapters" 
          :key="item.path"
          class="mastery-card"
          :style="{ '--card-color': cardColors[index] }"
          @click="$router.push(item.path)"
        >
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="card-icon-wrapper">
              <el-icon :size="28"><component :is="item.icon" /></el-icon>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="card-skills">
              <div class="skill-item" v-for="skill in item.skills" :key="skill">
                <span class="skill-dot"></span>
                {{ skill }}
              </div>
            </div>
          </div>
          <div class="card-meta">
            <span class="meta-label">难度</span>
            <div class="meta-dots">
              <span v-for="n in 5" :key="n" class="dot" :class="{ active: n <= item.level }"></span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cardColors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']

const chapters = ref([
  { 
    title: 'TypeScript 进阶', 
    desc: '类型体操、泛型进阶、工具类型', 
    icon: 'Document',
    path: '/mastery/typescript',
    skills: ['类型推导', '泛型编程', '工具类型'],
    level: 4
  },
  { 
    title: '性能优化', 
    desc: '渲染优化、虚拟列表、首屏优化', 
    icon: 'Odometer',
    path: '/mastery/performance',
    skills: ['渲染优化', '虚拟列表', '性能监控'],
    level: 4
  },
  { 
    title: '设计模式', 
    desc: '高阶组件、无渲染组件、组合模式', 
    icon: 'Grid',
    path: '/mastery/design-patterns',
    skills: ['HOC', 'Renderless', 'Composable'],
    level: 3
  },
  { 
    title: '源码架构', 
    desc: '调度器、渲染器、响应式系统架构', 
    icon: 'DataAnalysis',
    path: '/mastery/source-architecture',
    skills: ['Scheduler', 'Renderer', 'Reactivity'],
    level: 5
  }
])
</script>

<style lang="scss" scoped>
.chapter-cards {
  margin-top: 24px;
}

.mastery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.mastery-card {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid #e4e7ed;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  
  --card-color: #409eff;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    border-color: var(--card-color);
    
    .card-glow {
      opacity: 1;
    }
    
    .card-icon-wrapper {
      background: var(--card-color);
      color: #fff;
    }
  }
  
  .card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, var(--card-color) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }
  
  .card-content {
    position: relative;
    padding: 24px;
    
    .card-icon-wrapper {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      background: rgba(64, 158, 255, 0.1);
      color: var(--card-color);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      transition: all 0.3s;
    }
    
    h3 {
      font-size: 20px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 8px;
    }
    
    p {
      color: #909399;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    
    .card-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      
      .skill-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #606266;
        
        .skill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--card-color);
        }
      }
    }
  }
  
  .card-meta {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
    
    .meta-label {
      font-size: 13px;
      color: #909399;
    }
    
    .meta-dots {
      display: flex;
      gap: 4px;
      
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #e4e7ed;
        transition: background 0.3s;
        
        &.active {
          background: var(--card-color);
        }
      }
    }
  }
}
</style>