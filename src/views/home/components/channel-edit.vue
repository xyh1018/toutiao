<template>
  <div class="channel-edit">
    <van-cell class="channel-edit-cell" :border="false">
      <template #title>
        <div class="channel-edit-cell-title">我的频道</div>
      </template>
      <van-button class="channel-edit-cell-button" @click="onEdit" plain round size="small" type="danger">{{ isShowIcon
        ===
        false ? '编辑' : '完成' }}</van-button>
    </van-cell>
    <van-grid class="channel-edit-allgrid" :column-num="4" :gutter="6" :border="false" direction="horizontal">
      <van-grid-item class="channel-edit-grids" @click="onClickButton(value, index)"
        v-for="(value, index) in channelsToEdit" :key="value.id">
        <template #text>
          <div class="channel-edit-grids-text" :class="{ active: index === active }">{{ value.name }}</div>
        </template>
        <template #icon>
          <van-icon v-show="isShowIcon && !fiexChannels.includes(value.id)" class="channel-edit-grids-icon"
            name="clear" />
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell :border="false">
      <template #title>
        <div class="channel-edit-cell-title">频道推荐</div>
      </template>
    </van-cell>
    <van-grid class="channel-edit-allgrid" :column-num="4" :gutter="6" :border="false" direction="horizontal"
      icon-size="16px">
      <van-grid-item class="channel-edit-grids" @click="onAddChannel(value)" v-for="value in addChannels" :key="value"
        :text="value.name" icon="add" icon-color="#a0a2a0" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, setUserChannels, delUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
import { showNotify } from 'vant'

export default {
  data() {
    return {
      allChannels: [], // 所有频道列表
      isShowIcon: false, // 是否展示删除按钮
      fiexChannels: [0, 1] // 默认不可删除频道
    }
  },
  props: {
    channelsToEdit: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data: { data } } = await getAllChannels()
        this.allChannels = data.channels
        console.log('获取所有频道成功', data)
      } catch (err) {
        console.log('获取所有频道失败', err)
      }
    },
    // 过滤两个数组的相同项
    filterChannels() {
      const newArr = this.allChannels.filter((item) => {
        return !this.channelsToEdit.find((ele) => {
          return ele.name === item.name
        })
      })
      return newArr
    },
    async onAddChannel(value) {
      console.log(this.channelsToEdit)
      // 此处直接修改了props里的值，是错误的，由于值为引用类型所以vue并不会报错
      // eslint-disable-next-line vue/no-mutating-props
      this.channelsToEdit.push(value)
      // 数据持久化
      if (this.user) {
        // 已登陆
        try {
          await setUserChannels({
            id: value.id,
            seq: this.channelsToEdit.length
          })
        } catch (err) {
          showNotify({ type: 'danger', message: '保存失败，请稍后重试' })
        }
      } else {
        // 未登陆
        setItem('TOUTIAO_CHANNELS', this.channelsToEdit)
      }
    },
    onEdit() {
      this.isShowIcon = !this.isShowIcon
    },
    onClickButton(channel, index) {
      if (this.isShowIcon) {
        // 处于编辑状态时，删除该频道
        if (channel.id !== 0 && channel.id !== 1) {
          if (index <= this.active) {
            this.$emit('update-active', this.active - 1)
          }
          // eslint-disable-next-line vue/no-mutating-props
          this.channelsToEdit.splice(index, 1)
        }
        this.deleteChannel(channel)
      } else {
        // 非编辑状态时，切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          await delUserChannels(channel.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.channelsToEdit)
        }
      } catch (err) {
        showNotify({ type: 'danger', message: '删除失败，请稍后重试' })
      }
    }
  },
  computed: {
    addChannels() {
      return this.filterChannels()
    },
    ...mapState(['user'])
  },
  created() {
    this.loadAllChannels()
  }
}
</script>

<style lang="scss" scoped>
.channel-edit {
  padding: 85px 0;

  .channel-edit-cell {
    display: flex;
    align-items: center;

    .channel-edit-cell-title {
      font-size: 32px;
      color: #222222;
    }

    .channel-edit-cell-button {
      width: 104px;
      height: 48px;
      line-height: 48px;
    }
  }

  .channel-edit-allgrid {
    white-space: nowrap;

    .channel-edit-grids-text {
      font-size: 12px;
      color: #323233;
    }

    .channel-edit-grids-icon {
      font-size: 32px;
      color: #ff7272;
      position: absolute;
      top: -3px;
      right: 6px;
    }

    .active {
      color: red;
    }
  }
}
</style>
