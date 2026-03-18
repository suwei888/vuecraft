<template>
  <el-menu
    :default-active="currentPath"
    :collapse="collapsed"
    :unique-opened="false"
    background-color="transparent"
    text-color="#bfcbd9"
    active-text-color="#409eff"
    router
    class="side-menu"
  >
    <template v-for="item in menuItems" :key="item.path">
      <!-- 没有子菜单 -->
      <el-menu-item v-if="!item.children" :index="item.path">
        <el-icon><component :is="item.icon" /></el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
      
      <!-- 有子菜单 -->
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
        >
          <el-icon><component :is="child.icon" /></el-icon>
          <template #title>{{ child.title }}</template>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigationStore, type MenuItem } from '@/stores/navigation'

defineProps<{
  collapsed: boolean
}>()

const route = useRoute()
const navigationStore = useNavigationStore()

const currentPath = computed(() => route.path)
const menuItems = computed(() => navigationStore.menuItems)
</script>

<style lang="scss" scoped>
.side-menu {
  border-right: none;
  
  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: 48px;
    line-height: 48px;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.05) !important;
    }
  }
  
  :deep(.el-menu-item.is-active) {
    background-color: rgba(64, 158, 255, 0.1) !important;
    border-right: 3px solid #409eff;
  }
  
  :deep(.el-sub-menu .el-menu-item) {
    min-width: auto;
    padding-left: 52px !important;
  }
}
</style>