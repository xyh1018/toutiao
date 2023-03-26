<template>
  <!-- 导航栏 -->
  <van-nav-bar class="top-van-nav-bar" title="登陆" left-text="返回" left-arrow @click-left="onClickLeft" />
  <!-- 提交表单 -->
  <van-form @submit="onSubmit" ref="loginForm">
    <van-cell-group inset>
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" type="number" maxlength="11"
        :rules="userFormRules.mobile">
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field v-model="user.code" name="code" placeholder="请输入验证码" type="number" maxlength="6"
        :rules="userFormRules.code">
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <!-- 倒计时组件 -->
          <van-count-down v-if="isCountDownShow" :time="1000 * 15" format="ss s" @finish="isCountDownShow = false" />
          <!-- 发送验证码组件 -->
          <van-button v-else class="send-sms-btn" size="small" type="primary" @click="onSendSms" round>发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <!-- 隐私条款 -->
  <div class="yinsi-btn" @click="wanNengSms">
    隐私条款
  </div>
</template>

<script>
import { showSuccessToast, showFailToast, showLoadingToast, showNotify } from 'vant'
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginView',
  data() {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: { // form表单规则
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  methods: {
    // 登陆按钮点击事件
    async onSubmit() {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      // Toast 默认采用单例模式，即同一时间只会存在一个 Toast,
      // 所以当请求 成功/失败 时，成功/失败弹窗弹出，加载中弹窗会立刻消失。
      // 请求登陆
      try {
        const { data } = await login(this.user)
        console.log(data)
        this.$store.commit('setUser', data.data)
        showSuccessToast({
          type: 'success',
          message: '登陆成功',
          closeOnClickOverlay: true,
          closeOnClick: true,
          duration: 800
        })
        // 登陆成功跳转
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          showFailToast('手机号或验证码错误')
        } else {
          showFailToast('登录失败，请稍后重试')
        }
      }
    },
    // 验证码点击事件
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate('mobile')
        // validate方法可以验证表单，支持传入一个或多个 name属性 来验证单个或部分表单项，不传入 name 时，会验证所有表单项
      } catch (err) {
        return console.log(err)
      }

      try {
        const res = await sendSms(this.user.mobile)
        this.isCountDownShow = true
        console.log('验证码发送成功', res)
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          showNotify('验证码发送频繁')
        } else {
          showFailToast('发送失败，请稍后重试')
        }
      }
    },
    // 返回按钮
    onClickLeft() {
      history.back()
    },
    // 万能验证码
    wanNengSms() {
      showNotify({
        type: 'success',
        message: '万能验证码：246810'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-van-nav-bar {
  background-color: #1989fa;
}

.toutiao {
  font-size: 38px;
}

.send-sms-btn {
  background-color: #ededed;
  width: 152px;
  height: 46px;
  border: none;
  line-height: 46px;
  color: rgb(121, 121, 121);
}

.yinsi-btn {
  font-size: 28px;
  color: #666767;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%);
}

.van-cell-group--inset {
  margin: 0;
}

.van-field__control {
  background-color: none;
}
</style>
