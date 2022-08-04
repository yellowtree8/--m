// 存储用户相关请求模块
import request from '@/utils/ruquest'
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}

// 发送验证码
export const getCode = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 发送个人数据请求
export const getUserData = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

// 获取用户频道列表
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 获取用户频道列表
export const getAllchannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 获取用户频道列表
export const patchNewchannel = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: data
  })
}

// 删除指定频道
export const deleteChannel = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}

// 关注用户
export const collectUser = data => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data
  })
}

// 取消关注用户
export const cancelCollectuser = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
