<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div id="article-list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <article-show :article="item"  v-for="(item,index) in list" :key="index" />
        </van-list>
      </div>
    </van-pull-refresh>

</template>
<script>
import ArticleShow from '@/components/article-show/article.vue'
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {
    ArticleShow
  },
  props: {
    channel: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isLoading: false
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        // 发送请求获取文章列表
        const { data } = await getArticles({
          channel_id: this.channel.id,
          // 这里传两个时间戳的原因：如果获取新数据我们传新的时间戳，当传历史数据（也就是已缓存数据）我们传旧时间戳
          timestamp: this.timestamp || Date.now()
        })
        const results = data.data.results
        console.log(results)
        // 将数据传入list中
        this.list.push(...results)
        // 加载状态结束
        this.loading = false
        // 判断数据是否全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (res) {
        console.log(res)
        this.loading = false
        this.finished = true
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        console.log(err)
        this.isLoading = false
      }
    }
  }
}
</script>
<style scoped lang='less'>
</style>
