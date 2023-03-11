import axios from '@/utils/request'

// 获取文章详情
export const getArticleDetail = (params) => {
  return axios({
    method: 'GET',
    url: `/v1_0/articles/${params}`
  })
}
