<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>XSS 防护</h1>
      <p>跨站脚本攻击（Cross-Site Scripting）是最常见的 Web 安全漏洞之一。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>XSS 攻击类型</h2>
      <el-table :data="xssTypes" border stripe>
        <el-table-column prop="type" label="类型" width="150" />
        <el-table-column prop="source" label="来源" width="120" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="example" label="示例" />
      </el-table>
    </section>
    
    <section class="knowledge-page__section">
      <h2>防御策略</h2>
      <CodeBlock :files="defenseExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const xssTypes = ref([
  { type: '反射型', source: 'URL参数', desc: '恶意代码通过URL注入', example: '?name=<script>alert(1)</script>' },
  { type: '存储型', source: '数据库', desc: '恶意代码存储在服务器', example: '评论中注入脚本' },
  { type: 'DOM型', source: '客户端', desc: 'JS动态操作DOM时注入', example: 'location.hash 插入页面' }
])

const defenseExample = ref([
  {
    name: 'XSS 防御代码',
    code: `// 1. HTML 实体编码
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

// 2. 使用 CSP (Content Security Policy)
// HTTP Header: Content-Security-Policy: default-src 'self'

// 3. Vue 自动转义
// Vue 模板中的 {{ }} 自动进行 HTML 转义
// 使用 v-html 时需要确保内容可信

// 4. 使用 DOMPurify 库
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(dirtyHtml)`
  }
])
</script>