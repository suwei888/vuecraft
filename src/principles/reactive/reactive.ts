/**
 * reactive 原理实现
 * 
 * 核心原理：
 * 1. 使用 Proxy 拦截对象的读写操作
 * 2. 读取时收集依赖 (track)
 * 3. 写入时触发更新 (trigger)
 * 
 * Proxy vs Object.defineProperty:
 * - Proxy 可以拦截新增属性
 * - Proxy 可以拦截数组索引变化
 * - Proxy 可以拦截删除操作
 * - Proxy 性能更好（惰性响应式）
 */

import { track, trigger } from './effect'

// 存储原始对象和代理对象的映射
const reactiveMap = new WeakMap<object, any>()

// 响应式标志
export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  RAW = '__v_raw'
}

/**
 * 判断是否是响应式对象
 */
export function isReactive(value: unknown): boolean {
  return !!(value && (value as any)[ReactiveFlags.IS_REACTIVE])
}

/**
 * 将对象转换为响应式代理
 * 
 * @example
 * ```ts
 * const state = reactive({ count: 0 })
 * state.count++ // 自动触发更新
 * ```
 */
export function reactive<T extends object>(target: T): T {
  // 如果已经是响应式的，直接返回
  if (isReactive(target)) {
    return target
  }
  
  // 如果已经代理过，返回缓存的代理
  const existingProxy = reactiveMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  
  const proxy = new Proxy(target, {
    // 拦截读取操作
    get(target, key, receiver) {
      // 响应式标志
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true
      }
      if (key === ReactiveFlags.RAW) {
        return target
      }
      
      // 收集依赖
      track(target, key)
      
      // 获取值
      const result = Reflect.get(target, key, receiver)
      
      // 如果是对象，递归代理（惰性响应式）
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      
      return result
    },
    
    // 拦截写入操作
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      
      // 设置新值
      const result = Reflect.set(target, key, value, receiver)
      
      // 只有值真正变化时才触发更新
      if (oldValue !== value) {
        trigger(target, key)
      }
      
      return result
    },
    
    // 拦截删除操作
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      if (result) {
        trigger(target, key)
      }
      return result
    },
    
    // 拦截 in 操作符
    has(target, key) {
      track(target, key)
      return Reflect.has(target, key)
    },
    
    // 拦截 Object.keys
    ownKeys(target) {
      track(target, Symbol('iterate'))
      return Reflect.ownKeys(target)
    }
  })
  
  // 缓存代理
  reactiveMap.set(target, proxy)
  
  return proxy
}

/**
 * 解除响应式，获取原始对象
 */
export function toRaw<T>(observed: T): T {
  const raw = observed && (observed as any)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}

/**
 * 标记对象为不可响应式
 */
export function markRaw<T extends object>(value: T): T {
  Object.defineProperty(value, ReactiveFlags.IS_REACTIVE, {
    value: false,
    enumerable: false
  })
  return value
}