<template>
  <div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 15
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data: { data: { results } } } = await getSearch({
          page: this.page, // 页码
          per_page: this.perPage, // 每页数量
          q: this.searchText // 输入框内的搜索关键词
        })
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
