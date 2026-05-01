<template>
  <div class="page my-cities-page">
    <div class="page-header">
      <h1 class="page-title">我的打卡相册</h1>
      <div class="stats-card">
        <div class="stat-item">
          <span class="stat-value">{{ visitedCount }}</span>
          <span class="stat-label">打卡城市</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ totalLandmarks }}</span>
          <span class="stat-label">地标总数</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ totalLikes }}</span>
          <span class="stat-label">获赞总数</span>
        </div>
      </div>
    </div>

    <div v-if="visitedCities.length > 0" class="gallery-section">
      <div class="section-header">
        <h2 class="section-title">已点亮城市</h2>
        <button class="share-all-btn" @click="handleShareAll">
          <span>📤 分享相册</span>
        </button>
      </div>
      
      <div class="city-gallery">
        <div 
          v-for="city in visitedCities" 
          :key="city.id" 
          class="gallery-item card"
          @click="goToCityDetail(city.id)"
        >
          <div class="gallery-image-wrapper">
            <img 
              v-if="city.image" 
              :src="city.image" 
              :alt="city.name || '城市'"
              class="gallery-image"
              @error="handleImageError($event)"
            />
            <div v-else class="gallery-image-placeholder">
              <span>📷</span>
            </div>
            <div class="city-overlay">
              <h3 class="city-name">{{ city.name || '未知' }}</h3>
              <span class="landmark-count">{{ getLandmarkCount(city.id) }} 个地标</span>
            </div>
          </div>
          <div class="gallery-info">
            <div class="check-in-status">
              <span class="status-icon">✓</span>
              <span class="status-text">已点亮</span>
            </div>
            <button class="share-btn" @click.stop="handleShareCity(city)">
              <span>📤</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📸</div>
      <h2 class="empty-title">还没有打卡记录</h2>
      <p class="empty-desc">快去探索城市，点亮你的专属旅行地图吧！</p>
      <button class="start-btn" @click="goToExplore">
        开始探索
      </button>
    </div>

    <BottomNav />
    <LoginModal :show="showLoginModal" :message="loginMessage" @update:show="showLoginModal = $event" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCityById, getLandmarksByCityId, landmarks, formatNumber } from '../data/mockData'
import { useCityStore, useUserStore } from '../stores'
import BottomNav from '../components/BottomNav.vue'
import LoginModal from '../components/LoginModal.vue'

const router = useRouter()
const cityStore = useCityStore()
const userStore = useUserStore()

const showLoginModal = ref(false)
const loginMessage = ref('')

onMounted(() => {
  cityStore.initFromStorage()
  userStore.initFromStorage()
})

const visitedCityIds = computed(() => {
  const ids = cityStore.getVisitedCities() || []
  return ids.filter(id => id && !isNaN(parseInt(id))).map(id => parseInt(id))
})

const visitedCities = computed(() => {
  const cities = visitedCityIds.value
    .map(id => getCityById(id))
    .filter(city => city && city.id)
  return cities
})

const visitedCount = computed(() => visitedCities.value.length)

const totalLandmarks = computed(() => {
  return visitedCities.value.reduce((total, city) => {
    if (!city || !city.id) return total
    const cityLandmarks = getLandmarksByCityId(city.id) || []
    return total + cityLandmarks.length
  }, 0)
})

const totalLikes = computed(() => {
  return visitedCities.value.reduce((total, city) => {
    if (!city || !city.id) return total
    const cityLandmarks = getLandmarksByCityId(city.id) || []
    const cityLikes = cityLandmarks.reduce((sum, landmark) => {
      return sum + (landmark.likes || 0)
    }, 0)
    return total + cityLikes
  }, 0)
})

const getLandmarkCount = (cityId) => {
  if (!cityId) return 0
  const cityLandmarks = getLandmarksByCityId(cityId) || []
  return cityLandmarks.length
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const goToCityDetail = (cityId) => {
  if (!cityId) return
  router.push(`/city-detail/${cityId}`)
}

const goToExplore = () => {
  router.push('/city-filter')
}

const handleShareAll = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '分享相册需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  alert('分享功能：可分享整个打卡相册到微信、朋友圈、微博等社交平台')
}

const handleShareCity = (city) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '分享城市需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  alert(`分享「${city.name || '城市'}」的打卡记录到社交平台`)
}
</script>

<style scoped>
.my-cities-page {
  padding-bottom: 100px;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  padding-top: calc(20px + env(safe-area-inset-top, 0));
}

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
}

.stats-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
}

.gallery-section {
  padding: 20px;
}

.share-all-btn {
  font-size: 13px;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 6px 12px;
  border-radius: 16px;
}

.city-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.gallery-item {
  cursor: pointer;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.gallery-item:active {
  transform: scale(0.98);
}

.gallery-image-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.city-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 16px 12px 12px;
}

.city-name {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.landmark-count {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
}

.gallery-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

.check-in-status {
  display: flex;
  align-items: center;
}

.status-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
  color: #fff;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
}

.status-text {
  font-size: 12px;
  color: #52c41a;
  font-weight: 500;
}

.share-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
}

.empty-state .empty-icon {
  font-size: 72px;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.empty-desc {
  font-size: 14px;
  color: #999;
  line-height: 1.6;
  margin-bottom: 32px;
}

.start-btn {
  padding: 14px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
}
</style>