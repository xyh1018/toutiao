<template>
  <div class="comment-post">
    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50"
      placeholder="请输入留言" show-word-limit />
    <van-button class="post-btn" @click="onSumit" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { setComment } from '@/api/comment'
import { showToast } from 'vant'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onSumit() {
      try {
        const { data: { data } } = await setComment({
          target: this.id,
          content: this.message,
          art_id: this.articleId ? this.articleId : null
        })

        console.log(data)
        // 清空输入框
        this.message = ''
        // 关闭弹出层
        this.$emit('popupClose', data)
        // total_count加一
        this.$emit('pulsTotalCount')
        // 成功提示
        showToast('发布成功')
      } catch (err) {
        console.log(err)
      }
    }
  },
  inject: ['articleId']
}
</script>

<style scoped lang="scss">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;

  .post-field {
    background-color: #f5f7f9;
  }

  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;

    &::before {
      display: none;
    }
  }
}
</style>
