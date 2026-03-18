<template>
  <div :class="['practice-card', type]">
    <div class="practice-card__header">
      <el-icon :size="20">
        <SuccessFilled v-if="type === 'success'" />
        <WarningFilled v-if="type === 'warning'" />
        <InfoFilled v-if="type === 'info'" />
      </el-icon>
      <span>{{ title }}</span>
    </div>
    <div class="practice-card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  type?: 'success' | 'warning' | 'info'
}>(), {
  type: 'success'
})
</script>

<style lang="scss" scoped>
.practice-card {
  border-radius: 8px;
  padding: 20px;
  margin: 16px 0;
  border-left: 4px solid;
  
  &.success {
    background: linear-gradient(135deg, #f0f9eb 0%, #fff 100%);
    border-left-color: #67c23a;
    
    .practice-card__header {
      color: #67c23a;
    }
  }
  
  &.warning {
    background: linear-gradient(135deg, #fdf6ec 0%, #fff 100%);
    border-left-color: #e6a23c;
    
    .practice-card__header {
      color: #e6a23c;
    }
  }
  
  &.info {
    background: linear-gradient(135deg, #f4f4f5 0%, #fff 100%);
    border-left-color: #909399;
    
    .practice-card__header {
      color: #909399;
    }
  }
  
  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 12px;
  }
  
  &__content {
    color: #606266;
    line-height: 1.8;
    
    :deep(ul) {
      margin: 8px 0;
      padding-left: 20px;
      
      li {
        margin: 6px 0;
      }
    }
    
    :deep(code) {
      background: rgba(0, 0, 0, 0.05);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 13px;
    }
  }
}
</style>