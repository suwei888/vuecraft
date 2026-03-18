/**
 * computed 原理实现
 * 
 * 核心原理：
 * 1. 惰性求值：只有被访问时才计算
 * 2. 缓存：依赖不变时返回缓存结果
 * 3. 自动收集依赖：计算函数中的响应式数据变化时重新计算
 * 
 * 实现要点：
 * - 使用 effect + lazy 选项
 * - 通过 dirty 标记判断是否需要重新计算
 * - 作为 effect 同时也收集依赖
 */

import { ReactiveEffect, trackEffects, triggerEffects } from './effect'
import type { Dep } from './effect'

// ref 标志
export const enum RefFlags {
  IS_REF = '__v_isRef'
}

/**
 * Ref 类型
 */
export interface Ref<T = any> {
  value: T
  [RefFlags.IS_REF]: boolean
}

/**
 * computed 实现类
 */
class ComputedRefImpl<T> {
  private _value!: T
  private _dirty = true  // 是否需要重新计算
  private _effect: ReactiveEffect
  dep?: Dep
  
  [RefFlags.IS_REF] = true
  
  constructor(getter: () => T) {
    // 创建 effect，使用 scheduler 实现惰性计算
    this._effect = new ReactiveEffect(getter, {
      scheduler: () => {
        // 依赖变化时，标记为 dirty，触发更新
        if (!this._dirty) {
          this._dirty = true
          triggerRefValue(this)
        }
      }
    })
  }
  
  get value() {
    // 收集依赖
    trackRefValue(this)
    
    // dirty 时重新计算
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()!
    }
    
    return this._value
  }
}

/**
 * 收集 computed 依赖
 */
function trackRefValue(ref: { dep?: Dep }) {
  if (!ref.dep) {
    ref.dep = new Set()
  }
  trackEffects(ref.dep)
}

/**
 * 触发 computed 更新
 */
function triggerRefValue(ref: { dep?: Dep }) {
  if (ref.dep) {
    triggerEffects(ref.dep)
  }
}

// 导入 reactive 用于示例
import { reactive } from './reactive'
import { effect } from './effect'

/**
 * 创建计算属性
 * 
 * @example
 * ```ts
 * const state = reactive({ firstName: 'John', lastName: 'Doe' })
 * 
 * const fullName = computed(() => {
 *   console.log('computing...') // 只在需要时打印
 *   return `${state.firstName} ${state.lastName}`
 * })
 * 
 * console.log(fullName.value) // computing... John Doe
 * console.log(fullName.value) // John Doe (使用缓存)
 * 
 * state.firstName = 'Jane'
 * console.log(fullName.value) // computing... Jane Doe
 * ```
 */
export function computed<T>(getter: () => T): Ref<T> {
  return new ComputedRefImpl(getter) as any
}

/**
 * 可写的 computed
 */
class WritableComputedRefImpl<T> {
  private _value!: T
  private _dirty = true
  private _effect: ReactiveEffect
  dep?: Dep
  
  [RefFlags.IS_REF] = true
  
  constructor(
    getter: () => T,
    private _setter: (v: T) => void
  ) {
    this._effect = new ReactiveEffect(getter, {
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true
          triggerRefValue(this)
        }
      }
    })
  }
  
  get value() {
    trackRefValue(this)
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()!
    }
    return this._value
  }
  
  set value(newValue: T) {
    this._setter(newValue)
  }
}

/**
 * 创建可写的计算属性
 * 
 * @example
 * ```ts
 * const state = reactive({ firstName: 'John', lastName: 'Doe' })
 * 
 * const fullName = computed({
 *   get: () => `${state.firstName} ${state.lastName}`,
 *   set: (v) => {
 *     const [first, last] = v.split(' ')
 *     state.firstName = first
 *     state.lastName = last
 *   }
 * })
 * ```
 */
export function writableComputed<T>(options: {
  get: () => T
  set: (v: T) => void
}): Ref<T> {
  return new WritableComputedRefImpl(options.get, options.set) as any
}

/**
 * computed 的完整实现示例
 */
export function computedDemo() {
  const state = reactive({ count: 0 })
  
  // 创建 computed
  const doubled = computed(() => {
    console.log('computing doubled...')
    return state.count * 2
  })
  
  // 使用 effect 观察 computed 变化
  effect(() => {
    console.log('doubled:', doubled.value)
  })
  
  // 打印: computing doubled... doubled: 0
  
  state.count++
  // 打印: computing doubled... doubled: 2
  
  // 再次访问使用缓存
  console.log(doubled.value) // 2 (不打印 computing)
}