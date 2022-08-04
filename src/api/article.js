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
// 获取推荐文章
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

// 获取文章详情
export const getDetails = artid => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${artid}`
  })
}

// 收藏文章
export const collectArticle = data => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data
  })
}

// 取消收藏文章
export const cancelCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

// 点赞文章
export const likeArticle = data => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data
  })
}

// 取消对文章点赞
export const cancelLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}

// 获取评论或评论回复
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 对评论进行回复
export const replyComm = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}

// 对评论点赞
export const likeComm = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data
  })
}

// 取消评论点赞
export const unlikeComm = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
