<template>
  <div v-if="show" class="mask" @click.stop>
    <div class="modal" @click.stop>
      <h3 class="modal-title">温馨提示</h3>
      <p class="modal-content">
        {{ message }}
      </p>
      <div class="modal-actions">
        <button class="modal-btn cancel" @click="handleCancel">取消</button>
        <button class="modal-btn confirm" @click="handleLogin">去登录</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: '该功能需要登录后才能使用，请先登录。'
  }
})

const emit = defineEmits(['update:show', 'close'])

const router = useRouter()
const appStore = useAppStore()

const handleCancel = () => {
  emit('update:show', false)
  emit('close')
  appStore.closeLoginModal()
}

const handleLogin = () => {
  emit('update:show', false)
  emit('close')
  appStore.closeLoginModal()
  router.push('/profile')
}
</script>

<style scoped>
</style>