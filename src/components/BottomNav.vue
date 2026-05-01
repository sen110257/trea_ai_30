<template>
  <div class="bottom-nav">
    <div 
      class="nav-item" 
      :class="{ active: currentRoute === '/' }"
      @click="navigateTo('/')"
    >
      <span class="nav-item-icon">🏠</span>
      <span class="nav-item-text">首页</span>
    </div>
    <div 
      class="nav-item" 
      :class="{ active: currentRoute === '/city-filter' }"
      @click="navigateTo('/city-filter')"
    >
      <span class="nav-item-icon">🗺️</span>
      <span class="nav-item-text">城市</span>
    </div>
    <div 
      class="nav-item" 
      :class="{ active: currentRoute === '/my-cities' }"
      @click="navigateTo('/my-cities')"
    >
      <span class="nav-item-icon">📸</span>
      <span class="nav-item-text">我的</span>
    </div>
    <div 
      class="nav-item" 
      :class="{ active: currentRoute === '/profile' }"
      @click="navigateTo('/profile')"
    >
      <span class="nav-item-icon">👤</span>
      <span class="nav-item-text">中心</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentRoute = computed(() => route.path)

const navigateTo = (path) => {
  if (route.path !== path) {
    router.push(path)
  }
}
</script>

<style scoped>
</style>