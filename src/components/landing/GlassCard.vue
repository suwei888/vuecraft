<template>
  <div class="glass-card" v-motion-fade-in>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.9);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 15px 45px rgba(37, 99, 235, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);

    &::before {
      left: 100%;
    }
  }
}
</style>
