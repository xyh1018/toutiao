<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon class="page-nav-bar-leftIcon" name="arrow-left" @click="back"></van-icon>
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="articleDetail.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleDetail.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <template #icon>
            <van-image class="avatar" round fit="cover" :src="articleDetail.aut_photo" />
          </template>
          <template #title>
            <div class="user-name">{{ articleDetail.aut_name }}</div>
          </template>
          <template #label>
            <div class="publish-date">{{ time }}</div>
          </template>
          <FollowItem :isFollowed="articleDetail" @updataFollow="updata"></FollowItem>
        </van-cell>
        <!-- /用户信息 -->
        <!-- 文章内容 -->
        <div class="article-content markdown-body" ref="article-content" v-html="articleDetail.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <ArticleComment @reply="onreply" :comment="commentList" :source="articleDetail.art_id"
          @loadSuccess="onTotalCount">
        </ArticleComment>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="refresh">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

      <!-- 评论弹出层区域 -->
      <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '20%' }">
        <CommentPopup :id="articleDetail.art_id" @popupClose="closePopup"></CommentPopup>
      </van-popup>
      <!-- /评论弹出层区域 -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small" @click="showBottom = true">写评论</van-button>
      <van-icon name="comment-o" color="#777" :badge="articleDetail.comm_count" />
      <CollectItem :article="articleDetail" @collect="onCollect"></CollectItem>
      <LikeItem :article="articleDetail" @like="likeArticle"></LikeItem>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 评论回复 -->
    <van-popup v-model:show="showReply" position="bottom" :style="{ height: '90%' }">
      <CommentReply v-if="showReply" :comment="currentComment" @close="closeReply"></CommentReply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
import { dayjs } from '@/utils/dayjs'
import { showImagePreview } from 'vant'
import FollowItem from '@/components/article-detail/follow-item.vue'
import LikeItem from '@/components/article-detail/like-item.vue'
import CollectItem from '@/components/article-detail/collect-item.vue'
import ArticleComment from '@/components/article-detail/article-comment.vue'
import CommentPopup from '@/components/article-detail/comment-popup.vue'
import CommentReply from '@/views/article/components/comment-reply.vue'

export default {
  data() {
    return {
      articleDetail: {},
      loading: true,
      errStatus: 0,
      total_count: 0,
      showBottom: false,
      commentList: [],
      showReply: false,
      currentComment: {}
    }
  },
  methods: {
    async loadArticle() {
      this.loading = true
      try {
        const { data: { data } } = await getArticleDetail(this.articleId)
        this.articleDetail = data
        setTimeout(() => {
          this.previewImages()
        }, 0)
        console.log('article_detail', data)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = err.response.status
        }
        console.log('获取文章详情出错', err)
      }
      this.loading = false
    },
    back() {
      this.$router.back()
      console.log('back')
    },
    refresh() {
      this.loadArticle()
    },
    previewImages() {
      // 获取内容节点
      const articleContent = this.$refs['article-content']
      // 获取所有img节点
      const imgs = articleContent.querySelectorAll('img')
      const imageSrc = [] // 图片的地址
      imgs.forEach((img, index) => {
        imageSrc.push(img.src)
        img.onclick = () => { // 给每一个img节点添加点击事件
          showImagePreview({
            images: imageSrc,
            startPosition: index, // 预览图片的起始位置
            closeable: true
          })
        }
      })
    },
    updata(value) {
      this.articleDetail.is_followed = value
    },
    likeArticle(value) {
      this.articleDetail.attitude = value
    },
    onCollect(value) {
      this.articleDetail.is_collected = value
    },
    onTotalCount(value) {
      this.total_count = value
    },
    closePopup(data) {
      this.showBottom = false
      this.commentList.unshift(data.new_obj)
    },
    onreply(comment) {
      this.showReply = true
      this.currentComment = comment
    },
    closeReply() {
      this.showReply = false
    }
  },
  computed: {
    time() {
      return dayjs(this.articleDetail.pubdate).fromNow()
    }
  },
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    FollowItem,
    LikeItem,
    CollectItem,
    ArticleComment,
    CommentPopup,
    CommentReply
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  created() {
    this.loadArticle()
  }
}
</script>

<style lang="scss" scoped>
@import './github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;

      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;

      p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    .van-icon {
      font-size: 40px;

      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
