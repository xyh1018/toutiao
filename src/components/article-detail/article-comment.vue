<template>
  <div class="comment">
    <van-empty
      v-if="!totalCount"
      description="暂无评论"
    />
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
    >
      <CommentItem
        :isShowReply="ShowReply"
        :comment="item"
        v-for="item in comment"
        :key="item.com_id"
        @liking="onLiking"
        @reply="$emit('reply', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from '@/components/article-detail/comment-item.vue'

export default {
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad() {
      try {
        // 获取数据
        const {
          data: { data }
        } = await getComment({
          type: this.type, // 评论类型,a为文章评论,c为评论的回复
          source: this.source, // 文章id或评论id
          offset: this.offset,
          limit: this.limit
        })
        // 将数据添加到列表
        // eslint-disable-next-line vue/no-mutating-props
        this.comment.push(...data.results)
        this.$emit('loadSuccess', data.total_count)
        this.loading = false
        // 判断是否还有数据
        if (data.results.length) {
          this.offset = data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    onLiking(value) {
      // eslint-disable-next-line vue/no-mutating-props
      this.comment.is_liking = value
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    comment: {
      type: Array,
      default: function () {
        return []
      }
    },
    type: {
      type: String,
      default: 'a'
    },
    ShowReply: {
      type: Boolean,
      default: true
    },
    totalCount: {
      type: Number,
      required: true
    }
  },
  components: {
    CommentItem
  },
  created() {
    this.loading = true
    this.onLoad()
    console.log('文章评论', this.comment)
  }
}
</script>

<style lang="scss" scoped>
.comment {
  padding-bottom: 44px;
}
</style>
