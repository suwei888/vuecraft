import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { MotionPlugin } from '@vueuse/motion'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import i18n from './locales'
import 'element-plus/dist/index.css'
import 'prismjs/themes/prism-tomorrow.css'

import App from './App.vue'
import router from './router'
import './styles/index.scss'

const app = createApp(App)

// 注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(MotionPlugin)
app.use(i18n)
app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine)
  }
})

app.mount('#app')