<template>
  <van-cell :to="`/article/${article.art_id}`">
    <template #title>
      <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    </template>
    <template #label>
      <div class="article-label-text">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.article-label-text {
  display: flex;

  span {
    padding-right: 30px;
  }
}
</style>
