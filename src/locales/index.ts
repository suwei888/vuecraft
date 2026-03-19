import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 获取浏览器语言
function getBrowserLanguage(): string {
  const lang = navigator.language || (navigator as any).userLanguage
  return lang.startsWith('zh') ? 'zh-CN' : 'en-US'
}

// 从 localStorage 获取保存的语言，否则使用浏览器语言或默认中文
const savedLang = localStorage.getItem('language')
const defaultLang = savedLang || 'zh-CN' // 默认中文

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: defaultLang,
  fallbackLocale: 'en-US',
  messages
})

export default i18n

// 导出切换语言的方法
export function setLanguage(lang: string): void {
  i18n.global.locale.value = lang as any
  localStorage.setItem('language', lang)
  document.querySelector('html')?.setAttribute('lang', lang)
}

// 导出获取当前语言的方法
export function getCurrentLanguage(): string {
  return i18n.global.locale.value
}
