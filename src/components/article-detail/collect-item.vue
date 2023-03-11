<template>
  <van-icon :class="{ collected: article.is_collected }" class="collect" :name="article.is_collected ? 'star' : 'star-o'"
    @click="onCollect" />
</template>

<script>
import { showNotify } from 'vant'
import { setCollect, cancelCollect } from '@/api/user'
export default {
  data() {
    return {

    }
  },
  methods: {
    async onCollect() {
      try {
        if (this.article.is_collected) {
          await cancelCollect(this.article.art_id)
          this.$emit('collect', false)
        } else {
          await setCollect(this.article.art_id)
          this.$emit('collect', true)
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
.collect {
  color: #777777;
}

.collected {
  color: #ffc53c;
}
</style>
