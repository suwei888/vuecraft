<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>工程化篇</h1>
      <p>现代前端工程化实践：项目配置、模块化、包管理、CI/CD 等。</p>
    </header>
    
    <div class="chapter-cards">
      <div class="engineering-grid">
        <el-card 
          v-for="(item, index) in chapters" 
          :key="item.path"
          class="engineering-card"
          @click="$router.push(item.path)"
        >
          <div class="card-left">
            <div class="step-number">{{ index + 1 }}</div>
          </div>
          <div class="card-right">
            <div class="card-header">
              <el-icon class="card-icon" :style="{ color: iconColors[index] }">
                <component :is="item.icon" />
              </el-icon>
              <h3>{{ item.title }}</h3>
            </div>
            <p>{{ item.desc }}</p>
            <div class="card-tags">
              <el-tag v-for="tag in item.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
            </div>
          </div>
          <div class="card-arrow">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const iconColors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']

const chapters = ref([
  { 
    title: '项目配置', 
    desc: 'Vite、TypeScript、ESLint、Prettier 配置详解', 
    icon: 'Tools',
    path: '/engineering/project-config',
    tags: ['Vite', 'TypeScript', 'ESLint']
  },
  { 
    title: '模块化系统', 
    desc: 'ES Module、CommonJS、动态导入原理', 
    icon: 'Menu',
    path: '/engineering/module-system',
    tags: ['ESM', 'CJS', '动态导入']
  },
  { 
    title: '包管理', 
    desc: 'npm、pnpm、yarn、Monorepo 架构', 
    icon: 'Box',
    path: '/engineering/package-manager',
    tags: ['npm', 'pnpm', 'Monorepo']
  },
  { 
    title: 'CI/CD', 
    desc: 'Git Hooks、Husky、GitHub Actions、Docker', 
    icon: 'Promotion',
    path: '/engineering/cicd',
    tags: ['Git Hooks', 'Actions', 'Docker']
  }
])
</script>

<style lang="scss" scoped>
.chapter-cards {
  margin-top: 24px;
}

.engineering-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.engineering-card {
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  
  &:hover {
    transform: translateX(8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    
    .card-left {
      .step-number {
        transform: scale(1.1);
      }
    }
    
    .card-arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .card-left {
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: linear-gradient(180deg, #f5f7fa 0%, #fff 100%);
    
    .step-number {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
      transition: transform 0.3s;
    }
  }
  
  .card-right {
    flex: 1;
    padding: 20px;
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
      
      .card-icon {
        font-size: 24px;
      }
      
      h3 {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }
    }
    
    p {
      color: #909399;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    
    .card-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  }
  
  .card-arrow {
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: #c0c4cc;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s;
  }
}
</style>