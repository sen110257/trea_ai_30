<template>
  <div class="page share-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <span>←</span>
      </button>
      <h1 class="page-title">美食美景分享</h1>
      <button class="publish-btn" @click="handlePublish">
        <span>📝 发布</span>
      </button>
    </div>

    <div class="tab-header">
      <button 
        v-for="tab in tabs" 
        :key="tab.value" 
        class="tab-item" 
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="activeTab === 'food'" class="content-section">
      <div v-if="foods.length > 0" class="food-list">
        <div 
          v-for="food in foods" 
          :key="food.id" 
          class="food-card card"
        >
          <div class="food-image-wrapper">
            <img 
              v-if="food.image" 
              :src="food.image" 
              :alt="food.name || '美食'"
              class="food-image"
              @error="handleImageError($event)"
            />
            <div v-else class="food-image-placeholder">
              <span>🍜</span>
            </div>
          </div>
          <div class="food-info">
            <h3 class="food-name">{{ food.name || '未知美食' }}</h3>
            <p class="food-desc">{{ food.description || '暂无描述' }}</p>
            <div class="food-actions">
              <button class="action-btn" @click="handleFoodLike(food)">
                <span>{{ foodLiked[food.id] ? '❤️' : '🤍' }}</span>
                <span>{{ formatNumber(foodLiked[food.id] ? (food.likes || 0) + 1 : food.likes) }}</span>
              </button>
              <button class="action-btn" @click="handleFoodComment(food)">
                <span>💬</span>
                <span>评论</span>
              </button>
              <button class="action-btn" @click="handleFoodShare(food)">
                <span>📤</span>
                <span>分享</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty">
        <div class="empty-icon">🍜</div>
        <p class="empty-text">暂无美食数据</p>
      </div>
    </div>

    <div v-if="activeTab === 'scenery'" class="content-section">
      <div v-if="sceneryList.length > 0" class="scenery-grid">
        <div 
          v-for="item in sceneryList" 
          :key="item.id" 
          class="scenery-card card"
        >
          <div class="scenery-image-wrapper">
            <img 
              v-if="item.image" 
              :src="item.image" 
              :alt="item.name || '风景'"
              class="scenery-image"
              @error="handleImageError($event)"
            />
            <div v-else class="scenery-image-placeholder">
              <span>🏞️</span>
            </div>
            <div class="scenery-overlay">
              <h3 class="scenery-name">{{ item.name || '未知风景' }}</h3>
            </div>
          </div>
          <div class="scenery-info">
            <p class="scenery-desc">{{ item.description || '暂无描述' }}</p>
            <div class="scenery-actions">
              <button class="action-icon-btn" @click="handleSceneryLike(item)">
                <span>{{ sceneryLiked[item.id] ? '❤️' : '🤍' }}</span>
                <span>{{ formatNumber(sceneryLiked[item.id] ? (item.likes || 0) + 1 : item.likes) }}</span>
              </button>
              <button class="action-icon-btn" @click="handleSceneryComment(item)">
                <span>💬</span>
              </button>
              <button class="action-icon-btn" @click="handleSceneryShare(item)">
                <span>📤</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty">
        <div class="empty-icon">🏞️</div>
        <p class="empty-text">暂无美景数据</p>
      </div>
    </div>

    <div v-if="activeTab === 'attraction'" class="content-section">
      <div v-if="attractions.length > 0" class="attraction-list">
        <div 
          v-for="attraction in attractions" 
          :key="attraction.id" 
          class="attraction-card card"
        >
          <div class="attraction-content">
            <div class="attraction-image-wrapper">
              <img 
                v-if="attraction.image" 
                :src="attraction.image" 
                :alt="attraction.name || '游玩项目'"
                class="attraction-image"
                @error="handleImageError($event)"
              />
              <div v-else class="attraction-image-placeholder">
                <span>🎡</span>
              </div>
            </div>
            <div class="attraction-info">
              <h3 class="attraction-name">{{ attraction.name || '未知项目' }}</h3>
              <p class="attraction-desc">{{ attraction.description || '暂无描述' }}</p>
              <div class="attraction-meta">
                <span class="meta-tag">推荐</span>
                <button class="like-btn" @click="handleAttractionLike(attraction)">
                  <span>{{ attractionLiked[attraction.id] ? '❤️' : '🤍' }}</span>
                  <span>{{ formatNumber(attractionLiked[attraction.id] ? (attraction.likes || 0) + 1 : attraction.likes) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty">
        <div class="empty-icon">🎡</div>
        <p class="empty-text">暂无游玩推荐</p>
      </div>
    </div>

    <div v-if="showPublishModal" class="publish-modal">
      <div class="publish-content">
        <div class="publish-header">
          <h3 class="publish-title">发布分享</h3>
          <button class="close-btn" @click="showPublishModal = false">✕</button>
        </div>
        
        <div class="publish-form">
          <div class="form-item">
            <label class="form-label">选择城市</label>
            <select v-model="publishForm.cityId" class="form-select">
              <option value="">请选择城市</option>
              <option v-for="city in allCities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>
          
          <div class="form-item">
            <label class="form-label">分享类型</label>
            <div class="type-options">
              <label 
                v-for="type in shareTypes" 
                :key="type.value" 
                class="type-option"
                :class="{ active: publishForm.type === type.value }"
                @click="publishForm.type = type.value"
              >
                <span class="type-icon">{{ type.icon }}</span>
                <span class="type-label">{{ type.label }}</span>
              </label>
            </div>
          </div>
          
          <div class="form-item">
            <label class="form-label">上传照片</label>
            <div class="photo-upload-area">
              <div class="upload-placeholder">
                <span class="upload-icon">📷</span>
                <span class="upload-text">点击上传照片</span>
              </div>
            </div>
          </div>
          
          <div class="form-item">
            <label class="form-label">游玩感受</label>
            <textarea 
              v-model="publishForm.content" 
              class="form-textarea"
              placeholder="分享你的游玩感受和美食推荐..."
              rows="4"
            ></textarea>
          </div>
        </div>
        
        <button class="submit-btn" @click="submitPublish">
          发布分享
        </button>
      </div>
    </div>

    <BottomNav v-if="!showPublishModal" />
    <LoginModal :show="showLoginModal" :message="loginMessage" @update:show="showLoginModal = $event" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  getCityById, 
  getFoodsByCityId, 
  getSceneryByCityId, 
  getAttractionsByCityId,
  getAllCities,
  formatNumber 
} from '../data/mockData'
import { useUserStore } from '../stores'
import BottomNav from '../components/BottomNav.vue'
import LoginModal from '../components/LoginModal.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const tabs = [
  { label: '特色美食', value: 'food' },
  { label: '风景美景', value: 'scenery' },
  { label: '游玩推荐', value: 'attraction' }
]

const shareTypes = [
  { label: '美食', value: 'food', icon: '🍜' },
  { label: '美景', value: 'scenery', icon: '🏞️' },
  { label: '游玩', value: 'attraction', icon: '🎡' }
]

const activeTab = ref('food')
const showLoginModal = ref(false)
const showPublishModal = ref(false)
const loginMessage = ref('')
const foodLiked = ref({})
const sceneryLiked = ref({})
const attractionLiked = ref({})

const publishForm = ref({
  cityId: '',
  type: 'food',
  content: ''
})

const allCities = computed(() => {
  const cities = getAllCities() || []
  return cities.filter(city => city && city.id)
})

const cityId = computed(() => {
  const id = route.params.cityId || route.query.cityId
  return id ? parseInt(id) : null
})

const city = computed(() => {
  if (!cityId.value) return null
  return getCityById(cityId.value)
})

const foods = computed(() => {
  if (cityId.value) {
    const result = getFoodsByCityId(cityId.value) || []
    return result.filter(f => f && f.id)
  }
  return []
})

const sceneryList = computed(() => {
  if (cityId.value) {
    const result = getSceneryByCityId(cityId.value) || []
    return result.filter(s => s && s.id)
  }
  return []
})

const attractions = computed(() => {
  if (cityId.value) {
    const result = getAttractionsByCityId(cityId.value) || []
    return result.filter(a => a && a.id)
  }
  return []
})

onMounted(() => {
  userStore.initFromStorage()
})

const goBack = () => {
  router.back()
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const handlePublish = () => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '发布分享需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  showPublishModal.value = true
}

const handleFoodLike = (food) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '点赞需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  if (!food || !food.id) return
  foodLiked.value[food.id] = !foodLiked.value[food.id]
}

const handleFoodComment = (food) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '发表评论需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  alert(`前往美食「${food.name || ''}」的评论区`)
}

const handleFoodShare = (food) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '分享内容需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  alert(`分享美食「${food.name || ''}」到社交平台`)
}

const handleSceneryLike = (item) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '点赞需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  if (!item || !item.id) return
  sceneryLiked.value[item.id] = !sceneryLiked.value[item.id]
}

const handleSceneryComment = (item) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '发表评论需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  alert(`前往风景「${item.name || ''}」的评论区`)
}

const handleSceneryShare = (item) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '分享内容需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  alert(`分享风景「${item.name || ''}」到社交平台`)
}

const handleAttractionLike = (attraction) => {
  if (!userStore.isLoggedIn) {
    loginMessage.value = '点赞需要登录后才能进行，请先登录。'
    showLoginModal.value = true
    return
  }
  
  if (!attraction || !attraction.id) return
  attractionLiked.value[attraction.id] = !attractionLiked.value[attraction.id]
}

const submitPublish = () => {
  if (!publishForm.value.cityId) {
    alert('请选择城市')
    return
  }
  
  if (!publishForm.value.content || publishForm.value.content.trim() === '') {
    alert('请输入游玩感受')
    return
  }
  
  alert('发布成功！内容已保存到个人记录中')
  showPublishModal.value = false
  publishForm.value = {
    cityId: '',
    type: 'food',
    content: ''
  }
}
</script>

<style scoped>
.share-page {
  padding-bottom: 100px;
}

.page-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  padding-top: calc(12px + env(safe-area-inset-top, 0));
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.back-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.page-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.publish-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
}

.tab-header {
  display: flex;
  background: #fff;
  padding: 0 16px;
  border-bottom: 1px solid #f0f0f0;
}

.tab-item {
  flex: 1;
  padding: 14px 0;
  font-size: 14px;
  color: #999;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
}

.tab-item.active {
  color: #667eea;
  font-weight: 600;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.content-section {
  padding: 16px;
}

.food-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.food-card {
  display: flex;
  overflow: hidden;
}

.food-image-wrapper {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.food-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.food-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.food-info {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.food-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.food-desc {
  font-size: 12px;
  color: #999;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.food-actions {
  display: flex;
  gap: 16px;
}

.food-actions .action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

.scenery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.scenery-card {
  overflow: hidden;
}

.scenery-image-wrapper {
  position: relative;
  width: 100%;
  height: 140px;
  overflow: hidden;
}

.scenery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scenery-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.scenery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  padding: 30px 12px 12px;
}

.scenery-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.scenery-info {
  padding: 12px;
}

.scenery-desc {
  font-size: 12px;
  color: #999;
  line-height: 1.5;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scenery-actions {
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

.attraction-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.attraction-card {
  overflow: hidden;
}

.attraction-content {
  display: flex;
  padding: 12px;
}

.attraction-image-wrapper {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
}

.attraction-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.attraction-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.attraction-info {
  flex: 1;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.attraction-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.attraction-desc {
  font-size: 12px;
  color: #999;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.attraction-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.meta-tag {
  font-size: 11px;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 10px;
  border-radius: 10px;
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

.publish-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: flex-end;
}

.publish-content {
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  background: #fff;
  border-radius: 24px 24px 0 0;
  padding: 20px;
  padding-bottom: calc(20px + env(safe-area-inset-bottom, 0));
  max-height: 90vh;
  overflow-y: auto;
}

.publish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.publish-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
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

.form-select {
  width: 100%;
  padding: 12px 16px;
  background: #f5f7fa;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
  border: none;
  outline: none;
}

.type-options {
  display: flex;
  gap: 12px;
}

.type-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.type-option.active {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
}

.type-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.type-label {
  font-size: 13px;
  color: #666;
}

.type-option.active .type-label {
  color: #667eea;
  font-weight: 500;
}

.photo-upload-area {
  width: 100%;
  height: 120px;
  background: #f5f7fa;
  border-radius: 12px;
  border: 2px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;
}

.upload-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 13px;
}

.form-textarea {
  width: 100%;
  padding: 12px 16px;
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

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 20px;
}
</style>