<template>
  <div class="reply">
    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'">
      <template #left>
        <van-icon name="cross" @click="$emit('close')"></van-icon>
      </template>
    </van-nav-bar>
    <CommentItem :comment="comment" :isShowReply="false"></CommentItem>
    <van-nav-bar>
      <template #left>
        <div>全部回复</div>
      </template>
    </van-nav-bar>
    <ArticleComment
      :comment="commentList"
      :ShowReply="false"
      :source="comment.com_id"
      type="c"
      :totalCount="commentList.length"
     ></ArticleComment>
    <div class="post-wrap">
      <van-button class="post-btn" @click="showBottom = true">写评论</van-button>
    </div>
    <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '20%' }">
      <CommentPopup :id="comment.com_id" @popupClose="onSuccess"></CommentPopup>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/components/article-detail/comment-item.vue'
import ArticleComment from '@/components/article-detail/article-comment.vue'
import CommentPopup from '@/components/article-detail/comment-popup.vue'

export default {
  data() {
    return {
      showBottom: false,
      commentList: [] // 评论的回复列表
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem,
    ArticleComment,
    CommentPopup
  },
  emits: ['close', 'updateReplyCount'],
  methods: {
    onSuccess(data) {
      this.showBottom = false
      console.log(data)
      this.$emit('updateReplyCount')
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d7d7d7;

  .post-btn {
    width: 60%;
    height: 80%;
    border-radius: 44px;
  }
}
</style>
