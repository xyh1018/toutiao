import axios from '@/utils/request'

// 获取联想建议
export const getSuggest = (v) => {
  return axios({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q: v
    }
  })
}

// 获取搜索结果
export const getSearch = (params) => {
  return axios({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
