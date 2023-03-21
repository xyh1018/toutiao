<template>
  <div>
    <van-picker title="设置性别" :columns="columns" @confirm="onConfirm" @cancel="onCancel" />

  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { text: '男', value: 1 },
        { text: '女', value: 0 }
      ]
    }
  },
  methods: {
    onConfirm({ selectedValues }) {
      console.log(selectedValues[0])
      this.$emit('genderOk', selectedValues[0])
    },
    onCancel() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped></style>
