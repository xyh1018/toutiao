<template>
  <van-button
    :loading="loadingStatus"
    v-if="isFollowed.is_followed"
    class="follow-btn"
    round
    size="small"
    @click="onCancel"
    >已关注</van-button
  >
  <van-button
    :loading="loadingStatus"
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { followUser, cancelFollow } from '@/api/user'
import { showNotify } from 'vant'

export default {
  data() {
    return {
      loadingStatus: false
    }
  },
  methods: {
    async onFollow() {
      try {
        this.loadingStatus = true
        await followUser(this.isFollowed.aut_id)
        this.$emit('updataFollow', true)
      } catch (err) {
        showNotify({ type: 'danger', message: '关注用户失败,稍后重试' })
      }
      this.loadingStatus = false
    },
    async onCancel() {
      try {
        this.loadingStatus = true
        await cancelFollow(this.isFollowed.aut_id)
        this.$emit('updataFollow', false)
      } catch (err) {
        showNotify({ type: 'danger', message: '操作失败' })
      }
      this.loadingStatus = false
    }
  },
  props: {
    isFollowed: {
      type: Object,
      required: true
    }
  }
}
</script>
