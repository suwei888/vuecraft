<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>安全篇</h1>
      <p>前端安全实践：XSS 防护、CSRF 防御、加密算法、数据保护等。</p>
    </header>
    
    <div class="chapter-cards">
      <div class="security-grid">
        <el-card 
          v-for="(item, index) in chapters" 
          :key="item.path"
          class="security-card"
          :class="`security-card--level-${index}`"
          @click="$router.push(item.path)"
        >
          <div class="card-badge">
            <el-icon><component :is="item.icon" /></el-icon>
          </div>
          <div class="card-body">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="card-indicators">
              <div class="indicator" v-for="ind in item.indicators" :key="ind">
                <span class="indicator-dot"></span>
                <span class="indicator-text">{{ ind }}</span>
              </div>
            </div>
          </div>
          <div class="card-action">
            <span>了解详情</span>
            <el-icon><ArrowRight /></el-icon>
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
    title: 'XSS 防护', 
    desc: '跨站脚本攻击原理与防御策略，保护应用免受注入攻击', 
    icon: 'Warning',
    path: '/security/xss',
    indicators: ['输入过滤', 'CSP策略', '输出编码']
  },
  { 
    title: 'CSRF 防御', 
    desc: '跨站请求伪造攻击与防御，确保请求来源可信', 
    icon: 'Shield',
    path: '/security/csrf',
    indicators: ['Token验证', 'SameSite', 'Referer检查']
  },
  { 
    title: '加密算法', 
    desc: '对称加密、非对称加密、哈希算法、JWT 认证', 
    icon: 'Key',
    path: '/security/encryption',
    indicators: ['AES', 'RSA', 'JWT']
  },
  { 
    title: '数据保护', 
    desc: '数据脱敏、存储安全、隐私保护最佳实践', 
    icon: 'User',
    path: '/security/data-protection',
    indicators: ['脱敏处理', '安全存储', '隐私合规']
  }
])
</script>

<style lang="scss" scoped>
.chapter-cards {
  margin-top: 24px;
}

.security-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.security-card {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid #e4e7ed;
  
  &--level-0 {
    .card-badge { background: linear-gradient(135deg, #f56c6c 0%, #f78989 100%); }
    .indicator-dot { background: #f56c6c; }
  }
  
  &--level-1 {
    .card-badge { background: linear-gradient(135deg, #e6a23c 0%, #ebb563 100%); }
    .indicator-dot { background: #e6a23c; }
  }
  
  &--level-2 {
    .card-badge { background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%); }
    .indicator-dot { background: #409eff; }
  }
  
  &--level-3 {
    .card-badge { background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%); }
    .indicator-dot { background: #67c23a; }
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    
    .card-badge {
      transform: rotate(10deg) scale(1.05);
    }
    
    .card-action {
      background: #409eff;
      color: #fff;
    }
  }
  
  .card-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    transition: transform 0.3s;
  }
  
  .card-body {
    padding: 24px;
    padding-right: 80px;
    
    h3 {
      font-size: 18px;
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
    
    .card-indicators {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      
      .indicator {
        display: flex;
        align-items: center;
        gap: 6px;
        
        &-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        
        &-text {
          font-size: 13px;
          color: #606266;
        }
      }
    }
  }
  
  .card-action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 12px 24px;
    background: #f5f7fa;
    border-top: 1px solid #e4e7ed;
    font-size: 14px;
    color: #606266;
    transition: all 0.3s;
    
    .el-icon {
      transition: transform 0.3s;
    }
  }
  
  &:hover .card-action .el-icon {
    transform: translateX(4px);
  }
}
</style>