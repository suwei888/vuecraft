<template>
  <router-view v-slot="{ Component, route }">
    <component :is="route.meta.noLayout ? Component : AppLayoutWrapper">
      <component :is="Component" v-if="!route.meta.noLayout" />
    </component>
  </router-view>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'

const AppLayoutWrapper = defineComponent({
  name: 'AppLayoutWrapper',
  setup(_, { slots }) {
    return () => h(AppLayout, {}, slots.default)
  }
})
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>