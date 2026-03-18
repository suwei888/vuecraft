<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>CSRF 防御</h1>
      <p>跨站请求伪造（Cross-Site Request Forgery）攻击用户已认证的网站。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>CSRF 攻击原理</h2>
      <div class="attack-flow">
        <el-steps :active="3" direction="vertical">
          <el-step title="用户登录" description="用户登录银行网站，获得 Cookie" />
          <el-step title="访问恶意网站" description="用户访问黑客网站" />
          <el-step title="发起请求" description="黑客网站自动向银行发起转账请求" />
          <el-step title="请求成功" description="浏览器自动携带 Cookie，请求成功" />
        </el-steps>
      </div>
    </section>
    
    <section class="knowledge-page__section">
      <h2>防御策略</h2>
      <el-table :data="defenseStrategies" border stripe>
        <el-table-column prop="method" label="方法" width="180" />
        <el-table-column prop="principle" label="原理" />
        <el-table-column prop="effect" label="效果" />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const defenseStrategies = ref([
  { method: 'CSRF Token', principle: '服务器生成随机 Token，表单提交时验证', effect: '阻止跨站请求' },
  { method: 'SameSite Cookie', principle: '设置 Cookie 的 SameSite 属性', effect: '阻止跨站发送 Cookie' },
  { method: '验证 Referer', principle: '检查请求来源', effect: '阻止非本站请求' },
  { method: '双重 Cookie', principle: 'Cookie 和请求参数都携带 Token', effect: '增加攻击难度' }
])
</script>