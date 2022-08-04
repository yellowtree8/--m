<template>
    <div class="result-show">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
      </van-list>
    </div>
</template>
<script>
import { getSearchresult } from '@/api/search'
export default {
  name: 'ResultShow',
  components: {},
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      page: 1,
      perpgae: 10,
      finished: false,
      loading: false,
      list: []
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchresult({
          page: this.page,
          per_page: this.perpgae,
          q: this.value
        })
        const res = data.data.results
        this.list.push(...res)
        this.loading = false
      } catch (err) {
        console.log('chucuo', err)
      }
    }
  }
}
</script>
<style scoped lang='less'>

</style>
