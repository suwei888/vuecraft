<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>Vite 构建工具</h1>
      <p>下一代前端构建工具，基于原生 ES Module，提供极速的开发体验。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>Vite 为什么快？</h2>
      <div class="features">
        <el-card v-for="feature in features" :key="feature.title">
          <h4>{{ feature.title }}</h4>
          <p>{{ feature.desc }}</p>
        </el-card>
      </div>
    </section>
    
    <section class="knowledge-page__section">
      <h2>常用配置</h2>
      <CodeBlock :files="configExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const features = ref([
  { title: 'ESM 开发服务器', desc: '利用浏览器原生 ESM，无需打包即可启动' },
  { title: 'HMR', desc: '基于 ESM 的 HMR，更新速度极快' },
  { title: '按需编译', desc: '只编译当前页面用到的代码' },
  { title: 'Rollup 生产构建', desc: '使用 Rollup 进行生产构建，代码更小' }
])

const configExample = ref([
  {
    name: 'vite.config.ts',
    code: `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
})`
  }
])
</script>

<style lang="scss" scoped>
.features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  .el-card {
    h4 {
      color: #409eff;
      margin-bottom: 8px;
    }
    
    p {
      color: #606266;
      font-size: 14px;
    }
  }
}
</style>