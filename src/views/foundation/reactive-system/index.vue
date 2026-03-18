<template>
  <div class="knowledge-page">
    <!-- 页面头部 -->
    <header class="knowledge-page__header">
      <h1>响应式系统</h1>
      <p>
        Vue3 的响应式系统是其核心特性之一，通过 Proxy 实现数据劫持，当数据变化时自动更新视图。
        理解响应式原理是掌握 Vue3 的关键。
      </p>
    </header>

    <!-- 概念介绍 -->
    <section class="knowledge-page__section">
      <h2>一、什么是响应式？</h2>
      <div class="concept-box">
        <p>
          <strong>响应式</strong>是指当数据发生变化时，自动通知依赖该数据的视图或计算进行更新。
        </p>
        
        <h3>第一性原理理解</h3>
        <div class="principle-flow">
          <div class="flow-step" v-for="step in conceptSteps" :key="step.title">
            <div class="flow-step__number">{{ step.num }}</div>
            <div class="flow-step__content">
              <div class="flow-step__title">{{ step.title }}</div>
              <div class="flow-step__desc">{{ step.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- API 使用 -->
    <section class="knowledge-page__section">
      <h2>二、核心 API</h2>
      
      <h3>2.1 reactive</h3>
      <p><code>reactive</code> 用于创建响应式对象，只能用于对象类型。</p>
      
      <CodeBlock :files="reactiveExamples" language="typescript" />
      
      <ApiTable :apis="reactiveApis" />
      
      <h3>2.2 ref</h3>
      <p><code>ref</code> 可以包装任意类型，包括基本类型。访问需要通过 <code>.value</code>。</p>
      
      <CodeBlock :files="refExamples" language="typescript" />
      
      <h3>2.3 computed</h3>
      <p><code>computed</code> 用于创建计算属性，具有缓存特性。</p>
      
      <CodeBlock :files="computedExamples" language="typescript" />
    </section>

    <!-- 原理讲解 -->
    <section class="knowledge-page__section">
      <h2>三、实现原理</h2>
      
      <PrincipleDemo
        title="响应式系统原理流程"
        :steps="principleSteps"
      >
        <template #default>
          <CodeBlock :files="principleCode" language="typescript" />
        </template>
      </PrincipleDemo>
      
      <h3>3.1 依赖收集原理</h3>
      <div class="principle-explain">
        <p>
          依赖收集的核心思想是：<strong>在读取响应式数据时，记录当前正在执行的副作用函数</strong>。
        </p>
        <div class="data-structure">
          <h4>数据结构</h4>
          <pre><code>targetMap: WeakMap&lt;target, Map&lt;key, Set&lt;effect&gt;&gt;&gt;</code></pre>
          <ul>
            <li>WeakMap 以目标对象为键，不会阻止垃圾回收</li>
            <li>Map 以属性为键，存储该属性的所有依赖</li>
            <li>Set 存储所有依赖该属性的副作用函数</li>
          </ul>
        </div>
      </div>
      
      <h3>3.2 触发更新原理</h3>
      <div class="principle-explain">
        <p>
          当响应式数据被修改时，通过 Proxy 的 set 拦截器触发更新，执行所有依赖该属性的副作用函数。
        </p>
      </div>
    </section>

    <!-- 手写源码 -->
    <section class="knowledge-page__section">
      <h2>四、手写响应式系统</h2>
      
      <div class="source-code-tabs">
        <el-tabs v-model="activeSourceTab">
          <el-tab-pane label="reactive.ts" name="reactive">
            <CodeBlock :files="[{ name: 'reactive.ts', code: reactiveSource }]" language="typescript" />
          </el-tab-pane>
          <el-tab-pane label="effect.ts" name="effect">
            <CodeBlock :files="[{ name: 'effect.ts', code: effectSource }]" language="typescript" />
          </el-tab-pane>
          <el-tab-pane label="ref.ts" name="ref">
            <CodeBlock :files="[{ name: 'ref.ts', code: refSource }]" language="typescript" />
          </el-tab-pane>
          <el-tab-pane label="computed.ts" name="computed">
            <CodeBlock :files="[{ name: 'computed.ts', code: computedSource }]" language="typescript" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>

    <!-- 最佳实践 -->
    <section class="knowledge-page__section">
      <h2>五、最佳实践</h2>
      
      <BestPractice title="推荐做法" type="success">
        <ul>
          <li>使用 <code>ref</code> 包装基本类型，<code>reactive</code> 包装对象类型</li>
          <li>解构 reactive 对象时使用 <code>toRefs</code> 保持响应性</li>
          <li>computed 中避免副作用操作</li>
          <li>大型对象考虑使用 <code>shallowReactive</code> 优化性能</li>
        </ul>
      </BestPractice>
      
      <BestPractice title="注意事项" type="warning">
        <ul>
          <li>reactive 解构会丢失响应性</li>
          <li>直接替换 reactive 对象会丢失响应性</li>
          <li>ref 在模板中会自动解包，在 JS 中需要 .value</li>
          <li>避免在 computed 中进行异步操作</li>
        </ul>
      </BestPractice>
      
      <BestPractice title="常见陷阱" type="info">
        <ul>
          <li>在 reactive 对象上使用 <code>Object.assign</code> 会丢失响应性</li>
          <li>ref 的 <code>.value</code> 在模板中自动解包，但在嵌套对象中不会</li>
          <li>watch 监听 reactive 对象时默认是深度监听</li>
        </ul>
      </BestPractice>
    </section>

    <!-- 实时演示 -->
    <section class="knowledge-page__section">
      <h2>六、实时演示</h2>
      
      <div class="live-demo">
        <el-card>
          <template #header>
            <span>响应式演示</span>
          </template>
          
          <div class="demo-controls">
            <el-button @click="demoState.count++">count: {{ demoState.count }}</el-button>
            <el-button @click="demoState.count *= 2">double: {{ demoDouble }}</el-button>
            <div class="demo-log">
              <div v-for="(log, i) in demoLogs" :key="i" class="log-item">{{ log }}</div>
            </div>
          </div>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'
import ApiTable from '@/components/common/ApiTable.vue'
import PrincipleDemo from '@/components/common/PrincipleDemo.vue'
import BestPractice from '@/components/common/BestPractice.vue'

// Tab 状态
const activeSourceTab = ref('reactive')

// 概念步骤
const conceptSteps = [
  { num: '1', title: '数据劫持', desc: '拦截对象属性的读取和设置操作' },
  { num: '2', title: '依赖收集', desc: '在属性被读取时，记录依赖关系' },
  { num: '3', title: '触发更新', desc: '在属性被修改时，执行相关依赖' }
]

// 原理步骤
const principleSteps = [
  { title: '创建代理', description: '使用 Proxy 拦截对象操作' },
  { title: '依赖收集', description: 'get 时收集 activeEffect' },
  { title: '触发更新', description: 'set 时执行所有 dep 中的 effect' }
]

// API 文档
const reactiveApis = [
  { name: 'reactive', type: 'function', params: 'target: object', returns: 'Proxy', description: '创建响应式对象' },
  { name: 'ref', type: 'function', params: 'value: any', returns: 'Ref', description: '创建响应式引用' },
  { name: 'computed', type: 'function', params: 'getter: () => T', returns: 'ComputedRef', description: '创建计算属性' },
  { name: 'watch', type: 'function', params: 'source, callback, options?', returns: 'StopHandle', description: '监听数据变化' },
  { name: 'watchEffect', type: 'function', params: 'effect: () => void', returns: 'StopHandle', description: '自动追踪依赖' }
]

// 示例代码
const reactiveExamples = [
  {
    name: 'reactive 示例',
    code: `import { reactive } from 'vue'

// 创建响应式对象
const state = reactive({
  count: 0,
  user: {
    name: 'John',
    age: 30
  }
})

// 直接修改属性
state.count++ // 触发更新

// 嵌套对象也是响应式的
state.user.name = 'Jane' // 触发更新

// 注意：解构会丢失响应性
const { count } = state // count 不是响应式的
// 使用 toRefs 保持响应性
import { toRefs } from 'vue'
const { count } = toRefs(state) // count 是 Ref 类型`
  }
]

const refExamples = [
  {
    name: 'ref 示例',
    code: `import { ref, computed } from 'vue'

// 创建 ref
const count = ref(0)
const message = ref('Hello')

// 通过 .value 访问和修改
console.log(count.value) // 0
count.value++ // 触发更新

// ref 可以包装任意类型
const objectRef = ref({ a: 1 })
objectRef.value.a = 2 // 触发更新

// 在模板中自动解包
// <div>{{ count }}</div> 不需要 .value

// ref 与 reactive 的选择
// - 基本类型：使用 ref
// - 对象类型：使用 reactive 或 ref 都可以`
  }
]

const computedExamples = [
  {
    name: 'computed 示例',
    code: `import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// 只读 computed
const fullName = computed(() => {
  return \`\${firstName.value} \${lastName.value}\`
})

console.log(fullName.value) // 'John Doe'

// 可写 computed
const fullNameWritable = computed({
  get: () => \`\${firstName.value} \${lastName.value}\`,
  set: (val) => {
    const [first, last] = val.split(' ')
    firstName.value = first
    lastName.value = last
  }
})

fullNameWritable.value = 'Jane Smith'
// firstName.value === 'Jane'
// lastName.value === 'Smith'`
  }
]

const principleCode = [
  {
    name: '原理示意',
    code: `// 简化的响应式原理

// 1. 存储依赖关系的数据结构
const targetMap = new WeakMap()
let activeEffect = null

// 2. 收集依赖
function track(target, key) {
  if (!activeEffect) return
  
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  
  dep.add(activeEffect)
}

// 3. 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

// 4. 创建响应式对象
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key) // 收集依赖
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key) // 触发更新
      return result
    }
  })
}`
  }
]

// 手写源码
const reactiveSource = `/**
 * reactive 原理实现
 */
import { track, trigger } from './effect'

const reactiveMap = new WeakMap()

export function reactive<T extends object>(target: T): T {
  // 已代理过则返回缓存
  if (reactiveMap.has(target)) {
    return reactiveMap.get(target)
  }
  
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key)
      
      const result = Reflect.get(target, key, receiver)
      
      // 深层响应式（惰性）
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      
      return result
    },
    
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      const result = Reflect.set(target, key, value, receiver)
      
      // 值变化时触发更新
      if (oldValue !== value) {
        trigger(target, key)
      }
      
      return result
    }
  })
  
  reactiveMap.set(target, proxy)
  return proxy
}`

const effectSource = `/**
 * effect 原理实现 - 副作用函数
 */
const targetMap = new WeakMap()
let activeEffect = null

export class ReactiveEffect {
  constructor(private fn: () => any) {}
  
  run() {
    activeEffect = this
    return this.fn()
  }
}

export function effect(fn: () => any) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

export function track(target: object, key: unknown) {
  if (!activeEffect) return
  
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  
  dep.add(activeEffect)
}

export function trigger(target: object, key: unknown) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect.run())
  }
}`

const refSource = `/**
 * ref 原理实现
 */
import { trackEffects, triggerEffects } from './effect'

class RefImpl<T> {
  private _value: T
  dep?: Set<ReactiveEffect>
  
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

export function ref<T>(value: T) {
  return new RefImpl(value)
}`

const computedSource = `/**
 * computed 原理实现
 */
class ComputedRefImpl<T> {
  private _value!: T
  private _dirty = true
  private _effect: ReactiveEffect
  dep?: Set<ReactiveEffect>
  
  constructor(getter: () => T) {
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
      this._value = this._effect.run()
    }
    
    return this._value
  }
}

export function computed<T>(getter: () => T) {
  return new ComputedRefImpl(getter)
}`

// 实时演示
const demoState = reactive({
  count: 1
})

const demoDouble = computed(() => demoState.count * 2)

const demoLogs = ref<string[]>([])

watchEffect(() => {
  demoLogs.value.push(`[watchEffect] count 变化: ${demoState.count}`)
  if (demoLogs.value.length > 10) {
    demoLogs.value.shift()
  }
})

watch(() => demoState.count, (newVal, oldVal) => {
  demoLogs.value.push(`[watch] count: ${oldVal} -> ${newVal}`)
})
</script>

<style lang="scss" scoped>
.concept-box {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 24px;
  margin: 16px 0;
}

.principle-flow {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}

.flow-step {
  flex: 1;
  text-align: center;
  
  &__number {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    margin: 0 auto 16px;
  }
  
  &__title {
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  &__desc {
    font-size: 14px;
    color: #606266;
  }
}

.principle-explain {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 24px;
  margin: 16px 0;
  
  .data-structure {
    background: #f5f7fa;
    border-radius: 8px;
    padding: 16px;
    margin-top: 16px;
    
    pre {
      margin: 8px 0;
      background: #2d2d2d;
      padding: 12px;
      border-radius: 4px;
      color: #ccc;
    }
  }
}

.live-demo {
  .demo-controls {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .demo-log {
    background: #1a1a1a;
    border-radius: 8px;
    padding: 16px;
    max-height: 200px;
    overflow-y: auto;
    
    .log-item {
      color: #4caf50;
      font-family: monospace;
      font-size: 13px;
      line-height: 1.8;
    }
  }
}
</style>