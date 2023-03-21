<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh v-model="refreshloading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" v-model:error="error"
        error-text="请求失败，点击重新加载" @load="onLoad">
        <ArticleItem :article="item" v-for="item in list" :key="item.art_id"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/user'
import ArticleItem from '@/components/article-item/articleItem.vue'
import { debounce } from 'lodash'

export default {
  name: 'ArticleList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshloading: false,
      refreshSuccessText: '刷新成功',
      scrollTop: 0
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 获取文章数据
    async onLoad() {
      try {
        const { data: { data } } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        this.list.push(...data.results)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (data.results.length) {
          // 如果获取到的数组有内容，则继续加载
          // 时间戳就相当于页码，每次请求获得的数据中都包含有新的时间戳
          this.timestamp = data.pre_timestamp
        } else {
          // 如果data.results长度为0，则停止加载
          this.finished = true
        }
        console.log('文章详情', data, this.list)
      } catch (err) {
        this.error = true
        this.loading = false
        console.log('文章详情请求错误', err)
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        const { data: { data } } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        // 下拉刷新的数据追加到数组的头部
        this.list.unshift(...data.results)
        this.refreshSuccessText = `🎉 更新${data.results.length}条数据`
        // 关闭刷新提示
        this.refreshloading = false
      } catch (err) {
        this.refreshSuccessText = '😭 刷新失败'
        this.refreshloading = false
      }
    }
  },
  mounted() {
    this.$refs['article-list'].onscroll = debounce(() => {
      console.log(this.$refs['article-list'].scrollTop)
      this.scrollTop = this.$refs['article-list'].scrollTop
    }, 50)
  },
  activated() {
    this.$refs['article-list'].scrollTop = this.scrollTop
    // 虫从文章详情返回到文章列表后，位置保持不变
  }
}
</script>

<style lang="scss" scoped>
.article-list {
  height: 100vh;
  overflow-y: auto;
}
</style>
