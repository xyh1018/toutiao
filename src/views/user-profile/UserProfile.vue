<template>
  <div class="profile">
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />

    <van-cell-group>
      <van-cell @click="$refs.input.click()" title="头像" is-link>
        <input type="file" ref="input" @change="onChange" hidden />
        <van-image class="avator" round :src="profile.photo" />
      </van-cell>
      <van-cell title="昵称" :value="profile.name" is-link @click="showName = true" />
      <van-cell title="性别" :value="profile.gender === 1 ? '男' : '女'" is-link @click="showGender = true" />
      <van-cell title="生日" :value="profile.birthday" is-link @click="showBirthday = true" />
    </van-cell-group>

    <van-button class="keepProfile" type="primary" size="normal" @click="submitUserProfile">保存修改</van-button>
    <!-- 昵称 -->
    <van-popup v-model:show="showName" position="bottom" :style="{ height: '100%' }">
      <NameView v-if="showName" @close="showName = false" @nameOk="getNameMessage"></NameView>
    </van-popup>
    <!-- 性别 -->
    <van-popup v-model:show="showGender" position="bottom" :style="{ height: '35%' }">
      <GenderView v-if="showGender" @close="showGender = false" @genderOk="getGenderMessage"></GenderView>
    </van-popup>
    <!-- 生日 -->
    <van-popup v-model:show="showBirthday" position="bottom" :style="{ height: '40%' }">
      <BirthdayView v-if="showBirthday" @close="showBirthday = false" :currentBirthday="profile.birthday"
        @birthdayOk="getBirthdayMessage"></BirthdayView>
    </van-popup>
    <!-- 头像 -->
    <van-popup v-model:show="showPhoto" position="bottom" :style="{ height: '100%' }">
      <PhotoView v-if="showPhoto" :photo="photoUrl" @close="showPhoto = false" @photoOk="getPhotoMessage"></PhotoView>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, setUserProfile, setUserPhoto } from '@/api/user'
import NameView from '@/views/user-profile/component/name-view.vue'
import GenderView from '@/views/user-profile/component/gender-view.vue'
import BirthdayView from '@/views/user-profile/component/birthday-view.vue'
import PhotoView from '@/views/user-profile/component/photo-view.vue'
import { showNotify, showSuccessToast } from 'vant'

export default {
  name: 'UserProfile',
  data() {
    return {
      profile: {},
      showName: false,
      showGender: false,
      showBirthday: false,
      showPhoto: false,
      userName: null,
      userGender: null,
      userBirthday: null,
      userPhoto: null,
      photoUrl: null
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/person')
    },
    async loadUserProfile() {
      try {
        const { data: { data } } = await getUserProfile()
        this.profile = data
        console.log('获取用户信息成功', data)
      } catch (err) {
        console.log('获取用户信息失败', err)
      }
    },
    async submitUserProfile() {
      // 设置用户资料
      try {
        if (this.userName !== null) {
          await setUserProfile({
            name: this.userName
          })
          this.profile.name = this.userName
          this.userName = null
        }
        if (this.userGender !== null) {
          await setUserProfile({
            gender: this.userGender
          })
          this.profile.gender = this.userGender
          this.userGender = null
        }
        if (this.userBirthday !== null) {
          await setUserProfile({
            birthday: this.userBirthday
          })
          this.profile.birthday = this.userBirthday
          this.userBirthday = null
        }
        if (this.userPhoto !== null) {
          const formData = new FormData()
          formData.append('photo', this.userPhoto)
          const { data: { data } } = await setUserPhoto(formData)
          // 把新的头像地址赋值给photoUrl
          this.profile.photo = data.photo
        }
        showSuccessToast('更新成功')
        console.log('保存个人资料成功')
      } catch (err) {
        console.log('保存失败', err)
        showNotify({ type: 'danger', message: '更新失败' })
      }
    },
    getNameMessage(message) {
      this.showName = false
      this.userName = message
      console.log(message)
    },
    getGenderMessage(number) {
      this.showGender = false
      this.userGender = number
    },
    getBirthdayMessage(birthday) {
      this.showBirthday = false
      this.userBirthday = `${birthday[0]}-${birthday[1]}-${birthday[2]}`
      console.log(this.userBirthday)
    },
    getPhotoMessage(blob) {
      this.showPhoto = false
      this.userPhoto = blob
    },
    onChange() {
      // 获取文件对象 --> FileList{...}
      const file = this.$refs.input.files[0]
      // 生成缩略图
      this.photoUrl = window.URL.createObjectURL(file)
      console.log(file, this.photoUrl)
      this.showPhoto = true
      // input如果选择同一个文件时不会触发change事件
      // 解决办法是--每次使用完毕，把它的value清空
      this.$refs.input.value = ''
    }
  },
  components: {
    NameView,
    GenderView,
    BirthdayView,
    PhotoView
  },
  created() {
    this.loadUserProfile()
  }
}
</script>

<style lang="scss" scoped>
.avator {
  height: 60px;
  width: 60px;
}

.keepProfile {
  width: 300px;
  position: absolute;
  bottom: 700px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
