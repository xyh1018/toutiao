import axios from '@/utils/request'

// 提交表单
export const login = (data) => {
  return axios({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data // data是一个对象，包含了手机号和验证码
  })
}

// 发送验证码
export const sendSms = (mobile) => {
  return axios({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
    mobile: mobile
  })
}

// 获取用户信息
export const getUserInfo = (n) => {
  return axios({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户频道列表
export const getUserChannels = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 获取文章新闻推荐
export const getArticles = (params) => {
  return axios({
    method: 'GET',
    url: '/v1_0/articles',
    params: params
  })
}

// 关注用户
export const followUser = (userId) => {
  return axios({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注用户
export const cancelFollow = (userId) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}

// 点赞文章
export const setLike = (articleId) => {
  return axios({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

// 取消点赞
export const cancelLike = (articleId) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/article/likings/${articleId}`
  })
}

// 收藏文章
export const setCollect = (articleId) => {
  return axios({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}

// 取消收藏
export const cancelCollect = (articleId) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/article/collections/${articleId}`
  })
}

// 获取当前登陆用户的个人资料
export const getUserProfile = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export const setUserProfile = (data) => {
  return axios({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 编辑用户头像
export const setUserPhoto = (data) => {
  return axios({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}

// 获取用户收藏
export const getUserCollect = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/article/collections',
    params: {
      per_page: 10
    }
  })
}

// 获取用户历史
export const getUserHistory = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/user/histories',
    params: {
      per_page: 10
    }
  })
}

// 小智同学
