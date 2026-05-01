<template>
  <div v-if="show" class="comment-modal-mask" @click.self="handleClose">
    <div class="comment-modal-content">
      <div class="comment-modal-header">
        <h3 class="comment-modal-title">发表评论</h3>
        <button class="comment-modal-close" @click="handleClose">
            ✕</button>
      </div>
      
      <div class="comment-input-area">
        <textarea 
          v-model="commentText"
          class="comment-textarea"
          placeholder="说点什么..."
          rows="4"
          @focus="ensureLoggedIn"
        ></textarea>
      </div>
      
      <div class="comment-actions-row">
        <div class="action-left">
          <button class="action-btn" @click="toggleEmojiPanel">
            <span>😊</span>
          </button>
          <button class="action-btn" @click="handleImageUpload">
            <span>📷</span>
          </button>
        </div>
        <div class="char-count">
          <span :class="{ warning: isTextTooLong }">{{ commentText.length }}/200</span>
        </div>
      </div>
      
      <div v-if="showEmojiPanel" class="emoji-panel">
        <div class="emoji-grid">
          <span 
            v-for="emoji in emojis" 
            :key="emoji" 
            class="emoji-item" 
            @click="insertEmoji(emoji)"
          >{{ emoji }}</span>
        </div>
      </div>
      
      <div v-if="selectedImages.length > 0" class="image-preview-area">
        <div class="image-preview-list">
          <div 
            v-for="(img, index) in selectedImages" 
            :key="index" 
            class="image-preview-item">
            <img :src="img" class="preview-image" />
            <button class="remove-image-btn" @click="removeImage(index)">✕</button>
          </div>
        </div>
      </div>
      
      <div class="comment-modal-footer">
        <button class="cancel-btn" @click="handleClose">取消</button>
        <button 
          class="submit-btn" 
          :class="{ disabled: !canSubmit }"
          @click="handleSubmit"
          :disabled="!canSubmit"
        >
          发布
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '../stores'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  targetId: {
    type: [Number, String],
    default: null
  },
  targetType: {
    type: String,
    default: 'city'
  },
  targetName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:show', 'submit', 'close', 'needLogin'])

const userStore = useUserStore()

const commentText = ref('')
const selectedImages = ref([])
const showEmojiPanel = ref(false)

const emojis = [
  '😀', '😂', '🤣', '😊', '😍', '🤔', '😎', '🥳',
  '😢', '😡', '👏', '👍', '👎', '❤️', '🔥', '✨',
  '🎉', '🏆', '🌟', '💯', '🙏', '🌹', '🍜', '🏖️',
  '🏔️', '🌸', '🌈', '☀️', '🌙', '⭐', '🎁', '🎊'
]

const canSubmit = computed(() => {
  return commentText.value.trim().length > 0 || selectedImages.value.length > 0
})

const isTextTooLong = computed(() => {
  return commentText.value.length > 200
})

const ensureLoggedIn = () => {
  if (!userStore.isLoggedIn) {
    emit('needLogin')
  }
}

const toggleEmojiPanel = () => {
  if (!userStore.isLoggedIn) {
    emit('needLogin')
    return
  }
  showEmojiPanel.value = !showEmojiPanel.value
}

const insertEmoji = (emoji) => {
  if (!userStore.isLoggedIn) {
    emit('needLogin')
    return
  }
  commentText.value += emoji
  showEmojiPanel.value = false
}

const handleImageUpload = () => {
  if (!userStore.isLoggedIn) {
    emit('needLogin')
    return
  }
  
  const sampleImages = [
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20travel%20scenery%20photo&image_size=square',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20food%20photography&image_size=square',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=city%20landmark%20night%20view&image_size=square'
  ]
  
  const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)]
  if (selectedImages.value.length < 9) {
    selectedImages.value.push(randomImage)
  }
}

const removeImage = (index) => {
  selectedImages.value.splice(index, 1)
}

const handleClose = () => {
  emit('update:show', false)
  emit('close')
  setTimeout(() => {
    commentText.value = ''
    selectedImages.value = []
    showEmojiPanel.value = false
  }, 300)
}

const handleSubmit = () => {
  if (!userStore.isLoggedIn) {
    emit('needLogin')
    return
  }
  
  if (!canSubmit.value) return
  
  const commentData = {
    id: Date.now(),
    targetId: props.targetId,
    targetType: props.targetType,
    userId: userStore.userInfo.id || 1,
    userName: userStore.userInfo.nickname || '旅行者',
    userAvatar: userStore.userInfo.avatar || '',
    content: commentText.value,
    images: [...selectedImages.value],
    likes: 0,
    createdAt: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-')
  }
  
  emit('submit', commentData)
  handleClose()
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    commentText.value = ''
    selectedImages.value = []
    showEmojiPanel.value = false
  }
})
</script>

<style scoped>
.comment-modal-mask {
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

.comment-modal-content {
  background: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom);
}

.comment-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.comment-modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.comment-modal-close {
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

.comment-input-area {
  padding: 16px 20px;
}

.comment-textarea {
  width: 100%;
  min-height: 100px;
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

.comment-textarea::placeholder {
  color: #999;
}

.comment-actions-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 12px;
}

.action-left {
  display: flex;
  gap: 16px;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.char-count {
  font-size: 12px;
  color: #999;
}

.char-count .warning {
  color: #ff4d4f;
}

.emoji-panel {
  padding: 12px 20px;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
}

.emoji-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.emoji-item {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
}

.emoji-item:active {
  background: #e4e8ec;
}

.image-preview-area {
  padding: 0 20px 12px;
}

.image-preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.image-preview-item {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #fff;
}

.comment-modal-footer {
  display: flex;
  gap: 12px;
  padding: 12px 20px 20px;
  border-top: 1px solid #f0f0f0;
}

.cancel-btn {
  flex: 1;
  padding: 14px;
  background: #f5f7fa;
  color: #666;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
}

.submit-btn {
  flex: 1;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
}

.submit-btn.disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>