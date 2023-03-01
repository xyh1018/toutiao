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
