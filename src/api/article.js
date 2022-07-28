import request from '@/utils/ruquest'
// 加载文章列表

// // 获取文章列表
// export const getArticles = params => {
//   return request({
//     method: 'GET',
//     url: '/v1_0/articles',
//     params: params
//   })
// }
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
