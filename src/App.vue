<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="LayoutView">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!-- <keep-alive include="LayoutView">
    <RouterView></RouterView>
  </keep-alive> -->
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    // // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    // const vh = window.innerHeight * 0.01
    // // Then we set the value in the --vh custom property to the root of the document
    // document.documentElement.style.setProperty('--vh', `${vh}px`)

    // // We listen to the resize event
    // window.addEventListener('resize', () => {
    //   // We execute the same script as before
    //   const vh = window.innerHeight * 0.01
    //   document.documentElement.style.setProperty('--vh', `${vh}px`)
    // })
  }
}
</script>

<style lang="scss">
</style>
