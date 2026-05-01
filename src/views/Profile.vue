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
        <div class="stat-item">
          <span class="stat-value">{{ myShares }}</span>
          <span class="stat-label">我的分享</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ browsingHistory.length }}</span>
          <span class="stat-label">浏览历史</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ favorites.length }}</span>
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
        <div class="menu-item card" @click="handleFeedback">
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
const myShares = ref(0)

onMounted(() => {
  userStore.initFromStorage()
  cityStore.initFromStorage()
})

const visitedCityIds = computed(() => {
  const ids = cityStore.getVisitedCities() || []
  return ids.filter(id => id && !isNaN(parseInt(id))).map(id => parseInt(id))
})

const visitedCount = computed(() => visitedCityIds.value.length)

const browsingHistory = computed(() => {
  const ids = cityStore.browsingHistory || []
  return ids.filter(id => id && !isNaN(parseInt(id))).map(id => parseInt(id))
})

const favorites = computed(() => {
  const ids = cityStore.favorites || []
  return ids.filter(id => id && !isNaN(parseInt(id))).map(id => parseInt(id))
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
  alert('浏览历史功能：展示最近浏览过的城市列表')
}

const goToFavorites = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '查看我的收藏需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  alert('我的收藏功能：展示收藏的城市和地标')
}

const goToMyShares = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '查看我的分享需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  alert('我的分享功能：展示我发布的所有游玩分享')
}

const handleFeedback = () => {
  alert('意见反馈功能：可输入反馈内容和联系方式')
}

const handleAbout = () => {
  alert('关于我们：\n城市地标打卡图鉴 v1.0.0\n\n这是一款专注于城市旅行打卡的应用，帮助用户记录旅行足迹，发现更多美好城市。')
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
</style>