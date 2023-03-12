import axios from '@/utils/request'

// 获取文章评论
export const getComment = (params) => {
  return axios({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 点赞评论
export const getLikeings = (id) => {
  return axios({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: id
    }
  })
}

// 取消点赞
export const delLikeings = (id) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${id}`
  })
}

// 发布文章评论
export const setComment = (data) => {
  return axios({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
