<template>
  <van-nav-bar class="nav-bar" title="设置昵称" right-text="完成" left-arrow @click-right="ok" @click-left="$emit('close')" />
  <van-cell-group inset>
    <van-field class="field" v-model="message" rows="3" autosize type="textarea" maxlength="7" placeholder="请输入昵称"
      show-word-limit />
  </van-cell-group>
</template>

<script>

export default {
  data() {
    return {
      message: ''
    }
  },
  emits: ['close', 'nameOk'],
  methods: {
    ok() {
      // 点击完成按钮，触发自定义事件->ok，并把message传递给父组件
      this.$emit('nameOk', this.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  margin-bottom: 30px;
}
</style>
