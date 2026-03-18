<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>加密算法</h1>
      <p>前端常见加密算法：对称加密、非对称加密、哈希算法、JWT。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>加密类型对比</h2>
      <el-table :data="encryptionTypes" border stripe>
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="algorithm" label="算法" width="150" />
        <el-table-column prop="keyType" label="密钥" width="120" />
        <el-table-column prop="usage" label="用途" />
      </el-table>
    </section>
    
    <section class="knowledge-page__section">
      <h2>AES 加密示例</h2>
      <CodeBlock :files="aesExample" language="typescript" />
    </section>
    
    <section class="knowledge-page__section">
      <h2>JWT 原理</h2>
      <p>JWT (JSON Web Token) 由三部分组成：Header.Payload.Signature</p>
      <CodeBlock :files="jwtExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const encryptionTypes = ref([
  { type: '对称加密', algorithm: 'AES、DES、3DES', keyType: '单密钥', usage: '数据加密存储' },
  { type: '非对称加密', algorithm: 'RSA、ECC', keyType: '公钥+私钥', usage: '密钥交换、数字签名' },
  { type: '哈希算法', algorithm: 'MD5、SHA-256', keyType: '无密钥', usage: '数据完整性校验' },
  { type: '消息认证', algorithm: 'HMAC', keyType: '共享密钥', usage: '消息完整性验证' }
])

const aesExample = ref([
  {
    name: 'AES 加密',
    code: `// 使用 Web Crypto API 实现 AES 加密
async function encryptAES(plaintext: string, password: string) {
  // 1. 生成密钥
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )
  
  // 2. 派生密钥
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  )
  
  // 3. 加密
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plaintext)
  )
  
  return { encrypted, iv, salt }
}`
  }
])

const jwtExample = ref([
  {
    name: 'JWT 结构',
    code: `// JWT 格式: Header.Payload.Signature
// 三个部分用 . 分隔，各自 Base64Url 编码

// Header
const header = {
  "alg": "HS256",
  "typ": "JWT"
}

// Payload (Claims)
const payload = {
  "sub": "1234567890",  // 用户ID
  "name": "John Doe",
  "iat": 1516239022,    // 签发时间
  "exp": 1516242622     // 过期时间
}

// Signature = HMACSHA256(
//   base64UrlEncode(header) + "." + base64UrlEncode(payload),
//   secret
// )`
  }
])
</script>