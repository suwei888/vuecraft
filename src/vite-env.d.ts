/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 扩展 Window 接口
interface Window {
  // 用于代码执行器
  __codeExecutor__?: {
    log: (...args: any[]) => void
    error: (...args: any[]) => void
  }
}