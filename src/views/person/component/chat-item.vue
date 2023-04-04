<template>
  <div
    class="chat"
    ref="chat"
  >
    <!-- 导航栏 -->
    <van-nav-bar
      class="collect-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="onLeft"
    />

    <!-- 聊天内容列表 -->
    <van-list class="list">
      <van-cell
        v-for="(item, index) in messageList"
        :key="index"
        :title="item.msg"
      />
    </van-list>

    <!-- 输入栏 -->
    <van-field
      class="input"
      v-model="message"
      center
      clearable
      placeholder="请输入信息"
    >
      <template #button>
        <van-button
          size="normal"
          type="primary"
          @click="onSend"
          >发送</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
import { io } from 'socket.io-client'

export default {
  data() {
    return {
      message: '', // 输入框内的数据
      socket: null, // socke实例
      messageList: [{ msg: '你好，我是小智🥳' }] // 互相发送的信息存储数组
    }
  },
  methods: {
    onSend() {
      // 将要发送的数据内容
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      // 向服务器发送信息
      this.socket.emit('message', data)
      // 将输入的内容放到数组里
      this.messageList.push(data)
      // 将输入框内清空
      this.message = ''
    },
    scrollToBottom() {
      // 获取滚动容器 -> chat
      const chat = this.$refs.chat
      // 将chat.scrollTop设置为scrollHeight
      chat.scrollTop = chat.scrollHeight
      console.log(chat.scrollTop)
    },
    onLeft() {
      this.$emit('close')
      // 点击返回按钮，关闭socket服务
      this.socket.close()
    }
  },
  watch: {
    messageList: {
      handler(val, oldVal) {
        // nextTick立即更新dom
        this.$nextTick(() => {
          // 当messageList改变调用scrollToBottom函数
          this.scrollToBottom()
        })
      },
      // 深层侦听 messageList
      deep: true
    }
  },
  computed: {
    token() {
      // 获取用户token
      return this.$store.state.user.token
    }
  },
  created() {
    // 与服务器建立连接
    const socket = io('http://toutiao.itheima.net', {
      query: {
        token: this.token
      },
      transports: ['websocket']
    })
    this.socket = socket
    // 监听事件
    socket.on('connect', () => {
      console.log('连接成功')
    })
    socket.on('disconnect', () => {
      console.log('断开连接')
    })
    // 当服务端回应时会触发 message 事件
    socket.on('message', (data) => {
      // 将服务端发送的数据添加到数组
      this.messageList.push(data)
    })
  }
}
</script>

<style lang="scss" scoped>
.collect-nav-bar {
  background-color: #1989fa;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.chat {
  background-color: #f5f7f9;
  height: 100vh;
  overflow: scroll;
}

.input {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #f0f0f0;

  .van-field__value {
    background-color: white;
  }
}

.list {
  padding-bottom: 150px;
  padding-top: 100px;
  overflow: auto;
}
</style>
