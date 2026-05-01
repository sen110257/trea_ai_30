<template>
  <div class="page city-filter-page">
    <div class="page-header">
      <h1 class="page-title">城市探索</h1>
      <div class="sort-tabs">
        <button 
          class="sort-tab" 
          :class="{ active: sortType === 'hot' }"
          @click="sortType = 'hot'"
        >
          热门
        </button>
        <button 
          class="sort-tab" 
          :class="{ active: sortType === 'popularity' }"
          @click="sortType = 'popularity'"
        >
          人气
        </button>
      </div>
    </div>

    <div class="province-tabs">
      <button 
        class="province-tab" 
        :class="{ active: selectedProvince === null }"
        @click="selectedProvince = null"
      >
        全部
      </button>
      <button 
        v-for="province in provinces" 
        :key="province.id" 
        class="province-tab" 
        :class="{ active: selectedProvince === province.id }"
        @click="selectedProvince = province.id"
      >
        {{ province.name || '未知' }}
      </button>
    </div>

    <div class="city-list">
      <div 
        v-for="city in sortedCities" 
        :key="city.id" 
        class="city-card card"
        :class="{ visited: isCityVisited(city.id) }"
        @click="goToCityDetail(city.id)"
      >
        <div class="city-image-wrapper">
          <img 
            v-if="city.image" 
            :src="city.image" 
            :alt="city.name || '城市'"
            class="city-image"
            @error="handleImageError($event)"
          />
          <div v-else class="city-image-placeholder">
            <span>📷</span>
          </div>
          <div v-if="isCityVisited(city.id)" class="visited-badge">
            <span>✓ 已打卡</span>
          </div>
        </div>
        <div class="city-info">
          <div class="city-header">
            <h3 class="city-name">{{ city.name || '未知城市' }}</h3>
            <span v-if="city.hot" class="hot-tag">热门</span>
          </div>
          <p class="city-desc">{{ (city.description || '暂无描述').substring(0, 40) + '...' }}</p>
          <div class="city-stats">
            <span class="stat-item">📍 {{ formatNumber(city.popularity) }} 人打卡</span>
            <span class="stat-item">🗼 {{ getLandmarkCount(city.id) }} 个地标</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="sortedCities.length === 0" class="empty">
      <div class="empty-icon">🗺️</div>
      <p class="empty-text">暂无城市数据</p>
    </div>

    <BottomNav />
    <LoginModal :show="showLoginModal" @update:show="showLoginModal = $event" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { provinces, getAllCities, getLandmarksByCityId, formatNumber } from '../data/mockData'
import { useCityStore } from '../stores'
import BottomNav from '../components/BottomNav.vue'
import LoginModal from '../components/LoginModal.vue'

const route = useRoute()
const router = useRouter()
const cityStore = useCityStore()

const sortType = ref('hot')
const selectedProvince = ref(null)
const showLoginModal = ref(false)

onMounted(() => {
  const provinceParam = route.query.province
  if (provinceParam && !isNaN(parseInt(provinceParam))) {
    selectedProvince.value = parseInt(provinceParam)
  }
  cityStore.initFromStorage()
})

const filteredCities = computed(() => {
  let cities = getAllCities() || []
  cities = cities.filter(city => city && city.id)
  
  if (selectedProvince.value) {
    cities = cities.filter(city => city.provinceId === selectedProvince.value)
  }
  
  return cities
})

const sortedCities = computed(() => {
  const cities = [...filteredCities.value]
  
  if (sortType.value === 'hot') {
    return cities.sort((a, b) => {
      if (a.hot && !b.hot) return -1
      if (!a.hot && b.hot) return 1
      return (b.popularity || 0) - (a.popularity || 0)
    })
  } else {
    return cities.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
  }
})

const isCityVisited = (cityId) => {
  if (!cityId) return false
  return cityStore.isCityVisited(cityId)
}

const getLandmarkCount = (cityId) => {
  if (!cityId) return 0
  const landmarks = getLandmarksByCityId(cityId)
  return landmarks ? landmarks.length : 0
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const goToCityDetail = (cityId) => {
  if (!cityId) return
  router.push(`/city-detail/${cityId}`)
}
</script>

<style scoped>
.city-filter-page {
  padding-bottom: 100px;
}

.page-header {
  padding: 20px;
  padding-top: calc(20px + env(safe-area-inset-top, 0));
  background: #fff;
}

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
}

.sort-tabs {
  display: inline-flex;
  background: #f5f7fa;
  border-radius: 20px;
  padding: 4px;
}

.sort-tab {
  padding: 8px 20px;
  font-size: 14px;
  color: #999;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.sort-tab.active {
  background: #667eea;
  color: #fff;
  font-weight: 500;
}

.province-tabs {
  display: flex;
  overflow-x: auto;
  padding: 12px 20px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  gap: 10px;
}

.province-tabs::-webkit-scrollbar {
  display: none;
}

.province-tab {
  flex-shrink: 0;
  padding: 8px 16px;
  font-size: 13px;
  color: #666;
  background: #f5f7fa;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.province-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-weight: 500;
}

.city-list {
  padding: 16px 20px;
}

.city-card {
  display: flex;
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 1;
}

.city-card:active {
  transform: scale(0.98);
}

.city-card:not(.visited) {
  opacity: 0.7;
}

.city-card.visited {
  opacity: 1;
  border: 2px solid rgba(102, 126, 234, 0.3);
}

.city-image-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 12px 0 0 12px;
  overflow: hidden;
}

.city-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.city-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.visited-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
  color: #fff;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.city-info {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.city-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.city-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-right: 8px;
}

.hot-tag {
  font-size: 10px;
  color: #ff4d4f;
  background: rgba(255, 77, 79, 0.1);
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 500;
}

.city-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.city-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  font-size: 11px;
  color: #666;
  display: flex;
  align-items: center;
}
</style>