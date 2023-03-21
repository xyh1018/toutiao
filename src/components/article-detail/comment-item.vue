<template>
  <van-cell class="comment-item">
    <template #icon>
      <van-image class="avatar" round fit="cover" :src="comment.aut_photo" />
    </template>
    <template #title>
      <div class="title-wrap">
        <div class="user-name">{{ comment.aut_name }}</div>
        <van-button class="like-btn" :icon="comment.is_liking ? 'good-job' : 'good-job-o'" @click="like">赞</van-button>
      </div>
    </template>
    <template #label>
      <div>
        <p class="comment-content">{{ comment.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{ time }}</span>
          <van-button v-if="isShowReply" class="reply-btn" round @click="onReply">回复 {{ comment.reply_count }}</van-button>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { dayjs } from '@/utils/dayjs'
import { getLikeings, delLikeings } from '@/api/comment'
export default {
  props: {
    comment: {
      type: [Object],
      required: true
    },
    isShowReply: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    time() {
      return dayjs(this.comment.pubdate).fromNow()
    }
  },
  methods: {
    async like() {
      try {
        if (this.comment.is_liking) {
          // 取消评论点赞
          await delLikeings(this.comment.com_id)
          // eslint-disable-next-line vue/no-mutating-props
          this.comment.like_count--
        } else {
          // 点赞评论
          await getLikeings(this.comment.com_id)
          // eslint-disable-next-line vue/no-mutating-props
          this.comment.like_count++
        }
      } catch (err) {
        console.log(err)
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.comment.is_liking = !this.comment.is_liking
    },
    onReply() {
      this.$emit('reply', this.comment)
    }
  }
}
</script>

<style scoped lang="scss">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }

  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }

  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }

  .bottom-info {
    display: flex;
    align-items: center;
  }

  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }

  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;

    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
