// 频道请求模块
import axios from '@/utils/request'

// 获取所有频道列表
export const getAllChannels = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 修改用户频道
export const setUserChannels = (channel) => {
  return axios({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除频道
export const delUserChannels = (channelId) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
