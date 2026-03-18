<template>
  <el-container class="app-layout">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapsed ? '64px' : '260px'" class="app-aside">
      <div class="logo">
        <el-icon :size="28"><TrendCharts /></el-icon>
        <span v-show="!isCollapsed" class="logo-text">Vue3+TS学习</span>
      </div>
      <SideMenu :collapsed="isCollapsed" />
    </el-aside>
    
    <!-- 主内容区 -->
    <el-container class="main-container">
      <!-- 顶部栏 -->
      <el-header class="app-header">
        <div class="header-left">
          <el-icon 
            class="collapse-btn" 
            @click="isCollapsed = !isCollapsed"
          >
            <Fold v-if="!isCollapsed" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-input
            v-model="searchQuery"
            placeholder="搜索知识点..."
            prefix-icon="Search"
            clearable
            style="width: 200px"
          />
          <el-tooltip content="GitHub" placement="bottom">
            <a href="https://github.com/suwei888/vuecraft" target="_blank" class="github-link">
              <el-icon class="header-icon"><Link /></el-icon>
            </a>
          </el-tooltip>
        </div>
      </el-header>
      
      <!-- 内容 -->
      <el-main class="app-main">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import SideMenu from './SideMenu.vue'

const route = useRoute()
const isCollapsed = ref(false)
const searchQuery = ref('')

const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta.title)
  return matched.map(item => ({
    path: item.path,
    title: item.meta.title as string
  }))
})

// 监听路由变化，更新面包屑
watch(() => route.path, () => {
  // 路由变化时可以做一些处理
}, { immediate: true })
</script>

<style lang="scss" scoped>
.app-layout {
  height: 100vh;
  overflow: hidden;
}

.app-aside {
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  transition: width 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  .logo {
    height: 60px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    .el-icon {
      color: #409eff;
    }
    
    .logo-text {
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
    }
  }
  
  :deep(.el-menu) {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }
}

.main-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .collapse-btn {
      font-size: 20px;
      cursor: pointer;
      color: #606266;
      transition: color 0.3s;
      
      &:hover {
        color: #409eff;
      }
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .github-link {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    
    .header-icon {
      font-size: 20px;
      cursor: pointer;
      color: #606266;
      transition: color 0.3s;
      
      &:hover {
        color: #409eff;
      }
    }
  }
}

.app-main {
  background: #f5f7fa;
  overflow-y: auto;
  padding: 24px;
}
</style>