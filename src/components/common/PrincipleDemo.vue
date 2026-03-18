<template>
  <div class="principle-demo">
    <div class="principle-demo__title">
      <el-icon><Cpu /></el-icon>
      <span>{{ title }}</span>
    </div>
    
    <!-- 流程图 -->
    <div v-if="flowchart" class="principle-demo__flow">
      <div class="flow-step" v-for="(step, index) in steps" :key="index">
        <div class="flow-step__number">{{ index + 1 }}</div>
        <div class="flow-step__content">
          <div class="flow-step__title">{{ step.title }}</div>
          <div class="flow-step__desc">{{ step.description }}</div>
        </div>
        <el-icon v-if="index < steps.length - 1" class="flow-step__arrow">
          <ArrowDown />
        </el-icon>
      </div>
    </div>
    
    <!-- 原理代码 -->
    <div class="principle-demo__code">
      <slot></slot>
    </div>
    
    <!-- 可视化演示 -->
    <div v-if="showVisual" class="principle-demo__visual">
      <div class="visual-title">可视化演示</div>
      <slot name="visual"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface FlowStep {
  title: string
  description: string
}

withDefaults(defineProps<{
  title: string
  flowchart?: boolean
  steps?: FlowStep[]
  showVisual?: boolean
}>(), {
  flowchart: true,
  showVisual: false,
  steps: () => []
})
</script>

<style lang="scss" scoped>
.principle-demo {
  background: linear-gradient(135deg, #f5f7fa 0%, #fff 100%);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  border: 1px solid #e4e7ed;
  
  &__title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 20px;
    
    .el-icon {
      color: #409eff;
      font-size: 24px;
    }
  }
  
  &__flow {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 24px;
  }
  
  &__code {
    margin-top: 16px;
  }
  
  &__visual {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid #e4e7ed;
    
    .visual-title {
      font-weight: 600;
      color: #303133;
      margin-bottom: 16px;
    }
  }
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  padding-bottom: 24px;
  
  &:last-child {
    padding-bottom: 0;
  }
  
  &__number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
  }
  
  &__content {
    flex: 1;
    background: #fff;
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
  
  &__title {
    font-weight: 600;
    color: #303133;
    margin-bottom: 4px;
  }
  
  &__desc {
    font-size: 13px;
    color: #606266;
    line-height: 1.6;
  }
  
  &__arrow {
    position: absolute;
    left: 15px;
    top: 40px;
    color: #c0c4cc;
    font-size: 16px;
  }
}
</style>