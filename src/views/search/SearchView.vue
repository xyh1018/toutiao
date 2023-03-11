<template>
  <div class="searchitem">
    <form action="/">
      <van-search v-model="value" show-action clearable placeholder="请输入搜索关键词" background="#1989fa" @search="onSearch"
        @cancel="onCancel" @focus="onFocus" />
    </form>
    <SearchResult v-if="resultShow" :searchText="value"></SearchResult>
    <SearchSuggest v-else-if="value" :searchText="value" @search="onSearch"></SearchSuggest>
    <SearchHistory v-else :searchHistory="History" @history="onSearch"></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggest from './components/search-suggest.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'

export default {
  data() {
    return {
      value: '',
      resultShow: false,
      History: getItem('TOUTIAO_SEARCH_HISTORY') || []
    }
  },
  watch: {
    History: {
      handler(value) {
        console.log('ha')
        setItem('TOUTIAO_SEARCH_HISTORY', value)
      },
      deep: true
    }
  },
  methods: {
    onSearch(val) {
      this.value = val
      this.resultShow = true
      if (this.History.indexOf(val) === -1) {
        this.History.unshift(val)
      }
    },
    onCancel() {
      this.$router.back()
    },
    onFocus() {
      this.resultShow = false
    }
  },
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  }
}
</script>

<style lang="scss" scoped></style>
