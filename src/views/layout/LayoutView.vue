<template>
  <!-- 动态展示内容 -->
  <!-- <router-view></router-view> -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
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
  name: 'LayoutView',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped></style>
