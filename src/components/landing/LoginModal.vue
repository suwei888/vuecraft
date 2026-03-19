<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    width="450px"
    class="login-dialog"
    :close-on-click-modal="true"
    v-motion
    :initial="{ opacity: 0, scale: 0.9 }"
    :enter="{ opacity: 1, scale: 1 }"
    :leave="{ opacity: 0, scale: 0.9 }"
  >
    <div class="login-modal">
      <!-- Close Button -->
      <button class="close-btn" @click="visible = false">
        <el-icon><Close /></el-icon>
      </button>

      <!-- Header -->
      <div class="modal-header" v-motion-slide-in-top>
        <div class="logo-wrapper">
          <el-icon class="logo-icon"><TrendCharts /></el-icon>
        </div>
        <h2 class="modal-title">{{ t('auth.welcomeBack') }}</h2>
        <p class="modal-subtitle">{{ t('auth.signInContinue') }}</p>
      </div>

      <!-- Form -->
      <el-form
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="email" v-motion-slide-in-bottom :delay="100">
          <RainbowBorderInput
            v-model="loginForm.email"
            type="email"
            :placeholder="t('auth.emailPlaceholder')"
            prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item prop="password" v-motion-slide-in-bottom :delay="200">
          <RainbowBorderInput
            v-model="loginForm.password"
            type="password"
            :placeholder="t('auth.passwordPlaceholder')"
            prefix-icon="Lock"
          />
        </el-form-item>

        <div class="form-options" v-motion-slide-in-bottom :delay="300">
          <el-checkbox v-model="rememberMe" :label="t('common.rememberMe')" />
          <a href="#" class="forgot-link">{{ t('common.forgotPassword') }}</a>
        </div>

        <el-form-item v-motion-slide-in-bottom :delay="400">
          <el-button
            type="primary"
            class="login-submit-btn"
            :loading="loading"
            @click="handleLogin"
          >
            <span v-if="!loading">{{ t('common.signIn') }}</span>
            <span v-else>{{ t('common.signingIn') }}</span>
          </el-button>
        </el-form-item>
      </el-form>

      <!-- Divider -->
      <div class="divider" v-motion-fade-in :delay="500">
        <span>{{ t('common.orContinueWith') }}</span>
      </div>

      <!-- Social Login -->
      <div class="social-login" v-motion-slide-in-bottom :delay="600">
        <el-button class="social-btn" v-for="social in socials" :key="social.name">
          <span class="social-icon">{{ social.icon }}</span>
          <span class="social-name">{{ social.name }}</span>
        </el-button>
      </div>

      <!-- Footer -->
      <div class="modal-footer" v-motion-fade-in :delay="700">
        <p>
          {{ t('common.noAccount') }}
          <a href="#" class="signup-link">{{ t('common.signUp') }}</a>
        </p>
      </div>

      <!-- Particles Effect -->
      <div class="modal-particles">
        <div
          class="particle"
          v-for="i in 20"
          :key="i"
          :style="{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }"
        ></div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { FormInstance, FormRules } from 'element-plus'
import RainbowBorderInput from './RainbowBorderInput.vue'

const { t } = useI18n()

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'login': []
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const formRef = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})

const rules: FormRules = {
  email: [
    { required: true, message: t('auth.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('auth.emailInvalid'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('auth.passwordRequired'), trigger: 'blur' },
    { min: 6, message: t('auth.passwordMin'), trigger: 'blur' }
  ]
}

const socials = [
  { name: 'Google', icon: 'G' },
  { name: 'Apple', icon: 'A' },
  { name: 'Wallet', icon: 'W' }
]

const handleLogin = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      // Simulate login
      setTimeout(() => {
        loading.value = false
        emit('login')
      }, 1500)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-modal {
  position: relative;
  padding: 2rem;
  overflow: hidden;

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    z-index: 10;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }

  .modal-header {
    text-align: center;
    margin-bottom: 2rem;

    .logo-wrapper {
      width: 70px;
      height: 70px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);

      .logo-icon {
        font-size: 2rem;
        color: white;
      }
    }

    .modal-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: white;
    }

    .modal-subtitle {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.95rem;
    }
  }

  .login-form {
    :deep(.el-form-item) {
      margin-bottom: 1.5rem;
      
      .el-form-item__error {
        color: #f87171;
        font-size: 0.85rem;
        padding-top: 0.25rem;
      }
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      :deep(.el-checkbox) {
        .el-checkbox__label {
          color: rgba(255, 255, 255, 0.7);
        }
        .el-checkbox__inner {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        &.is-checked .el-checkbox__inner {
          background: #2563eb;
          border-color: #2563eb;
        }
      }

      .forgot-link {
        color: #3b82f6;
        text-decoration: none;
        font-size: 0.9rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .login-submit-btn {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 12px;
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
      border: none;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
      }
    }
  }

  .divider {
    text-align: center;
    margin: 1.5rem 0;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 40%;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }

    span {
      background: rgba(15, 15, 25, 1);
      padding: 0 1rem;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.85rem;
    }
  }

  .social-login {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    .social-btn {
      flex: 1;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
      }

      .social-icon {
        font-size: 1.25rem;
        font-weight: 700;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background: linear-gradient(135deg, #2563eb, #8b5cf6);
        color: white;
        margin-right: 0.5rem;
      }

      .social-name {
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }

  .modal-footer {
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;

    .signup-link {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .modal-particles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;

    .particle {
      position: absolute;
      bottom: -20px;
      width: 6px;
      height: 6px;
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
      border-radius: 50%;
      animation: float-up linear infinite;
      opacity: 0;
    }
  }
}

@keyframes float-up {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-500px) scale(1);
    opacity: 0;
  }
}

// Dialog styling
:deep(.el-dialog) {
  background: rgba(15, 15, 25, 0.98) !important;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(30px);
  overflow: hidden;

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
    background: rgba(15, 15, 25, 0.98);
  }
}

:deep(.el-dialog__wrapper) {
  background: rgba(0, 0, 0, 0.7);
}
</style>
