<template>
  <div>
    <van-nav-bar
      class="collect-nav-bar"
      title="收藏/历史"
      left-arrow
      @click-left="$emit('close')"
    />
    <van-tabs
      v-model:active="active"
      animated
    >
      <van-tab title="收藏">
        <van-empty
          v-if="!collectList.length"
          description="啥也没有"
        />
        <ArticleItem
          v-else
          v-for="item in collectList"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-tab>
      <van-tab title="历史">
        <van-empty
          v-if="!historyList.length"
          description="啥也没有"
        />
        <ArticleItem
          v-for="item in historyList"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArticleItem from './article-item.vue'
import { getUserCollect, getUserHistory } from '@/api/user'
export default {
  data() {
    return {
      active: this.number,
      collectList: [],
      historyList: []
    }
  },
  methods: {
    async loadCollect() {
      try {
        const {
          data: { data }
        } = await getUserCollect()
        this.collectList = data.results
      } catch (err) {
        console.log(err)
      }
    },
    async loadHistory() {
      try {
        const {
          data: { data }
        } = await getUserHistory()
        this.historyList = data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    ArticleItem
  },
  props: ['number'],
  created() {
    this.loadCollect()
    this.loadHistory()
  }
}
</script>

<style lang="scss" scoped>
.collect-nav-bar {
  background-color: #1989fa;
}
</style>
