import request from '@/utils/ruquest'

// 获取联想建议
export const getSuggestion = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取联想建议
export const getSearchresult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
