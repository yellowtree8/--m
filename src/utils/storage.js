// 封装本地存储操作模块

// 存储数据
export const setItem = (key, value) => {
  if (typeof (value) === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 提取数据
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  // 为什么用try，因为JSON数据类型很难判断，用if不合适，但直接用try和JSON.parse可以实现分支
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

// 删除数据
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
