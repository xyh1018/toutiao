<template>
    <router-view v-slot="{ Component }">
      <keep-alive include="LayoutView">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- <RouterView></RouterView> -->
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss"></style>
