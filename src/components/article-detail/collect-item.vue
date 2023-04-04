<template>
  <van-icon
    :class="{ collected: article.is_collected }"
    class="collect"
    :name="article.is_collected ? 'star' : 'star-o'"
    @click="onCollect"
  />
</template>

<script>
import { showNotify } from 'vant'
import { setCollect, cancelCollect } from '@/api/user'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    async onCollect() {
      if (this.user) {
        // 先判断有没有用户信息，如果没有，提示未登录
        try {
          if (this.article.is_collected) {
            await cancelCollect(this.article.art_id)
            this.$emit('collect', false)
          } else {
            await setCollect(this.article.art_id)
            this.$emit('collect', true)
          }
        } catch (err) {
          showNotify({ type: 'danger', message: '收藏失败，稍后重试' })
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
.collect {
  color: #777777;
}

.collected {
  color: #ffc53c;
}
</style>
