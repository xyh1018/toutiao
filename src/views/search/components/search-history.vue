<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #right-icon>
          <van-icon name="delete-o" class="delete-icon" @click="onShowDel" />
        </template>
      </van-cell>
      <van-cell :title="item" v-for="(item, index) in searchHistory" :key="index" @click="onClick(item, index)">
        <template #right-icon>
          <div class="deleteTips" v-show="isShowDelte">点击删除</div>
          <van-icon v-show="isShowDelte" name="close" class="close-icon" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDelte: false
    }
  },
  methods: {
    onShowDel() {
      this.isShowDelte = !this.isShowDelte // 控制显示删除按钮
    },
    onClick(item, index) {
      if (this.isShowDelte) {
        // eslint-disable-next-line vue/no-mutating-props
        this.searchHistory.splice(index, 1)
      } else {
        this.$emit('history', item)
      }
    }
  },
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.delete-icon {
  line-height: 44px;
  font-size: 30px;
}

.close-icon {
  line-height: 48px;
}

.deleteTips {
  font-size: 20px;
  color: #bababa;
  line-height: 44px;
  padding-right: 8px;
}
</style>
