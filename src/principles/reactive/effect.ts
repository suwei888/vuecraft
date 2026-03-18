/**
 * 副作用函数与依赖收集原理实现
 * 
 * 核心概念：
 * 1. effect - 副作用函数，执行时自动收集依赖
 * 2. track - 依赖收集，建立 属性 -> effect 的映射
 * 3. trigger - 触发更新，执行相关 effect
 * 
 * 数据结构：
 * targetMap: WeakMap<target, Map<key, Set<effect>>>
 * - 外层 WeakMap 以目标对象为键
 * - 中层 Map 以属性为键
 * - 内层 Set 存储所有依赖此属性的 effect
 */

// 全局变量：当前正在执行的 effect
let activeEffect: ReactiveEffect | undefined

// effect 栈，用于嵌套 effect
const effectStack: ReactiveEffect[] = []

// 依赖映射表
export type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<object, KeyToDepMap>()

// 调度器类型
export type EffectScheduler = () => void

// effect 选项
export interface ReactiveEffectOptions {
  lazy?: boolean           // 是否延迟执行
  scheduler?: EffectScheduler  // 调度器
  onStop?: () => void      // 停止时的回调
}

/**
 * 副作用函数类
 */
export class ReactiveEffect {
  private _fn: () => any
  private _scheduler?: EffectScheduler
  private _onStop?: () => void
  deps: Dep[] = []  // 存储包含此 effect 的所有 Dep
  active = true     // 是否激活

  constructor(fn: () => any, options?: ReactiveEffectOptions) {
    this._fn = fn
    this._scheduler = options?.scheduler
    this._onStop = options?.onStop
  }

  run() {
    // 如果已停止，直接执行函数，不收集依赖
    if (!this.active) {
      return this._fn()
    }

    // 开启依赖收集
    // 使用栈处理嵌套 effect
    try {
      effectStack.push(this)
      activeEffect = this
      
      // 执行函数，触发 get -> track
      return this._fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }

  // 触发调度器
  trigger() {
    if (this._scheduler) {
      this._scheduler()
    } else {
      this.run()
    }
  }

  // 停止响应式
  stop() {
    if (this.active) {
      // 从所有 dep 中移除自己
      cleanupEffect(this)
      this._onStop?.()
      this.active = false
    }
  }
}

/**
 * 清理 effect 的所有依赖
 */
function cleanupEffect(effect: ReactiveEffect) {
  effect.deps.forEach(dep => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}

/**
 * 创建副作用函数
 * 
 * @example
 * ```ts
 * const state = reactive({ count: 0 })
 * 
 * effect(() => {
 *   console.log('count changed:', state.count)
 * })
 * 
 * state.count++ // 自动打印 'count changed: 1'
 * ```
 */
export function effect<T = any>(
  fn: () => T,
  options?: ReactiveEffectOptions
): () => T {
  const _effect = new ReactiveEffect(fn, options)

  // 非惰性，立即执行
  if (!options?.lazy) {
    _effect.run()
  }

  // 返回 runner
  const runner = _effect.run.bind(_effect) as any
  runner.effect = _effect

  return runner
}

/**
 * 依赖收集
 * 在 get 拦截器中调用
 */
export function track(target: object, key: unknown) {
  // 没有激活的 effect，不需要收集
  if (!activeEffect) return

  // 获取 target 对应的依赖 map
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  // 获取 key 对应的 dep set
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  // 将当前 effect 添加到 dep
  trackEffects(dep)
}

/**
 * 将 effect 添加到 dep，同时将 dep 添加到 effect.deps
 */
export function trackEffects(dep: Dep) {
  // 避免重复添加
  if (!dep.has(activeEffect!)) {
    dep.add(activeEffect!)
    activeEffect!.deps.push(dep)
  }
}

/**
 * 触发更新
 * 在 set 拦截器中调用
 */
export function trigger(target: object, key: unknown) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const dep = depsMap.get(key)
  if (dep) {
    triggerEffects(dep)
  }

  // 如果是数组，可能需要触发 length 相关的依赖
  // 这里简化处理
}

/**
 * 触发 dep 中所有 effect
 */
export function triggerEffects(dep: Dep) {
  // 复制一份，避免在执行时 effect 被删除又添加（如 computed）
  const effects = [...dep]
  
  effects.forEach(effect => {
    // 避免无限循环：触发执行的 effect 不应该再次触发自己
    if (effect !== activeEffect) {
      effect.trigger()
    }
  })
}

/**
 * 获取当前活跃的 effect
 */
export function getActiveEffect() {
  return activeEffect
}