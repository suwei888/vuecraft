<template>
  <div class="rainbow-input-container">
    <!-- 流光边框 -->
    <div class="glow-border"></div>
    <!-- 输入框 -->
    <div class="input-wrapper">
      <el-input
        :type="type"
        :placeholder="placeholder"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        class="rainbow-input"
        :show-password="type === 'password'"
      >
        <template #prefix>
          <slot name="prefix">
            <el-icon v-if="prefixIcon"><component :is="prefixIcon" /></el-icon>
          </slot>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: string
  placeholder?: string
  modelValue?: string
  prefixIcon?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style lang="scss" scoped>
.rainbow-input-container {
  position: relative;
  width: 100%;
  border-radius: 14px;
  padding: 4px; // 边框宽度
  background: rgba(15, 15, 25, 0.95);
  overflow: hidden;

  // 流光边框
  .glow-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 14px;
    background: linear-gradient(
      90deg,
      rgba(37, 99, 235, 0.3),
      rgba(139, 92, 246, 0.5),
      rgba(37, 99, 235, 0.3)
    );
    background-size: 200% 100%;
    animation: border-flow 3s linear infinite;
    z-index: 0;
    opacity: 0.6;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 14px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      background-size: 200% 100%;
      animation: shine 3s linear infinite;
    }
  }

  // 输入框包装层
  .input-wrapper {
    position: relative;
    background: rgba(15, 15, 25, 0.98);
    border-radius: 10px;
    z-index: 1;
    overflow: hidden;
  }

  .rainbow-input {
    :deep(.el-input__wrapper) {
      background: transparent;
      border: none;
      border-radius: 10px;
      padding: 1rem 1.25rem;
      box-shadow: none;
      
      &.is-focus {
        box-shadow: none;
        background: transparent;
      }

      .el-input__inner {
        color: rgba(255, 255, 255, 0.95);
        font-size: 1rem;
        background: transparent;

        &::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      }

      .el-input__prefix {
        color: rgba(255, 255, 255, 0.5);
      }

      .el-input__suffix {
        color: rgba(255, 255, 255, 0.5);
        
        .el-input__password {
          color: rgba(255, 255, 255, 0.5);
          
          &:hover {
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
  }
}

@keyframes border-flow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

@keyframes shine {
  0% {
    background-position: -100% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .glow-border {
    animation: none;
    
    &::before {
      animation: none;
    }
  }
}
</style>
