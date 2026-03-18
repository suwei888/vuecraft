/**
 * 响应式系统原理实现
 * 
 * 从第一性原理理解Vue3的响应式系统：
 * 1. 什么是响应式？ - 数据变化时自动更新依赖的视图/计算
 * 2. 核心机制：依赖收集 + 触发更新
 * 3. JavaScript实现：Proxy代理对象
 */

export * from './reactive'
export * from './ref'
export * from './effect'
export * from './computed'
export * from './watch'