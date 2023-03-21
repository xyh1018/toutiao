<template>
  <div>
    <van-nav-bar class="nav-bar" title="设置头像" right-text="完成" left-arrow @click-right="ok" @click-left="$emit('close')" />
    <img class="user-photo" :src="photo" alt="用户头像" ref="img">
  </div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  data() {
    return {
      cropper: null
    }
  },
  methods: {
    ok() {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        console.log(blob)
        this.$emit('photoOk', blob)
      })
    }
  },
  props: ['photo'],
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>

<style lang="scss" scoped>
.user-photo {
  display: block;
  max-width: 100%;
}
</style>
