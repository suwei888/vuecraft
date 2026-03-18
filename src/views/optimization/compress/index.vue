<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>压缩策略</h1>
      <p>资源压缩优化：JS/CSS 压缩、图片优化、Gzip/Brotli 压缩。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>JS 压缩原理</h2>
      <el-table :data="jsCompressMethods" border stripe>
        <el-table-column prop="method" label="方法" width="150" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="example" label="效果" />
      </el-table>
    </section>
    
    <section class="knowledge-page__section">
      <h2>Vite 压缩配置</h2>
      <CodeBlock :files="compressConfig" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const jsCompressMethods = ref([
  { method: '空白符移除', desc: '删除空格、换行、注释', example: 'var a=1;b=2' },
  { method: '变量名缩短', desc: '将变量名缩短为单字符', example: 'var a=1,b=2' },
  { method: '死代码消除', desc: '移除不可达代码', example: '移除 false 分支' },
  { method: '常量折叠', desc: '编译时计算常量表达式', example: '1+2 → 3' }
])

const compressConfig = ref([
  {
    name: 'Vite 压缩配置',
    code: `import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 移除 console
        drop_debugger: true  // 移除 debugger
      }
    }
  },
  plugins: [
    // Gzip 压缩
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    // Brotli 压缩 (更好的压缩率)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ]
})`
  }
])
</script>