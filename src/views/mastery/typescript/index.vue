<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>TypeScript 进阶</h1>
      <p>深入 TypeScript 类型系统：类型体操、泛型进阶、工具类型。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>常用工具类型</h2>
      <CodeBlock :files="utilityTypes" language="typescript" />
    </section>
    
    <section class="knowledge-page__section">
      <h2>类型体操</h2>
      <CodeBlock :files="typeGymnastics" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const utilityTypes = ref([
  {
    name: '工具类型',
    code: `// Partial - 将所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// Required - 将所有属性变为必选
type Required<T> = {
  [P in keyof T]-?: T[P]
}

// Readonly - 将所有属性变为只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// Pick - 选取部分属性
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// Omit - 排除部分属性
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

// Record - 创建对象类型
type Record<K extends keyof any, T> = {
  [P in K]: T
}

// 示例
interface User {
  id: number
  name: string
  age: number
}

type PartialUser = Partial<User>  // { id?: number; name?: string; age?: number }
type UserName = Pick<User, 'name'>  // { name: string }
type UserWithoutAge = Omit<User, 'age'>  // { id: number; name: string }`
  }
])

const typeGymnastics = ref([
  {
    name: '类型体操示例',
    code: `// 1. DeepPartial - 深层可选
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// 2. DeepReadonly - 深层只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// 3. UnionToIntersection - 联合转交叉
type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

// 4. GetRequired - 获取必选属性
type GetRequired<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P]
}

// 5. Infer 关键字 - 类型推断
type ReturnType<T> = T extends (...args: any) => infer R ? R : any
type Parameters<T> = T extends (...args: infer P) => any ? P : never

// 6. 模板字面量类型
type EventName<T extends string> = \`on\${Capitalize<T}>\`
type ClickEvent = EventName<'click'>  // 'onClick'`
  }
])
</script>