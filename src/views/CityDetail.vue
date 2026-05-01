<template>
  <div class="page city-detail-page">
    <div class="back-header">
      <button class="back-btn" @click="goBack">
        <span>←</span>
      </button>
      <h1 class="header-title">{{ city?.name || '城市详情' }}</h1>
      <button class="share-btn" @click="handleShare">
        <span>📤</span>
      </button>
    </div>

    <div v-if="city" class="carousel-wrapper">
      <div class="carousel" ref="carouselRef">
        <div 
          v-for="(image, index) in bannerImages" 
          :key="index" 
          class="carousel-slide"
          :style="{ transform: `translateX(${(currentSlide - index) * 100}%)` }"
        >
          <img 
            v-if="image" 
            :src="image" 
            :alt="`${city.name || '城市'} 风景 ${index + 1}`"
            class="carousel-image"
            @error="handleImageError($event)"
          />
          <div v-else class="carousel-placeholder">
            <span>🖼️</span>
          </div>
        </div>
      </div>
      <div class="carousel-dots">
        <span 
          v-for="(image, index) in bannerImages" 
          :key="index" 
          class="dot"
          :class="{ active: currentSlide === index }"
          @click="currentSlide = index"
        ></span>
      </div>
    </div>

    <div v-if="city" class="city-info-section card">
      <div class="info-header">
        <h2 class="city-name">{{ city.name || '未知城市' }}</h2>
        <div class="action-buttons">
          <button 
            class="action-btn" 
            :class="{ visited: isVisited }"
            @click="handleCheckIn"
          >
            <span class="btn-icon">{{ isVisited ? '✓' : '📍' }}</span>
            <span class="btn-text">{{ isVisited ? '已打卡' : '打卡' }}</span>
          </button>
          <button 
            class="action-btn" 
            :class="{ favorited: isFavorited }"
            @click="handleFavorite"
          >
            <span class="btn-icon">{{ isFavorited ? '❤️' : '🤍' }}</span>
            <span class="btn-text">收藏</span>
          </button>
        </div>
      </div>
      
      <p class="city-description">{{ city.description || '暂无描述' }}</p>
      
      <div class="city-stats">
        <div class="stat-item">
          <span class="stat-value">{{ formatNumber(city.popularity) }}</span>
          <span class="stat-label">打卡人数</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ landmarkCount }}</span>
          <span class="stat-label">地标数量</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ foodCount }}</span>
          <span class="stat-label">特色美食</span>
        </div>
      </div>
    </div>

    <div v-if="city?.history" class="section">
      <div class="section-header">
        <h2 class="section-title">人文历史</h2>
      </div>
      <div class="history-content card">
        <p>{{ city.history }}</p>
      </div>
    </div>

    <div v-if="landmarks.length > 0" class="section">
      <div class="section-header">
        <h2 class="section-title">知名地标</h2>
        <span class="section-more" @click="scrollToLandmarks">全部 ></span>
      </div>
      <div class="landmarks-scroll">
        <div 
          v-for="landmark in landmarks" 
          :key="landmark.id" 
          class="landmark-item card"
          @click="scrollToLandmark(landmark.id)"
        >
          <img 
            v-if="landmark.image" 
            :src="landmark.image" 
            :alt="landmark.name || '地标'"
            class="landmark-thumb"
            @error="handleImageError($event)"
          />
          <div v-else class="landmark-thumb-placeholder">
            <span>🗼</span>
          </div>
          <div class="landmark-info">
            <h3 class="landmark-name">{{ landmark.name || '未知地标' }}</h3>
            <div class="landmark-meta">
              <span class="meta-item">📍 {{ formatNumber(landmark.checkInCount) }}</span>
              <span class="meta-item">❤️ {{ formatNumber(landmark.likes) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="landmarks.length > 0" class="section" ref="landmarksSection">
      <div class="section-header">
        <h2 class="section-title">地标详情</h2>
      </div>
      <div class="landmark-detail-list">
        <div 
          v-for="landmark in landmarks" 
          :key="landmark.id" 
          :id="`landmark-${landmark.id}`"
          class="landmark-detail-card card"
        >
          <img 
            v-if="landmark.image" 
            :src="landmark.image" 
            :alt="landmark.name || '地标'"
            class="landmark-detail-image"
            @error="handleImageError($event)"
          />
          <div v-else class="landmark-detail-image-placeholder">
            <span>🗼</span>
          </div>
          <div class="landmark-detail-info">
            <h3 class="landmark-detail-name">{{ landmark.name || '未知地标' }}</h3>
            <p class="landmark-detail-desc">{{ landmark.description || '暂无描述' }}</p>
            <div class="landmark-detail-actions">
              <button class="action-icon-btn" @click="handleLandmarkLike(landmark)">
                <span>{{ landmarkLiked[landmark.id] ? '❤️' : '🤍' }}</span>
                <span>{{ formatNumber(landmarkLiked[landmark.id] ? (landmark.likes || 0) + 1 : landmark.likes) }}</span>
              </button>
              <button class="action-icon-btn" @click="handleLandmarkComment(landmark)">
                <span>💬</span>
                <span>{{ getCommentCount(landmark.id, 'landmark') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">用户评论</h2>
        <span class="section-more">共 {{ comments.length }} 条</span>
      </div>
      
      <div class="comments-list">
        <div 
          v-for="comment in comments" 
          :key="comment.id" 
          class="comment-item card"
        >
          <div class="comment-header">
            <div class="avatar">{{ (comment.userName || 'U')[0] }}</div>
            <div class="comment-user-info">
              <h4 class="user-name">{{ comment.userName || '游客' }}</h4>
              <span class="comment-time">{{ comment.createdAt || '' }}</span>
            </div>
          </div>
          <p class="comment-content">{{ comment.content || '' }}</p>
          <div v-if="comment.images && comment.images.length > 0" class="comment-images">
            <img 
              v-for="(img, idx) in comment.images" 
              :key="idx"
              :src="img" 
              class="comment-image"
              @error="handleImageError($event)"
            />
          </div>
          <div class="comment-actions">
            <button class="comment-action-btn" @click="handleCommentLike(comment)">
              <span>{{ commentLiked[comment.id] ? '❤️' : '🤍' }}</span>
              <span>{{ formatNumber(commentLiked[comment.id] ? (comment.likes || 0) + 1 : comment.likes) }}</span>
            </button>
            <button class="comment-action-btn" @click="handleReply(comment)">
              <span>💬</span>
              <span>回复</span>
            </button>
          </div>
        </div>
        
        <div v-if="comments.length === 0" class="empty">
          <div class="empty-icon">💬</div>
          <p class="empty-text">暂无评论，快来发表第一条评论吧</p>
        </div>
      </div>
    </div>

    <div class="comment-input-bar">
      <div class="input-wrapper" @click="handleCommentInput">
        <span class="input-placeholder">说点什么...</span>
      </div>
      <button class="send-btn" @click="handleCommentInput">
        <span>发送</span>
      </button>
    </div>

    <LoginModal 
      :show="showLoginModal" 
      :message="loginMessage"
      @update:show="showLoginModal = $event" 
    />
    
    <CommentInputModal
      :show="showCommentModal"
      :target-id="commentTargetId"
      :target-type="commentTargetType"
      :target-name="commentTargetName"
      @update:show="showCommentModal = $event"
      @need-login="handleCommentNeedLogin"
      @submit="handleCommentSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  getCityById, 
  getLandmarksByCityId, 
  getFoodsByCityId, 
  getCommentsByTarget,
  formatNumber 
} from '../data/mockData'
import { useCityStore, useUserStore, useAppStore } from '../stores'
import LoginModal from '../components/LoginModal.vue'
import CommentInputModal from '../components/CommentInputModal.vue'

const route = useRoute()
const router = useRouter()
const cityStore = useCityStore()
const userStore = useUserStore()
const appStore = useAppStore()

const carouselRef = ref(null)
const landmarksSection = ref(null)
const currentSlide = ref(0)
const showLoginModal = ref(false)
const loginMessage = ref('')
const landmarkLiked = ref({})
const commentLiked = ref({})
const showCommentModal = ref(false)
const commentTargetId = ref(null)
const commentTargetType = ref('city')
const commentTargetName = ref('')
const localComments = ref([])
let carouselInterval = null

const loadLocalComments = () => {
  try {
    const stored = localStorage.getItem('localComments')
    if (stored) {
      localComments.value = JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Failed to load local comments:', e)
    localComments.value = []
  }
}

const saveLocalComments = () => {
  try {
    localStorage.setItem('localComments', JSON.stringify(localComments.value))
  } catch (e) {
    console.warn('Failed to save local comments:', e)
  }
}

const cityId = computed(() => {
  const id = route.params.cityId
  return id ? parseInt(id) : null
})

const city = computed(() => {
  if (!cityId.value) return null
  return getCityById(cityId.value)
})

const bannerImages = computed(() => {
  if (!city.value || !city.value.bannerImages) {
    return [city.value?.image || '']
  }
  return city.value.bannerImages.filter(img => img && img.trim() !== '')
})

const landmarks = computed(() => {
  if (!cityId.value) return []
  const result = getLandmarksByCityId(cityId.value) || []
  return result.filter(l => l && l.id)
})

const foods = computed(() => {
  if (!cityId.value) return []
  const result = getFoodsByCityId(cityId.value) || []
  return result.filter(f => f && f.id)
})

const landmarkCount = computed(() => landmarks.value.length)
const foodCount = computed(() => foods.value.length)

const comments = computed(() => {
  if (!cityId.value) return []
  const mockComments = getCommentsByTarget(cityId.value, 'city') || []
  const localCommentsForCity = localComments.value.filter(
    c => c.targetId == cityId.value && c.targetType === 'city'
  )
  const allComments = [...localCommentsForCity, ...mockComments]
  return allComments.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    return (b.id || 0) - (a.id || 0)
  })
})

const isVisited = computed(() => {
  if (!cityId.value) return false
  return cityStore.isCityVisited(cityId.value)
})

const isFavorited = computed(() => {
  if (!cityId.value) return false
  return cityStore.isFavorite(cityId.value)
})

onMounted(() => {
  cityStore.initFromStorage()
  userStore.initFromStorage()
  loadLocalComments()
  
  if (cityId.value) {
    cityStore.addToBrowsingHistory(cityId.value)
  }
  
  if (bannerImages.value.length > 1) {
    startCarousel()
  }
})

onUnmounted(() => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
})

const startCarousel = () => {
  carouselInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % bannerImages.value.length
  }, 4000)
}

const goBack = () => {
  router.back()
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const handleCheckIn = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '打卡城市需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  if (!cityId.value) return
  
  if (isVisited.value) {
    cityStore.removeVisitedCity(cityId.value)
  } else {
    cityStore.visitCity(cityId.value)
  }
}

const handleFavorite = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '收藏城市需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  if (!cityId.value) return
  cityStore.toggleFavorite(cityId.value)
}

const handleShare = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '分享内容需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  alert('分享功能：可分享到微信、朋友圈、微博等社交平台')
}

const handleLandmarkLike = (landmark) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '点赞需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  if (!landmark || !landmark.id) return
  landmarkLiked.value[landmark.id] = !landmarkLiked.value[landmark.id]
}

const handleLandmarkComment = (landmark) => {
  if (!landmark || !landmark.id) return
  commentTargetId.value = landmark.id
  commentTargetType.value = 'landmark'
  commentTargetName.value = landmark.name || ''
  showCommentModal.value = true
}

const handleCommentLike = (comment) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '点赞需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  if (!comment || !comment.id) return
  commentLiked.value[comment.id] = !commentLiked.value[comment.id]
}

const handleReply = (comment) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '回复评论需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  alert(`回复 @${comment.userName || '用户'} 的评论`)
}

const handleCommentInput = () => {
  commentTargetId.value = cityId.value
  commentTargetType.value = 'city'
  commentTargetName.value = city.value?.name || ''
  showCommentModal.value = true
}

const handleCommentNeedLogin = () => {
  showCommentModal.value = false
  loginMessage.value = '发表评论需要登录后才能进行，请先登录。'
  showLoginModal.value = true
}

const handleCommentSubmit = (commentData) => {
  if (!commentData) return
  
  localComments.value.push(commentData)
  saveLocalComments()
}

const getCommentCount = (targetId, targetType) => {
  if (!targetId || !targetType) return 0
  const comments = getCommentsByTarget(targetId, targetType) || []
  return comments.length
}

const scrollToLandmarks = () => {
  if (landmarksSection.value) {
    landmarksSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToLandmark = (landmarkId) => {
  const element = document.getElementById(`landmark-${landmarkId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.city-detail-page {
  padding-bottom: 100px;
}

.back-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 430px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top, 0));
  background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%);
  z-index: 100;
}

.back-btn, .share-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 260px;
  overflow: hidden;
}

.carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
}

.carousel-dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  transition: all 0.3s ease;
}

.dot.active {
  width: 20px;
  border-radius: 4px;
  background: #fff;
}

.city-info-section {
  margin: -20px 16px 16px;
  position: relative;
  z-index: 10;
  padding: 16px;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.city-name {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  border-radius: 12px;
  background: #f5f7fa;
  transition: all 0.3s ease;
}

.action-btn.visited {
  background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
}

.action-btn.favorited {
  background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
}

.btn-icon {
  font-size: 16px;
  margin-bottom: 2px;
}

.action-btn.visited .btn-icon,
.action-btn.favorited .btn-icon {
  color: #fff;
}

.btn-text {
  font-size: 11px;
  color: #666;
}

.action-btn.visited .btn-text,
.action-btn.favorited .btn-text {
  color: #fff;
}

.city-description {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
}

.city-stats {
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.history-content {
  margin: 0 16px;
  padding: 16px;
}

.history-content p {
  font-size: 13px;
  color: #666;
  line-height: 1.8;
}

.landmarks-scroll {
  display: flex;
  overflow-x: auto;
  padding: 0 16px 12px;
  gap: 12px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.landmarks-scroll::-webkit-scrollbar {
  display: none;
}

.landmark-item {
  flex-shrink: 0;
  width: 140px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.landmark-item:active {
  transform: scale(0.98);
}

.landmark-thumb {
  width: 100%;
  height: 90px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.landmark-thumb-placeholder {
  width: 100%;
  height: 90px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  border-radius: 12px 12px 0 0;
}

.landmark-info {
  padding: 10px;
}

.landmark-name {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.landmark-meta {
  display: flex;
  gap: 8px;
}

.landmark-meta .meta-item {
  font-size: 10px;
  color: #999;
}

.landmark-detail-list {
  padding: 0 16px;
}

.landmark-detail-card {
  margin-bottom: 16px;
  overflow: hidden;
}

.landmark-detail-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.landmark-detail-image-placeholder {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.landmark-detail-info {
  padding: 16px;
}

.landmark-detail-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.landmark-detail-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}

.landmark-detail-actions {
  display: flex;
  gap: 16px;
}

.action-icon-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

.comments-list {
  padding: 0 16px;
}

.comment-item {
  margin-bottom: 12px;
  padding: 16px;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.comment-header .avatar {
  margin-right: 12px;
}

.comment-user-info {
  flex: 1;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.comment-time {
  font-size: 11px;
  color: #999;
}

.comment-content {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}

.comment-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.comment-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.comment-action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

.comment-input-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 430px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0));
  background: #fff;
  border-top: 1px solid #f0f0f0;
  z-index: 100;
}

.input-wrapper {
  flex: 1;
  background: #f5f7fa;
  border-radius: 20px;
  padding: 10px 16px;
  margin-right: 12px;
}

.input-placeholder {
  font-size: 13px;
  color: #999;
}

.send-btn {
  padding: 10px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}
</style>