<template>
  <div class="search-suggest">
    <van-cell v-for="(item, index) in options" :key="index" v-show="isShow" @click="$emit('search',item)">
      <template #icon>
        <van-icon name="search" class="left-icon"></van-icon>
      </template>
      <template #title>
        <div class="search-suggest-title" v-html="highLight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggest } from '@/api/search'
import { debounce } from 'lodash' // 第三方包：防抖工具函数
export default {
  data() {
    return {
      options: [], // 搜索建议数据
      isShow: true
    }
  },
  watch: {
    searchText: {
      // handler(v) {
      //   this.loadSuggest(v)
      // },
      handler: debounce(
        function (v) {
          this.loadSuggest(v)
        },
        500
      ),
      immediate: true
    }
  },
  methods: {
    async loadSuggest(v) {
      try {
        const { data: { data } } = await getSuggest(v)
        this.options = data.options
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    highLight(text) {
      if (this.searchText && text) {
        const reg = new RegExp(this.searchText, 'gi')
        return text.replace(reg, `<span class="red">${this.searchText}</span>`)
      } else {
        this.isShow = false
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

<style lang="scss" scoped>
.left-icon {
  color: #cbcbcb;
  font-size: 28px;
  line-height: 44px;
  margin-right: 10px;
}

.search-suggest-title {
  line-height: 44px;
}
</style>
