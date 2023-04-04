<template>
  <van-icon
    :class="{ liked: article.attitude === 1 }"
    class="like"
    :name="article.attitude === -1 ? 'good-job-o' : 'good-job'"
    @click="onlike"
  />
</template>

<script>
import { showNotify } from 'vant'
import { setLike, cancelLike } from '@/api/user'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    async onlike() {
      if (this.user) {
        // 先判断有没有用户信息，如果没有，提示未登录
        try {
          if (this.article.attitude === -1) {
            await setLike(this.article.art_id)
            this.$emit('like', 1)
          } else {
            await cancelLike(this.article.art_id)
            this.$emit('like', -1)
          }
        } catch (err) {
          console.log(err)
          showNotify({ type: 'danger', message: '点赞失败，稍后重试' })
        }
      } else {
        showNotify({ type: 'danger', message: '未登录，请登录后再试' })
      }
    }
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.like {
  color: #777777;
}
.liked {
  color: #e5645f;
}
</style>
