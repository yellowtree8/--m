import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置处理相对时间的插件relativeTime
dayjs.extend(relativeTime)

// 配置中文包
dayjs.locale('zh-cn')

// 全局过滤器处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
