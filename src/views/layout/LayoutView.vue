<template>
  <!-- 动态展示内容 -->
    <RouterView></RouterView>
  <!-- 底部标签栏 -->
  <van-tabbar route>
    <van-tabbar-item replace :to="{ name: 'home' }" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace :to="{ name: 'qa' }" icon="comment-o">问答</van-tabbar-item>
    <van-tabbar-item replace :to="{ name: 'video' }" icon="video-o">视频</van-tabbar-item>
    <van-tabbar-item replace :to="{ name: 'person' }" icon="user-o">{{ $store.state.user ? '我的' : '未登陆'
    }}</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped></style>
