<template>
  <div class="page profile-page">
    <div class="profile-header">
      <div class="header-bg"></div>
      <div class="user-info">
        <div v-if="userStore.isLoggedIn" class="user-avatar">
          <span>{{ userStore.userInfo?.nickname?.[0] || '用' }}</span>
        </div>
        <div v-else class="user-avatar" @click="handleLogin">
          <span>👤</span>
        </div>
        
        <div class="user-details">
          <h2 v-if="userStore.isLoggedIn" class="user-name">
            {{ userStore.userInfo?.nickname || '旅行者' }}
          </h2>
          <h2 v-else class="user-name login-prompt" @click="handleLogin">
            点击登录
          </h2>
          <p v-if="userStore.isLoggedIn" class="user-desc">
            旅行达人 · 已打卡 {{ visitedCount }} 个城市
          </p>
          <p v-else class="user-desc">
            登录后享受更多功能
          </p>
        </div>
        
        <button v-if="userStore.isLoggedIn" class="edit-btn">
          <span>✏️</span>
        </button>
      </div>
      
      <div class="user-stats">
        <div class="stat-item" @click="goToMyCities">
          <span class="stat-value">{{ visitedCount }}</span>
          <span class="stat-label">打卡城市</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item" @click="goToMyShares">
          <span class="stat-value">{{ userShares.length }}</span>
          <span class="stat-label">我的分享</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item" @click="goToBrowsingHistory">
          <span class="stat-value">{{ browsingHistoryList.length }}</span>
          <span class="stat-label">浏览历史</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item" @click="goToFavorites">
          <span class="stat-value">{{ favoriteCities.length }}</span>
          <span class="stat-label">收藏地标</span>
        </div>
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-header">
        <h3 class="menu-title">我的服务</h3>
      </div>
      
      <div class="menu-list">
        <div class="menu-item card" @click="goToMyCities">
          <div class="menu-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <span>📸</span>
          </div>
          <div class="menu-content">
            <h4 class="menu-name">我的打卡相册</h4>
            <p class="menu-desc">查看已点亮的城市</p>
          </div>
          <span class="menu-arrow">›</span>
        </div>

        <div class="menu-item card" @click="goToBrowsingHistory">
          <div class="menu-icon" style="background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);">
            <span>📖</span>
          </div>
          <div class="menu-content">
            <h4 class="menu-name">浏览历史</h4>
            <p class="menu-desc">最近浏览的城市</p>
          </div>
          <span class="menu-arrow">›</span>
        </div>

        <div class="menu-item card" @click="goToFavorites">
          <div class="menu-icon" style="background: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);">
            <span>❤️</span>
          </div>
          <div class="menu-content">
            <h4 class="menu-name">我的收藏</h4>
            <p class="menu-desc">收藏的地标和城市</p>
          </div>
          <span class="menu-arrow">›</span>
        </div>

        <div class="menu-item card" @click="goToMyShares">
          <div class="menu-icon" style="background: linear-gradient(135deg, #faad14 0%, #ffc53d 100%);">
            <span>📝</span>
          </div>
          <div class="menu-content">
            <h4 class="menu-name">我的分享</h4>
            <p class="menu-desc">我发布的游玩分享</p>
          </div>
          <span class="menu-arrow">›</span>
        </div>
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-header">
        <h3 class="menu-title">其他设置</h3>
      </div>
      
      <div class="menu-list">
        <div class="menu-item card" @click="goToFeedback">
          <div class="menu-icon" style="background: linear-gradient(135deg, #722ed1 0%, #9254de 100%);">
            <span>💬</span>
          </div>
          <div class="menu-content">
            <h4 class="menu-name">意见反馈</h4>
            <p class="menu-desc">有问题随时告诉我们</p>
          </div>
          <span class="menu-arrow">›</span>
        </div>

        <div class="menu-item card" @click="handleAbout">
          <div class="menu-icon" style="background: linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%);">
            <span>ℹ️</span>
          </div>
          <div class="menu-content">
            <h4 class="menu-name">关于我们</h4>
            <p class="menu-desc">了解更多信息</p>
          </div>
          <span class="menu-arrow">›</span>
        </div>
      </div>
    </div>

    <div v-if="userStore.isLoggedIn" class="logout-section">
      <button class="logout-btn" @click="handleLogout">
        退出登录
      </button>
    </div>

    <BottomNav />

    <LoginModal 
      :show="showLoginModal" 
      :message="loginMessage"
      @update:show="showLoginModal = $event" 
    />

    <div v-if="showListModal" class="list-modal-mask" @click.self="closeListModal">
      <div class="list-modal-content">
        <div class="list-modal-header">
          <h3 class="list-modal-title">{{ modalTitle }}</h3>
          <button class="list-modal-close" @click="closeListModal">✕</button>
        </div>

        <div v-if="activeModal === 'history'" class="list-content">
          <div v-if="browsingHistoryList.length > 0" class="list-header-actions">
            <button class="clear-btn" @click="clearBrowsingHistory">
              清空历史
            </button>
          </div>
          
          <div v-if="browsingHistoryList.length > 0" class="item-list">
            <div 
              v-for="city in browsingHistoryList" 
              :key="city.id"
              class="list-item card"
              @click="goToCityDetail(city.id)"
            >
              <div class="item-image-wrapper">
                <img 
                  v-if="city.image" 
                  :src="city.image" 
                  :alt="city.name"
                  class="item-image"
                  @error="handleImageError($event)"
                />
                <div v-else class="item-image-placeholder">
                  <span>🏙️</span>
                </div>
              </div>
              <div class="item-info">
                <h4 class="item-name">{{ city.name || '未知城市' }}</h4>
                <p class="item-desc">{{ (city.description || '').substring(0, 30) + '...' }}</p>
              </div>
              <span class="item-arrow">›</span>
            </div>
          </div>
          
          <div v-else class="empty-state">
            <div class="empty-icon">📖</div>
            <p class="empty-text">暂无浏览记录</p>
          </div>
        </div>

        <div v-if="activeModal === 'favorites'" class="list-content">
          <div v-if="favoriteCities.length > 0" class="item-list">
            <div 
              v-for="city in favoriteCities" 
              :key="city.id"
              class="list-item card"
            >
              <div class="item-image-wrapper" @click="goToCityDetail(city.id)">
                <img 
                  v-if="city.image" 
                  :src="city.image" 
                  :alt="city.name"
                  class="item-image"
                  @error="handleImageError($event)"
                />
                <div v-else class="item-image-placeholder">
                  <span>🏙️</span>
                </div>
              </div>
              <div class="item-info" @click="goToCityDetail(city.id)">
                <h4 class="item-name">{{ city.name || '未知城市' }}</h4>
                <p class="item-desc">{{ (city.description || '').substring(0, 30) + '...' }}</p>
              </div>
              <button class="unfavorite-btn" @click.stop="removeFavorite(city.id)">
                取消收藏
              </button>
            </div>
          </div>
          
          <div v-else class="empty-state">
            <div class="empty-icon">❤️</div>
            <p class="empty-text">暂无收藏内容</p>
          </div>
        </div>

        <div v-if="activeModal === 'shares'" class="list-content">
          <div v-if="userShares.length > 0" class="item-list">
            <div 
              v-for="share in userShares" 
              :key="share.id"
              class="share-item card"
            >
              <div class="share-header">
                <span class="share-type-tag" :class="share.type">
                  {{ getShareTypeLabel(share.type) }}
                </span>
                <span class="share-time">{{ share.createdAt || '' }}</span>
              </div>
              
              <div v-if="share.cityName" class="share-city">
                <span>📍 {{ share.cityName }}</span>
              </div>
              
              <p class="share-content">{{ share.content || '' }}</p>
              
              <div v-if="share.images && share.images.length > 0" class="share-images">
                <img 
                  v-for="(img, idx) in share.images.slice(0, 3)" 
                  :key="idx"
                  :src="img"
                  class="share-image"
                  @error="handleImageError($event)"
                />
              </div>
              
              <div class="share-actions">
                <button class="delete-btn" @click="deleteShare(share.id)">
                  删除
                </button>
              </div>
            </div>
          </div>
          
          <div v-else class="empty-state">
            <div class="empty-icon">📝</div>
            <p class="empty-text">暂无分享内容</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showFeedbackModal" class="feedback-modal-mask" @click.self="closeFeedbackModal">
      <div class="feedback-modal-content">
        <div class="feedback-modal-header">
          <h3 class="feedback-modal-title">意见反馈</h3>
          <button class="feedback-modal-close" @click="closeFeedbackModal">✕</button>
        </div>
        
        <div class="feedback-form">
          <div class="form-item">
            <label class="form-label">反馈类型</label>
            <div class="type-options">
              <span 
                v-for="type in feedbackTypes" 
                :key="type.value"
                class="type-option"
                :class="{ active: feedbackForm.type === type.value }"
                @click="feedbackForm.type = type.value"
              >
                {{ type.label }}
              </span>
            </div>
          </div>
          
          <div class="form-item">
            <label class="form-label">问题描述</label>
            <textarea 
              v-model="feedbackForm.content"
              class="form-textarea"
              placeholder="请详细描述您遇到的问题或建议..."
              rows="5"
            ></textarea>
            <div class="char-count">
              {{ feedbackForm.content.length }}/500
            </div>
          </div>
          
          <div class="form-item">
            <label class="form-label">联系方式（选填）</label>
            <input 
              v-model="feedbackForm.contact"
              type="text"
              class="form-input"
              placeholder="手机号或邮箱，方便我们联系您"
            />
          </div>
        </div>
        
        <button 
          class="submit-feedback-btn" 
          :class="{ disabled: !canSubmitFeedback }"
          @click="submitFeedback"
          :disabled="!canSubmitFeedback"
        >
          提交反馈
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCityById, getAllCities, formatNumber } from '../data/mockData'
import { useUserStore, useCityStore } from '../stores'
import BottomNav from '../components/BottomNav.vue'
import LoginModal from '../components/LoginModal.vue'

const router = useRouter()
const userStore = useUserStore()
const cityStore = useCityStore()

const showLoginModal = ref(false)
const loginMessage = ref('')

const showListModal = ref(false)
const activeModal = ref('')
const modalTitle = ref('')

const showFeedbackModal = ref(false)

const feedbackTypes = [
  { label: '功能问题', value: 'bug' },
  { label: '产品建议', value: 'suggestion' },
  { label: '其他', value: 'other' }
]

const feedbackForm = ref({
  type: 'bug',
  content: '',
  contact: ''
})

const userShares = ref([])

onMounted(() => {
  userStore.initFromStorage()
  cityStore.initFromStorage()
  loadUserShares()
})

const canSubmitFeedback = computed(() => {
  return feedbackForm.value.content.trim().length > 0
})

const visitedCityIds = computed(() => {
  const ids = cityStore.getVisitedCities() || []
  return ids.filter(id => id && !isNaN(parseInt(id))).map(id => parseInt(id))
})

const visitedCount = computed(() => visitedCityIds.value.length)

const browsingHistoryList = computed(() => {
  const ids = cityStore.browsingHistory || []
  const validIds = ids.filter(id => id && !isNaN(parseInt(id))).map(id => parseInt(id))
  
  return validIds
    .map(id => getCityById(id))
    .filter(city => city && city.id)
})

const favoriteCities = computed(() => {
  const ids = cityStore.favorites || []
  const validIds = ids.filter(id => id && !isNaN(parseInt(id))).map(id => parseInt(id))
  
  return validIds
    .map(id => getCityById(id))
    .filter(city => city && city.id)
})

const handleLogin = () => {
  if (userStore.isLoggedIn) return
  
  userStore.login({
    id: 1,
    nickname: '旅行者小明'
  })
}

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    userStore.logout()
  }
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const goToMyCities = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '查看我的打卡相册需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  router.push('/my-cities')
}

const goToBrowsingHistory = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '查看浏览历史需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  activeModal.value = 'history'
  modalTitle.value = '浏览历史'
  showListModal.value = true
}

const goToFavorites = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '查看我的收藏需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  activeModal.value = 'favorites'
  modalTitle.value = '我的收藏'
  showListModal.value = true
}

const goToMyShares = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '查看我的分享需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  activeModal.value = 'shares'
  modalTitle.value = '我的分享'
  loadUserShares()
  showListModal.value = true
}

const goToFeedback = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '提交意见反馈需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  showFeedbackModal.value = true
}

const handleAbout = () => {
  alert('关于我们：\n城市地标打卡图鉴 v1.0.0\n\n这是一款专注于城市旅行打卡的应用，帮助用户记录旅行足迹，发现更多美好城市。')
}

const closeListModal = () => {
  showListModal.value = false
  activeModal.value = ''
  modalTitle.value = ''
}

const closeFeedbackModal = () => {
  showFeedbackModal.value = false
  feedbackForm.value = {
    type: 'bug',
    content: '',
    contact: ''
  }
}

const clearBrowsingHistory = () => {
  if (confirm('确定要清空所有浏览历史吗？')) {
    cityStore.browsingHistory = []
    localStorage.setItem('browsingHistory', '[]')
  }
}

const removeFavorite = (cityId) => {
  if (!cityId) return
  cityStore.toggleFavorite(cityId)
}

const goToCityDetail = (cityId) => {
  if (!cityId) return
  closeListModal()
  router.push(`/city-detail/${cityId}`)
}

const loadUserShares = () => {
  try {
    const stored = localStorage.getItem('userShares')
    if (stored) {
      userShares.value = JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Failed to load user shares:', e)
    userShares.value = []
  }
}

const saveUserShares = () => {
  try {
    localStorage.setItem('userShares', JSON.stringify(userShares.value))
  } catch (e) {
    console.warn('Failed to save user shares:', e)
  }
}

const getShareTypeLabel = (type) => {
  const labels = {
    food: '美食',
    scenery: '美景',
    attraction: '游玩'
  }
  return labels[type] || '分享'
}

const deleteShare = (shareId) => {
  if (!shareId) return
  if (confirm('确定要删除这条分享吗？')) {
    const index = userShares.value.findIndex(s => s.id === shareId)
    if (index > -1) {
      userShares.value.splice(index, 1)
      saveUserShares()
    }
  }
}

const submitFeedback = () => {
  if (!canSubmitFeedback.value) return
  
  const feedbackData = {
    id: Date.now(),
    ...feedbackForm.value,
    createdAt: new Date().toLocaleString('zh-CN')
  }
  
  try {
    const stored = localStorage.getItem('feedbacks') || '[]'
    const feedbacks = JSON.parse(stored)
    feedbacks.push(feedbackData)
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks))
  } catch (e) {
    console.warn('Failed to save feedback:', e)
  }
  
  alert('感谢您的反馈！我们会认真处理您的意见。')
  closeFeedbackModal()
}
</script>

<style scoped>
.profile-page {
  padding-bottom: 100px;
  background: #f5f7fa;
}

.profile-header {
  position: relative;
  padding: 20px;
  padding-top: calc(20px + env(safe-area-inset-top, 0));
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 32px 32px;
}

.user-info {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
  border: 3px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

.user-details {
  flex: 1;
  margin-left: 16px;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.login-prompt {
  cursor: pointer;
}

.user-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.edit-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.user-stats {
  position: relative;
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.user-stats .stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.user-stats .stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}

.user-stats .stat-label {
  font-size: 11px;
  color: #999;
  margin-top: 4px;
}

.user-stats .stat-divider {
  width: 1px;
  height: 32px;
  background: #f0f0f0;
}

.menu-section {
  padding: 20px;
}

.menu-header {
  margin-bottom: 12px;
}

.menu-title {
  font-size: 14px;
  font-weight: 600;
  color: #999;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.menu-item:active {
  transform: scale(0.98);
}

.menu-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
}

.menu-content {
  flex: 1;
  min-width: 0;
}

.menu-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.menu-desc {
  font-size: 12px;
  color: #999;
}

.menu-arrow {
  font-size: 18px;
  color: #ccc;
}

.logout-section {
  padding: 20px;
}

.logout-btn {
  width: 100%;
  padding: 14px;
  background: #fff;
  color: #ff4d4f;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid #ffccc7;
}

.list-modal-mask,
.feedback-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.list-modal-content,
.feedback-modal-content {
  background: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom);
}

.list-modal-header,
.feedback-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.list-modal-title,
.feedback-modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.list-modal-close,
.feedback-modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
}

.list-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.list-header-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.clear-btn {
  font-size: 13px;
  color: #ff4d4f;
  background: rgba(255, 77, 79, 0.1);
  padding: 6px 12px;
  border-radius: 12px;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
}

.item-image-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.item-info {
  flex: 1;
  margin-left: 12px;
  min-width: 0;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.item-desc {
  font-size: 12px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-arrow {
  font-size: 16px;
  color: #ccc;
  flex-shrink: 0;
}

.unfavorite-btn {
  font-size: 12px;
  color: #ff4d4f;
  background: rgba(255, 77, 79, 0.1);
  padding: 6px 12px;
  border-radius: 12px;
  flex-shrink: 0;
}

.share-item {
  padding: 16px;
}

.share-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.share-type-tag {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 10px;
  font-weight: 500;
}

.share-type-tag.food {
  background: rgba(250, 173, 20, 0.1);
  color: #faad14;
}

.share-type-tag.scenery {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
}

.share-type-tag.attraction {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.share-time {
  font-size: 11px;
  color: #999;
}

.share-city {
  font-size: 12px;
  color: #667eea;
  margin-bottom: 8px;
}

.share-content {
  font-size: 13px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 12px;
}

.share-images {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.share-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.share-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.delete-btn {
  font-size: 12px;
  color: #ff4d4f;
  background: rgba(255, 77, 79, 0.1);
  padding: 6px 12px;
  border-radius: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.empty-state .empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state .empty-text {
  font-size: 14px;
  color: #999;
}

.feedback-form {
  padding: 16px 20px;
  flex: 1;
  overflow-y: auto;
}

.form-item {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
}

.type-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.type-option {
  font-size: 13px;
  color: #666;
  background: #f5f7fa;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-option.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.form-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
  border: none;
  outline: none;
  resize: none;
  line-height: 1.6;
}

.form-textarea::placeholder {
  color: #999;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.form-input {
  width: 100%;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
  border: none;
  outline: none;
}

.form-input::placeholder {
  color: #999;
}

.submit-feedback-btn {
  margin: 0 20px 20px;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
  flex-shrink: 0;
}

.submit-feedback-btn.disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>