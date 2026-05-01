import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CityFilter from '../views/CityFilter.vue'
import CityDetail from '../views/CityDetail.vue'
import MyCities from '../views/MyCities.vue'
import SharePage from '../views/SharePage.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/city-filter',
    name: 'CityFilter',
    component: CityFilter,
    meta: { title: '城市筛选' }
  },
  {
    path: '/city-detail/:cityId',
    name: 'CityDetail',
    component: CityDetail,
    meta: { title: '城市详情' }
  },
  {
    path: '/my-cities',
    name: 'MyCities',
    component: MyCities,
    meta: { title: '我去过的城市' }
  },
  {
    path: '/share/:cityId?',
    name: 'SharePage',
    component: SharePage,
    meta: { title: '分享' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { title: '个人中心' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '城市地标打卡图鉴'
  next()
})

export default router