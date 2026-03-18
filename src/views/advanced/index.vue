<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>进阶篇</h1>
      <p>深入 Vue3 内部原理，掌握 Teleport、Suspense、渲染函数、虚拟 DOM 和编译器原理。</p>
    </header>
    
    <div class="chapter-cards">
      <el-row :gutter="24">
        <el-col :span="12" v-for="(item, index) in chapters" :key="item.path">
          <el-card class="chapter-card" @click="$router.push(item.path)">
            <div class="chapter-card__header">
              <div class="chapter-icon" :style="{ background: gradientColors[index] }">
                <el-icon :size="32"><component :is="item.icon" /></el-icon>
              </div>
              <div class="chapter-num">{{ String(index + 1).padStart(2, '0') }}</div>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="chapter-topics">
              <el-tag v-for="topic in item.topics" :key="topic" size="small" type="info">{{ topic }}</el-tag>
            </div>
            <div class="chapter-footer">
              <span class="chapter-link">
                开始学习
                <el-icon><ArrowRight /></el-icon>
              </span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const gradientColors = [
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
]

const chapters = ref([
  { 
    title: 'Teleport/Suspense', 
    desc: '传送门组件和异步组件加载，处理特殊 DOM 结构', 
    icon: 'Position',
    path: '/advanced/teleport-suspense',
    topics: ['Teleport', 'Suspense', '异步组件']
  },
  { 
    title: '渲染函数', 
    desc: '使用 h 函数和 JSX 构建灵活的渲染逻辑', 
    icon: 'EditPen',
    path: '/advanced/render-function',
    topics: ['h函数', 'JSX', '渲染函数']
  },
  { 
    title: '虚拟DOM', 
    desc: '理解 VNode 结构和 Diff 算法的核心原理', 
    icon: 'Document',
    path: '/advanced/virtual-dom',
    topics: ['VNode', 'Diff算法', 'Patch']
  },
  { 
    title: '编译器原理', 
    desc: '从模板到渲染函数的完整编译流程', 
    icon: 'Cpu',
    path: '/advanced/compiler',
    topics: ['AST', 'Transform', 'Codegen']
  }
])
</script>

<style lang="scss" scoped>
.chapter-cards {
  margin-top: 24px;
}

.chapter-card {
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
  border: 1px solid #e4e7ed;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
    border-color: transparent;
    
    .chapter-footer {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: #fff;
    }
    
    .chapter-link {
      color: #fff;
    }
  }
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  
  .chapter-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  
  .chapter-num {
    font-size: 28px;
    font-weight: 700;
    color: #e4e7ed;
    font-family: 'SF Mono', Monaco, monospace;
  }
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #303133;
  }
  
  p {
    color: #909399;
    margin-bottom: 16px;
    line-height: 1.6;
    font-size: 14px;
  }
  
  .chapter-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .chapter-footer {
    padding: 12px 16px;
    margin: 0 -20px -20px;
    background: #f5f7fa;
    transition: all 0.3s;
  }
  
  .chapter-link {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #606266;
    transition: color 0.3s;
    
    .el-icon {
      transition: transform 0.3s;
    }
  }
  
  &:hover .chapter-link .el-icon {
    transform: translateX(4px);
  }
}
</style>