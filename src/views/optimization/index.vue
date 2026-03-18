<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>优化篇</h1>
      <p>前端性能优化：Tree Shaking、代码分割、压缩策略、缓存优化等。</p>
    </header>
    
    <div class="chapter-cards">
      <div class="optimization-list">
        <el-card 
          v-for="(item, index) in chapters" 
          :key="item.path"
          class="optimization-card"
          @click="$router.push(item.path)"
        >
          <div class="card-main">
            <div class="card-visual">
              <div class="visual-bar" :style="{ width: item.progress + '%' }"></div>
              <span class="visual-num">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <div class="card-info">
              <div class="info-header">
                <el-icon class="info-icon" :style="{ color: progressColors[index] }">
                  <component :is="item.icon" />
                </el-icon>
                <h3>{{ item.title }}</h3>
              </div>
              <p>{{ item.desc }}</p>
              <div class="info-tags">
                <span v-for="tag in item.tags" :key="tag" class="info-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
          <div class="card-progress">
            <div class="progress-label">
              <span>性能提升</span>
              <span class="progress-value">{{ item.progress }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: item.progress + '%', background: progressColors[index] }"></div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progressColors = ['#67c23a', '#409eff', '#e6a23c', '#f56c6c']

const chapters = ref([
  { 
    title: '打包优化', 
    desc: 'Tree Shaking、代码分割、包分析', 
    icon: 'Files',
    path: '/optimization/bundle',
    tags: ['Tree Shaking', 'Code Splitting', 'Bundle'],
    progress: 85
  },
  { 
    title: '压缩策略', 
    desc: 'JS/CSS压缩、图片优化、Gzip/Brotli', 
    icon: 'Compress',
    path: '/optimization/compress',
    tags: ['Minify', 'Image', 'Gzip'],
    progress: 70
  },
  { 
    title: '加载优化', 
    desc: '懒加载、预加载、骨架屏', 
    icon: 'Loading',
    path: '/optimization/loading',
    tags: ['Lazy Load', 'Preload', 'Skeleton'],
    progress: 60
  },
  { 
    title: '缓存策略', 
    desc: '浏览器缓存、Service Worker、HTTP缓存', 
    icon: 'Clock',
    path: '/optimization/cache',
    tags: ['Browser Cache', 'Service Worker', 'HTTP'],
    progress: 75
  }
])
</script>

<style lang="scss" scoped>
.chapter-cards {
  margin-top: 24px;
}

.optimization-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.optimization-card {
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.01);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  
  .card-main {
    display: flex;
    gap: 24px;
    padding: 20px;
  }
  
  .card-visual {
    position: relative;
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 8px;
    
    .visual-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(180deg, rgba(103, 194, 58, 0.1) 0%, rgba(103, 194, 58, 0.3) 100%);
    }
    
    .visual-num {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 20px;
      font-weight: 700;
      color: #303133;
      font-family: 'SF Mono', Monaco, monospace;
      z-index: 1;
    }
  }
  
  .card-info {
    flex: 1;
    
    .info-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
      
      .info-icon {
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
    
    .info-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      
      .info-tag {
        background: #f5f7fa;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        color: #606266;
      }
    }
  }
  
  .card-progress {
    padding: 12px 20px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
    
    .progress-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 13px;
      color: #909399;
      
      .progress-value {
        font-weight: 600;
        color: #606266;
      }
    }
    
    .progress-bar {
      height: 6px;
      background: #e4e7ed;
      border-radius: 3px;
      overflow: hidden;
      
      .progress-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.5s ease;
      }
    }
  }
}

</style>