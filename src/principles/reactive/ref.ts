/**
 * ref 原理实现
 * 
 * 为什么需要 ref？
 * 1. reactive 只能用于对象类型
 * 2. ref 可以包装任意类型，包括基本类型
 * 
 * 原理：
 * 1. ref 创建一个包含 .value 属性的对象
 * 2. 对 .value 的读写进行拦截
 * 3. 收集依赖和触发更新
 * 
 * ref vs reactive:
 * - ref: 可以包装基本类型，访问需要 .value
 * - reactive: 只能用于对象，直接访问属性
 */

import { trackEffects, triggerEffects } from './effect'
import type { Dep } from './effect'

// ref 标志
export const enum RefFlags {
  IS_REF = '__v_isRef'
}

/**
 * ref 类型
 */
export interface Ref<T = any> {
  value: T
  [RefFlags.IS_REF]: boolean
}

/**
 * Ref 类 - 包装基本类型
 */
class RefImpl<T> {
  private _value: T
  private _rawValue: T
  dep?: Dep
  
  [RefFlags.IS_REF] = true
  
  constructor(value: T) {
    this._rawValue = value
    this._value = convert(value)
  }
  
  get value() {
    trackRefValue(this)
    return this._value
  }
  
  set value(newValue: T) {
    if (newValue !== this._rawValue) {
      this._rawValue = newValue
      this._value = convert(newValue)
      triggerRefValue(this)
    }
  }
}

/**
 * 将值转换为响应式（如果是对象）
 */
function convert<T>(value: T): T {
  return isObject(value) ? reactive(value as object) as T : value
}

/**
 * 判断是否是对象
 */
function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}

/**
 * 收集 ref 依赖
 */
function trackRefValue(ref: { dep?: Dep }) {
  if (!ref.dep) {
    ref.dep = new Set()
  }
  trackEffects(ref.dep)
}

/**
 * 触发 ref 更新
 */
function triggerRefValue(ref: { dep?: Dep }) {
  if (ref.dep) {
    triggerEffects(ref.dep)
  }
}

/**
 * 创建 ref
 * 
 * @example
 * ```ts
 * const count = ref(0)
 * console.log(count.value) // 0
 * count.value++
 * console.log(count.value) // 1
 * ```
 */
export function ref<T>(value: T): Ref<T> {
  return new RefImpl<T>(value) as any
}

/**
 * 判断是否是 ref
 */
export function isRef(value: unknown): value is Ref {
  return !!(value && (value as any)[RefFlags.IS_REF])
}

/**
 * 解包 ref
 * 如果是 ref 返回 .value，否则返回原值
 */
export function unref<T>(ref: T | Ref<T>): T {
  return isRef(ref) ? ref.value : ref
}

/**
 * 创建浅层 ref（不转换内部对象为响应式）
 */
class ShallowRefImpl<T> {
  private _value: T
  dep?: Dep
  [RefFlags.IS_REF] = true
  
  constructor(value: T) {
    this._value = value
  }
  
  get value() {
    trackRefValue(this)
    return this._value
  }
  
  set value(newValue: T) {
    if (newValue !== this._value) {
      this._value = newValue
      triggerRefValue(this)
    }
  }
}

export function shallowRef<T>(value: T): Ref<T> {
  return new ShallowRefImpl(value) as any
}

/**
 * 强制触发 ref 更新
 */
export function triggerRef(ref: Ref) {
  if ((ref as any).dep) {
    triggerEffects((ref as any).dep)
  }
}

/**
 * 将 ref 的属性代理到对象上
 */
export function proxyRefs<T extends object>(objectWithRefs: T): T {
  return new Proxy(objectWithRefs, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      return unref(value)
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value
        return true
      }
      return Reflect.set(target, key, value, receiver)
    }
  })
}

// 延迟导入 reactive 避免循环依赖
import { reactive } from './reactive'