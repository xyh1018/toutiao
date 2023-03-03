import { createStore } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
const TOKEN_KEY = 'TOUTIAO_USER'
export default createStore({
  state: {
    // user 是一个对象，存储当前登陆用户信息
    user: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 把数据备份到本地存储中
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
