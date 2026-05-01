<template>
  <div class="page home-page">
    <div class="header">
      <div class="search-box" @click="showSearch = true">
        <span class="search-icon">🔍</span>
        <span class="search-placeholder">搜索城市、地标</span>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">热门省份</h2>
      </div>
      <div class="province-scroll">
        <div 
          v-for="province in provinces" 
          :key="province.id" 
          class="province-item"
          @click="goToProvince(province.id)"
        >
          <div class="province-icon">{{ getProvinceIcon(province.id) }}</div>
          <span class="province-name">{{ province.name || '未知' }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">热门城市</h2>
        <span class="section-more" @click="goToCityFilter">更多 ></span>
      </div>
      <div class="hot-cities">
        <div 
          v-for="city in hotCities.slice(0, 6)" 
          :key="city.id" 
          class="hot-city-item card"
          @click="goToCityDetail(city.id)"
        >
          <img 
            v-if="city.image" 
            :src="city.image" 
            :alt="city.name || '城市'"
            class="hot-city-image"
            @error="handleImageError($event)"
          />
          <div v-else class="hot-city-image-placeholder">
            <span>📷</span>
          </div>
          <div class="hot-city-info">
            <h3 class="hot-city-name">{{ city.name || '未知城市' }}</h3>
            <p class="hot-city-desc">{{ (city.description || '').substring(0, 20) + '...' }}</p>
            <div class="hot-city-meta">
              <span class="meta-item">🔥 {{ formatNumber(city.popularity) }}人打卡</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">精选地标</h2>
      </div>
      <div class="landmark-grid">
        <div 
          v-for="(landmark, index) in displayLandmarks" 
          :key="landmark.id" 
          class="landmark-card card"
          @click="goToLandmarkDetail(landmark)"
        >
          <div 
            class="landmark-image-wrapper"
            :class="{ tall: index % 3 === 0 }"
          >
            <img 
              v-if="landmark.image" 
              :src="landmark.image" 
              :alt="landmark.name || '地标'"
              class="landmark-image"
              @error="handleImageError($event)"
            />
            <div v-else class="landmark-image-placeholder">
              <span>🗼</span>
            </div>
          </div>
          <div class="landmark-info">
            <h3 class="landmark-name">{{ landmark.name || '未知地标' }}</h3>
            <p class="landmark-city">{{ getCityName(landmark.cityId) }}</p>
            <div class="landmark-stats">
              <span class="stat-item">📍 {{ formatNumber(landmark.checkInCount) }}</span>
              <span class="stat-item">❤️ {{ formatNumber(landmark.likes) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
      </div>
    </div>

    <BottomNav />

    <div v-if="showSearch" class="search-modal">
      <div class="search-header">
        <div class="search-input-box">
          <span class="search-icon">🔍</span>
          <input 
            v-model="searchKeyword" 
            type="text" 
            placeholder="搜索城市、地标名称"
            class="search-input"
            @input="handleSearch"
            autofocus
          />
          <button v-if="searchKeyword" class="clear-btn" @click="clearSearch">✕</button>
        </div>
        <button class="cancel-btn" @click="closeSearch">取消</button>
      </div>
      
      <div class="search-content" v-if="searchKeyword">
        <div v-if="searchResults.cities.length > 0" class="search-section">
          <h3 class="search-section-title">城市</h3>
          <div class="search-results">
            <div 
              v-for="city in searchResults.cities" 
              :key="city.id" 
              class="search-result-item"
              @click="goToCityDetail(city.id); closeSearch()"
            >
              <span class="result-icon">🏙️</span>
              <div class="result-info">
                <h4 class="result-name">{{ city.name }}</h4>
                <p class="result-desc">{{ city.description?.substring(0, 30) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="searchResults.landmarks.length > 0" class="search-section">
          <h3 class="search-section-title">地标</h3>
          <div class="search-results">
            <div 
              v-for="landmark in searchResults.landmarks" 
              :key="landmark.id" 
              class="search-result-item"
              @click="goToLandmarkDetail(landmark); closeSearch()"
            >
              <span class="result-icon">🗼</span>
              <div class="result-info">
                <h4 class="result-name">{{ landmark.name }}</h4>
                <p class="result-desc">{{ landmark.description?.substring(0, 30) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="searchResults.cities.length === 0 && searchResults.landmarks.length === 0" class="empty">
          <div class="empty-icon">🔍</div>
          <p class="empty-text">未找到相关内容</p>
        </div>
      </div>
      
      <div v-else class="hot-search">
        <h3 class="hot-search-title">热门搜索</h3>
        <div class="hot-search-tags">
          <span 
            v-for="tag in hotSearchTags" 
            :key="tag" 
            class="hot-tag"
            @click="searchKeyword = tag; handleSearch()"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <LoginModal :show="showLoginModal" @update:show="showLoginModal = $event" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { provinces, getHotCities, landmarks, searchAll, getCityById, formatNumber } from '../data/mockData'
import BottomNav from '../components/BottomNav.vue'
import LoginModal from '../components/LoginModal.vue'

const router = useRouter()

const showSearch = ref(false)
const searchKeyword = ref('')
const searchResults = ref({ cities: [], landmarks: [] })
const showLoginModal = ref(false)
const loading = ref(false)
const displayLandmarks = ref([])
const currentPage = ref(1)
const pageSize = ref(12)
const hasMore = ref(true)

const hotSearchTags = ['北京', '故宫', '成都', '大熊猫', '西湖', '长城', '丽江', '重庆']

const hotCities = computed(() => {
  const result = getHotCities() || []
  return result.filter(city => city && city.id)
})

const getProvinceIcon = (id) => {
  const icons = {
    1: '🏛️',
    2: '🌆',
    3: '🌴',
    4: '🌸',
    5: '🏯',
    6: '🐼',
    7: '🏔️',
    8: '🔥'
  }
  return icons[id] || '🏙️'
}

const getCityName = (cityId) => {
  if (!cityId) return '未知'
  const city = getCityById(cityId)
  return city?.name || '未知'
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const goToProvince = (provinceId) => {
  if (!provinceId) return
  router.push(`/city-filter?province=${provinceId}`)
}

const goToCityFilter = () => {
  router.push('/city-filter')
}

const goToCityDetail = (cityId) => {
  if (!cityId) return
  router.push(`/city-detail/${cityId}`)
}

const goToLandmarkDetail = (landmark) => {
  if (!landmark || !landmark.cityId) return
  router.push(`/city-detail/${landmark.cityId}`)
}

const handleSearch = () => {
  if (!searchKeyword.value || searchKeyword.value.trim() === '') {
    searchResults.value = { cities: [], landmarks: [] }
    return
  }
  searchResults.value = searchAll(searchKeyword.value)
}

const clearSearch = () => {
  searchKeyword.value = ''
  searchResults.value = { cities: [], landmarks: [] }
}

const closeSearch = () => {
  showSearch.value = false
  searchKeyword.value = ''
  searchResults.value = { cities: [], landmarks: [] }
}

const loadMoreLandmarks = () => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  
  setTimeout(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    const newLandmarks = landmarks.slice(start, end)
    
    if (newLandmarks.length > 0) {
      displayLandmarks.value = [...displayLandmarks.value, ...newLandmarks]
      currentPage.value++
    }
    
    if (newLandmarks.length < pageSize.value) {
      hasMore.value = false
    }
    
    loading.value = false
  }, 500)
}

const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  const clientHeight = document.documentElement.clientHeight || window.innerHeight
  
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadMoreLandmarks()
  }
}

onMounted(() => {
  loadMoreLandmarks()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.home-page {
  padding-bottom: 100px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 16px 20px;
  padding-top: calc(16px + env(safe-area-inset-top, 0));
}

.search-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-box:active {
  transform: scale(0.98);
}

.search-icon {
  margin-right: 12px;
  color: #999;
}

.search-placeholder {
  color: #999;
  font-size: 14px;
}

.province-scroll {
  display: flex;
  overflow-x: auto;
  padding: 0 20px;
  padding-bottom: 12px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.province-scroll::-webkit-scrollbar {
  display: none;
}

.province-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 24px;
  cursor: pointer;
  flex-shrink: 0;
}

.province-item:last-child {
  margin-right: 0;
}

.province-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.province-name {
  font-size: 13px;
  color: #333;
  font-weight: 500;
}

.hot-cities {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 0 20px;
}

.hot-city-item {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.hot-city-item:active {
  transform: scale(0.98);
}

.hot-city-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.hot-city-image-placeholder {
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.hot-city-info {
  padding: 12px;
}

.hot-city-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.hot-city-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot-city-meta {
  display: flex;
}

.meta-item {
  font-size: 11px;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
}

.landmark-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 0 20px;
}

.landmark-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.landmark-card:active {
  transform: scale(0.98);
}

.landmark-image-wrapper {
  position: relative;
  width: 100%;
  height: 140px;
  overflow: hidden;
}

.landmark-image-wrapper.tall {
  height: 180px;
}

.landmark-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.landmark-card:hover .landmark-image {
  transform: scale(1.05);
}

.landmark-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.landmark-info {
  padding: 12px;
}

.landmark-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.landmark-city {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.landmark-stats {
  display: flex;
  gap: 12px;
}

.stat-item {
  font-size: 11px;
  color: #999;
  display: flex;
  align-items: center;
}

.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.search-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  padding-top: calc(16px + env(safe-area-inset-top, 0));
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
}

.search-input-box {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 20px;
  padding: 10px 16px;
  margin-right: 12px;
}

.search-input {
  flex: 1;
  background: transparent;
  font-size: 14px;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

.clear-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ccc;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel-btn {
  font-size: 14px;
  color: #667eea;
  white-space: nowrap;
}

.search-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.search-section {
  margin-bottom: 24px;
}

.search-section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.search-result-item:last-child {
  border-bottom: none;
}

.result-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
  flex-shrink: 0;
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.result-desc {
  font-size: 12px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot-search {
  flex: 1;
  padding: 20px;
}

.hot-search-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.hot-search-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hot-tag {
  font-size: 13px;
  color: #666;
  background: #f5f7fa;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hot-tag:active {
  background: #667eea;
  color: #fff;
}
</style>