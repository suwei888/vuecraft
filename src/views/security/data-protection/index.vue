<template>
  <div class="knowledge-page">
    <header class="knowledge-page__header">
      <h1>数据保护</h1>
      <p>前端数据安全：数据脱敏、存储安全、隐私保护。</p>
    </header>
    
    <section class="knowledge-page__section">
      <h2>数据脱敏</h2>
      <CodeBlock :files="maskExample" language="typescript" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const maskExample = ref([
  {
    name: '数据脱敏工具',
    code: `// 数据脱敏工具类
class DataMasker {
  // 手机号脱敏: 138****8888
  static maskPhone(phone: string): string {
    return phone.replace(/(\\d{3})\\d{4}(\\d{4})/, '$1****$2')
  }
  
  // 身份证脱敏: 1101**********1234
  static maskIdCard(idCard: string): string {
    return idCard.replace(/(\\d{4})\\d{10}(\\d{4})/, '$1**********$2')
  }
  
  // 银行卡脱敏: 6222 **** **** 8888
  static maskBankCard(card: string): string {
    return card.replace(/(\\d{4})\\d+(\\d{4})/, '$1 **** **** $2')
  }
  
  // 邮箱脱敏: ab***@example.com
  static maskEmail(email: string): string {
    const [name, domain] = email.split('@')
    return name.slice(0, 2) + '***@' + domain
  }
}

// 使用示例
DataMasker.maskPhone('13812345678')    // 138****5678
DataMasker.maskIdCard('110101199001011234') // 1101**********1234
DataMasker.maskEmail('abcdef@example.com')  // ab***@example.com`
  }
])
</script>