<template>
  <el-dropdown @command="handleLanguageChange" trigger="click">
    <el-button class="lang-btn" text>
      <el-icon><Globe /></el-icon>
      <span class="lang-text">{{ currentLangLabel }}</span>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item 
          v-for="lang in languages" 
          :key="lang.value" 
          :command="lang.value"
          :class="{ active: currentLanguage === lang.value }"
        >
          {{ lang.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLanguage, getCurrentLanguage } from '@/locales'

const { locale } = useI18n()

const languages = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]

const currentLanguage = computed(() => getCurrentLanguage())

const currentLangLabel = computed(() => {
  const lang = languages.find(l => l.value === currentLanguage.value)
  return lang?.label || '中文'
})

const handleLanguageChange = (lang: string) => {
  setLanguage(lang)
  locale.value = lang as any
}
</script>

<style lang="scss" scoped>
.lang-btn {
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: white;
  }
  
  .lang-text {
    font-size: 0.9rem;
  }
}

:deep(.el-dropdown-menu__item) {
  &.active {
    color: #2563eb;
    font-weight: 600;
  }
}
</style>
