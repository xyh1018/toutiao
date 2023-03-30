<template>
  <van-cell-group>
    <van-cell :to="`/article/${article.art_id}`">
      <template #title>
        <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
      </template>
      <template #label>
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <img class="article-img" v-for="(item, index) in article.cover.images" :key="index" :src="item" />
        </div>
        <div class="article-label-text">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}</span>
          <span>{{ time }}</span>
        </div>
      </template>
      <template #default>
        <van-image fit="cover" class="right-img" v-if="article.cover.type === 1" :src="article.cover.images[0]" />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
import { dayjs } from '@/utils/dayjs'
export default {
  name: 'ArticleItem',
  data() {
    return {

    }
  },
  computed: {
    time() {
      return dayjs(this.article.pubdate).fromNow()
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
.cover-wrap {
  display: flex;
  padding: 10px 0 30px 0;
}

.title {
  font-size: 30px;
  color: #3a3a3a;
  flex: 2;
  padding-bottom: 10px;
}

.article-img {
  width: 100px;
  height: 146px;
  flex: 1;
  padding-right: 4px;

  &:last-child {
    padding-right: 0px;
  }
}

.right-img {
  width: 232px;
  height: 146px;
}

.article-label-text span {
  font-size: 22px;
  color: #b4b4b4;
}

.article-label-text span:nth-child(2) {
  margin: 0 16px;
}

.article-label-text {
  flex: 1;
}
</style>
