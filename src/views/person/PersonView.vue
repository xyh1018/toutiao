<template>
  <!-- 未登陆视图 -->
  <div
    v-if="!user"
    class="person-img"
  >
    <div
      class="person-img-login"
      @click="$router.push('/login')"
    >
      <img
        src="../../assets/mobile.png"
        alt=""
        class="login-btn"
      />
      <span class="text">登陆 / 注册</span>
    </div>
  </div>
  <!-- 登陆后视图 -->
  <div
    v-else
    class="logined-img"
  >
    <div class="user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="left-img"
            round
            cover
            :src="userInfo.photo"
          />
          <span class="left-text">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button
            class="right-btn"
            @click="$router.push('/person/profile')"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="data-info">
        <div class="data-toutiao data-item">
          <span class="num">{{ userInfo.art_count }}</span>
          <span class="name">头条</span>
        </div>
        <div class="data-guanzhu data-item">
          <span class="num">{{ userInfo.follow_count }}</span>
          <span class="name">关注</span>
        </div>
        <div class="data-fensi data-item">
          <span class="num">{{ userInfo.fans_count }}</span>
          <span class="name">粉丝</span>
        </div>
        <div class="data-huozan data-item">
          <span class="num">{{ userInfo.like_count }}</span>
          <span class="name">获赞</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 收藏&历史 -->
  <van-grid
    :column-num="2"
    clickable
  >
    <van-grid-item
      class="grid-item"
      icon="photo-o"
      text="收藏"
      @click="collect"
    >
      <template #icon>
        <i class="toutiao toutiao-shoucang"></i>
      </template>
    </van-grid-item>
    <van-grid-item
      class="grid-item"
      icon="photo-o"
      text="历史"
      @click="history"
    >
      <template #icon>
        <i class="toutiao toutiao-lishi"></i>
      </template>
    </van-grid-item>
  </van-grid>
  <!-- 通知 -->
  <van-cell
    title="消息通知"
    is-link
  />
  <van-cell
    title="小智同学"
    is-link
    @click="onShowChat"
  />
  <van-cell
    title="退出登陆"
    class="login-out"
    @click="onLogOut"
    v-if="user"
    clickable=""
  />
  <!-- 收藏&历史弹窗 -->
  <van-popup
    v-model:show="showCollect"
    position="bottom"
    :style="{ height: '100%' }"
  >
    <collectItem
      v-if="showCollect"
      :number="number"
      @close="showCollect = false"
    ></collectItem>
  </van-popup>
  <!-- 机器人聊天弹窗 -->
  <van-popup
    v-model:show="showChat"
    position="bottom"
    :style="{ height: '100%' }"
  >
    <chatItem
      v-if="showChat"
      @close="showChat = close"
    ></chatItem>
  </van-popup>
</template>

<script>
import { mapState } from 'vuex'
import { showConfirmDialog, showNotify } from 'vant'
import { getUserInfo } from '@/api/user'
import collectItem from './component/collect-item.vue'
import chatItem from './component/chat-item.vue'
export default {
  data() {
    return {
      userInfo: {}, // 用户信息
      showCollect: false,
      number: 0,
      showChat: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogOut() {
      showConfirmDialog({
        title: '是否要退出登陆？',
        message: ''
      })
        .then(() => {
          // 确认退出登陆，把null赋值给本地存储和state
          this.$store.commit('setUser', null)
          console.log('已删除TOKEN')
        })
        .catch(() => {
          showNotify({
            type: 'primary',
            message: '登陆已取消',
            duration: 800
          })
        })
    },
    async loadUserInfo() {
      try {
        const {
          data: { data }
        } = await getUserInfo()
        console.log('获取用户数据成功', data)
        this.userInfo = data
      } catch (err) {
        console.log('获取用户信息失败', err)
      }
    },
    collect() {
      this.showCollect = true
      this.number = 0
    },
    history() {
      this.showCollect = true
      this.number = 1
    },
    onShowChat() {
      if (this.user) {
        this.showChat = true
      } else {
        showNotify({
          type: 'danger',
          message: '账号未登录！',
          duration: 800
        })
      }
    }
  },
  created() {
    // 如果用户登陆了则请求用户数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  activated() {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  components: {
    collectItem,
    chatItem
  }
}
</script>

<style lang="scss" scoped>
.person-img {
  height: 361px;
  background-image: url('@/assets/banner.png');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .person-img-login {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .login-btn {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }

    .text {
      font-size: 28px;
      color: white;
    }
  }
}

.logined-img {
  height: 361px;
  background-image: url('@/assets/banner.png');
  background-size: cover;

  .user-info {
    .base-info {
      height: 231px;
      display: flex;
      padding: 0 32px;

      .left {
        display: flex;
        align-items: center;
        flex-grow: 1;

        .left-img {
          width: 133px;
          height: 133px;
          margin-right: 22px;
          border: 4px solid #fff;
        }

        .left-text {
          font-size: 32px;
          color: white;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .right-btn {
          display: flex;
          font-size: 20px;
          color: #5a5a5a;
          height: 46px;
          border: none;
          border-radius: 23px;
        }
      }
    }

    .data-info {
      height: 130px;
      color: white;
      display: flex;
      align-items: center;

      .data-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;

        .num {
          font-size: 36px;
        }

        .name {
          font-size: 23px;
        }
      }
    }
  }
}

.grid-item {
  .toutiao {
    font-size: 45px;
  }

  .toutiao-shoucang {
    color: red;
  }

  .toutiao-lishi {
    color: orange;
  }
}

.login-out {
  text-align: center;
  color: #d86262;
  font-size: 30px;
  margin-top: 10px;
}
</style>
