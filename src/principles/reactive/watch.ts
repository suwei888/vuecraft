/**
 * watch 原理实现
 * 
 * 核心原理：
 * 1. 使用 effect 收集依赖
 * 2. 通过 scheduler 实现异步调度
 * 3. 支持多种数据源：ref、reactive、getter 函数
 * 
 * watch vs watchEffect:
 * - watch: 显式指定数据源，获取新旧值
 * - watchEffect: 自动收集依赖，立即执行
 */

import { ReactiveEffect } from './effect'

// 清理函数类型
type CleanupFn = () => void
// 监听回调类型
type WatchCallback<T> = (
  newValue: T,
  oldValue: T | undefined,
  onCleanup: (fn: CleanupFn) => void
) => void

// 监听源类型
type WatchSource<T> = { value: T } | (() => T) | object

/**
 * watch 选项
 */
export interface WatchOptions {
  immediate?: boolean
  deep?: boolean
  flush?: 'pre' | 'post' | 'sync'
}

/**
 * 判断是否是 ref 类型
 */
function isRef(value: unknown): value is { value: any } {
  return value !== null && typeof value === 'object' && '__v_isRef' in value
}

/**
 * 判断是否是 reactive 类型
 */
function isReactive(value: unknown): value is object {
  return value !== null && typeof value === 'object' && '__v_isReactive' in value
}

/**
 * 简化版 watch 实现
 */
export function watch<T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options: WatchOptions = {}
): () => void {
  // 获取 getter 函数
  let getter: () => T
  
  if (isRef(source)) {
    getter = () => source.value
  } else if (isReactive(source)) {
    getter = () => source as T
    options.deep = true
  } else if (typeof source === 'function') {
    getter = source as () => T
  } else {
    getter = () => source as T
    options.deep = true
  }
  
  let oldValue: T | undefined
  let newValue: T
  
  // 清理函数
  let cleanup: CleanupFn | null = null
  const onCleanup = (fn: CleanupFn) => {
    cleanup = fn
  }
  
  const executeCleanup = () => {
    if (cleanup) {
      cleanup()
      cleanup = null
    }
  }
  
  let isFirstRun = true
  
  const job = () => {
    newValue = getter()
    executeCleanup()
    callback(newValue, isFirstRun ? undefined : oldValue, onCleanup)
    oldValue = newValue
    isFirstRun = false
  }
  
  const scheduler = options.flush === 'sync' ? job : () => Promise.resolve().then(job)
  
  const _effect = new ReactiveEffect(getter, { scheduler })
  
  if (options.immediate) {
    job()
  } else {
    oldValue = _effect.run()
  }
  
  return () => {
    _effect.stop?.()
    executeCleanup()
  }
}

/**
 * watchEffect 实现
 */
export function watchEffect(
  effectFn: (onCleanup: (fn: CleanupFn) => void) => void,
  options: Omit<WatchOptions, 'immediate' | 'deep'> = {}
): () => void {
  let cleanup: CleanupFn | null = null
  const onCleanup = (fn: CleanupFn) => {
    cleanup = fn
  }
  
  const executeCleanup = () => {
    if (cleanup) {
      cleanup()
      cleanup = null
    }
  }
  
  const scheduler = options.flush === 'sync' 
    ? run 
    : () => Promise.resolve().then(run)
  
  const run = () => {
    executeCleanup()
    _effect.run()
  }
  
  const _effect = new ReactiveEffect(
    () => effectFn(onCleanup),
    { scheduler }
  )
  
  _effect.run()
  
  return () => {
    _effect.stop?.()
    executeCleanup()
  }
}