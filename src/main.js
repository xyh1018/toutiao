import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // vant核心组件库

// 引入全局样式文件
import './styles/index.scss'
import 'vant/lib/index.css'// vant全局样式
import 'amfe-flexible' // 动态设置REM基准值

const app = createApp(App)
app.use(Vant)
app.use(store)
app.use(router)
app.mount('#app')
