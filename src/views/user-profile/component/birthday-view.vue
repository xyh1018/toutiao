<template>
  <div>
    <van-date-picker v-model="currentDate" title="设置生日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" @cancel="onCancel" />

  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: this.currentBirthday.split('-'),
      minDate: new Date(1960, 1, 1),
      maxDate: new Date()
    }
  },
  methods: {
    onConfirm() {
      this.$emit('birthdayOk', this.currentDate)
    },
    onCancel() {
      this.$emit('close')
    }
  },
  props: {
    currentBirthday: {
      type: String,
      required: true
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped></style>
