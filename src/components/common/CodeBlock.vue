<template>
  <div class="code-block">
    <div class="code-block__header">
      <div class="code-block__tabs">
        <button
          v-for="(file, index) in files"
          :key="index"
          :class="['code-block__tab', { active: activeIndex === index }]"
          @click="activeIndex = index"
        >
          {{ file.name }}
        </button>
      </div>
      <div class="code-block__actions">
        <el-button text size="small" @click="copyCode">
          <el-icon><CopyDocument /></el-icon>
          复制
        </el-button>
      </div>
    </div>
    <div class="code-block__content">
      <pre><code :class="`language-${language}`" v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Prism from 'prismjs'

// 导入需要的语言支持
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'

interface CodeFile {
  name: string
  code: string
}

const props = withDefaults(defineProps<{
  files: CodeFile[]
  language?: string
}>(), {
  language: 'typescript'
})

const activeIndex = ref(0)
const highlightedCode = computed(() => {
  const code = props.files[activeIndex.value]?.code || ''
  const lang = props.language
  return Prism.highlight(code, Prism.languages[lang] || Prism.languages.typescript, lang)
})

async function copyCode() {
  const code = props.files[activeIndex.value]?.code || ''
  try {
    await navigator.clipboard.writeText(code)
    ElMessage.success('代码已复制到剪贴板')
  } catch {
    ElMessage.error('复制失败')
  }
}

onMounted(() => {
  // 确保 Prism 已加载
})
</script>

<style lang="scss" scoped>
.code-block {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e4e7ed;
  margin: 16px 0;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fafafa;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 16px;
  }
  
  &__tabs {
    display: flex;
    gap: 0;
  }
  
  &__tab {
    padding: 12px 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    color: #606266;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    
    &:hover {
      color: #409eff;
    }
    
    &.active {
      color: #409eff;
      border-bottom-color: #409eff;
      font-weight: 500;
    }
  }
  
  &__content {
    background: #2d2d2d;
    overflow-x: auto;
    
    pre {
      margin: 0;
      padding: 16px;
      font-size: 13px;
      line-height: 1.6;
    }
    
    code {
      font-family: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    }
  }
}
</style>