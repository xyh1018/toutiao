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
      // 把token数据存储到state
      state.user = data
      // 把数据备份到本地存储中
      setItem(TOKEN_KEY, state.user)
      // 登陆之后，token会被存放到本地存储中
      // 之前的state数据会在退出网页时被销毁
      // 当刷新网页或者重新进入时，state可以直接向本地存储拿取token
    }
  },
  actions: {
  },
  modules: {
  }
})
