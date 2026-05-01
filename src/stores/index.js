import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const userInfo = ref({
    id: null,
    nickname: '',
    avatar: ''
  })

  const checkLogin = computed(() => isLoggedIn.value)

  function login(user = {}) {
    isLoggedIn.value = true
    userInfo.value = {
      id: user.id || 1,
      nickname: user.nickname || '旅行者',
      avatar: user.avatar || ''
    }
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    localStorage.setItem('isLoggedIn', 'true')
  }

  function logout() {
    isLoggedIn.value = false
    userInfo.value = { id: null, nickname: '', avatar: '' }
    localStorage.removeItem('userInfo')
    localStorage.removeItem('isLoggedIn')
  }

  function initFromStorage() {
    const storedUserInfo = localStorage.getItem('userInfo')
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn')
    
    if (storedUserInfo && storedIsLoggedIn === 'true') {
      isLoggedIn.value = true
      userInfo.value = JSON.parse(storedUserInfo)
    }
  }

  return {
    isLoggedIn,
    userInfo,
    checkLogin,
    login,
    logout,
    initFromStorage
  }
})

export const useCityStore = defineStore('city', () => {
  const visitedCities = ref([])
  const browsingHistory = ref([])
  const favorites = ref([])

  function getVisitedCities() {
    return visitedCities.value
  }

  function isCityVisited(cityId) {
    return visitedCities.value.includes(cityId)
  }

  function visitCity(cityId) {
    if (!isCityVisited(cityId)) {
      visitedCities.value.push(cityId)
      localStorage.setItem('visitedCities', JSON.stringify(visitedCities.value))
    }
  }

  function removeVisitedCity(cityId) {
    const index = visitedCities.value.indexOf(cityId)
    if (index > -1) {
      visitedCities.value.splice(index, 1)
      localStorage.setItem('visitedCities', JSON.stringify(visitedCities.value))
    }
  }

  function addToBrowsingHistory(cityId) {
    const index = browsingHistory.value.indexOf(cityId)
    if (index > -1) {
      browsingHistory.value.splice(index, 1)
    }
    browsingHistory.value.unshift(cityId)
    if (browsingHistory.value.length > 20) {
      browsingHistory.value = browsingHistory.value.slice(0, 20)
    }
    localStorage.setItem('browsingHistory', JSON.stringify(browsingHistory.value))
  }

  function toggleFavorite(cityId) {
    const index = favorites.value.indexOf(cityId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(cityId)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function isFavorite(cityId) {
    return favorites.value.includes(cityId)
  }

  function initFromStorage() {
    const storedVisitedCities = localStorage.getItem('visitedCities')
    const storedBrowsingHistory = localStorage.getItem('browsingHistory')
    const storedFavorites = localStorage.getItem('favorites')

    if (storedVisitedCities) {
      visitedCities.value = JSON.parse(storedVisitedCities)
    }
    if (storedBrowsingHistory) {
      browsingHistory.value = JSON.parse(storedBrowsingHistory)
    }
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites)
    }
  }

  return {
    visitedCities,
    browsingHistory,
    favorites,
    getVisitedCities,
    isCityVisited,
    visitCity,
    removeVisitedCity,
    addToBrowsingHistory,
    toggleFavorite,
    isFavorite,
    initFromStorage
  }
})

export const useAppStore = defineStore('app', () => {
  const showLoginModal = ref(false)

  function openLoginModal() {
    showLoginModal.value = true
  }

  function closeLoginModal() {
    showLoginModal.value = false
  }

  return {
    showLoginModal,
    openLoginModal,
    closeLoginModal
  }
})