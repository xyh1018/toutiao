<template>
  <van-icon :class="{liked:article.attitude === 1}" class="like" :name="article.attitude === -1 ? 'good-job-o' : 'good-job'" @click="onlike" />
</template>

<script>
import { showNotify } from 'vant'
import { setLike, cancelLike } from '@/api/user'
export default {
  data() {
    return {

    }
  },
  methods: {
    async onlike() {
      try {
        if (this.article.attitude === -1) {
          await setLike(this.article.art_id)
          this.$emit('like', 1)
          console.log('111')
        } else {
          await cancelLike(this.article.art_id)
          this.$emit('like', -1)
          console.log('000')
        }
      } catch (err) {
        showNotify({ type: 'danger', message: '操作失败' })
      }
    }
  },
  props: {
    article: {
      type: Object,
      required: true
    }
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
