<template>
  <div class="home-container">
    <!-- 搜索框 -->
    <van-nav-bar class="home-top-nav" fixed>
      <template #title>
        <van-button class="home-top-nav__button" to="/search" type="primary" size="small" icon="search" color="#6ea9f4"
          round="">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="van-tab-container" v-model:active="active" swipeable animated>
      <van-tab v-for="(item) in channels" :title="item.name" :key="item.id">
        <!-- 频道内容 -->
          <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <template #nav-right>
        <!-- 汉堡按钮 -->
        <van-icon @click="show = true" name="wap-nav" class="hanbao-btn" />
      </template>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup v-model:show="show" closeable close-icon-position="top-left" position="bottom" :style="{ height: '100%' }">
      <ChannelEdit @update-active="onUpDateActive" :channelsToEdit="channels" :active="active"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      show: false // 控制弹出层是否展示
    }
  },
  methods: {
    async loadChannels() {
      try {
        if (this.user) {
          const { data: { data } } = await getUserChannels()
          this.channels = data.channels
        } else {
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            this.channels = localChannels
          } else {
            const { data: { data } } = await getUserChannels()
            this.channels = data.channels
          }
        }
        console.log('频道列表', this.channels)
      } catch (err) {
        console.log('频道列表', err)
      }
    },
    onUpDateActive(index, show = true) {
      this.active = index
      this.show = show
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    ArticleList,
    ChannelEdit
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
