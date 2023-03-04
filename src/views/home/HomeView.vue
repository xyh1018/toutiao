<template>
  <div class="home-container">
    <!-- 搜索框 -->
    <van-nav-bar class="home-top-nav" fixed>
      <template #title>
        <van-button class="home-top-nav__button" type="primary" size="small" icon="search" color="#6ea9f4"
          round="">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="van-tab-container" v-model:acthanbao-btnive="active" swipeable animated>
      <van-tab v-for="(item) in channels" :title="item.name" :key="item.id">
        <!-- 频道内容 -->
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <template #nav-right>
        <van-icon name="wap-nav" class="hanbao-btn" />
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
export default {
  data() {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  methods: {
    async loadChannels() {
      try {
        const { data: { data } } = await getUserChannels()
        this.channels = data.channels
        console.log('频道列表', this.channels)
      } catch (err) {
        console.log('频道列表', err)
      }
    }
  },
  computed: {

  },
  components: {
    ArticleList
  },
  created() {
    this.loadChannels()
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding-top: 184px;
  .home-top-nav {
  background-color: #1989fa;

  .home-top-nav__button {
    width: 555px;
    height: 64px;
  }
}

.hanbao-btn {
  position: fixed;
  right: 0;
  line-height: 82px;
  font-size: 46px;
  background-color: white;
  opacity: 0.8;
}
}
</style>
