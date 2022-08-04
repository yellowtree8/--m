<template>
    <div class="search-container">
      <div class="search-nav">
        <form action="/">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @focus="onFocus"
          />
        </form>
      </div>
      <result-show v-if="show" :value="value"></result-show>
      <suggest-show v-else-if="value" :value="value" @clickSuggestion="onSearch($event)"></suggest-show>
      <history-show v-else :his="history" @clickHistory="onSearch($event)"></history-show>
    </div>
</template>
<script>
import SuggestShow from '@/views/search/component/suggest.vue'
import ResultShow from '@/views/search/component/result.vue'
import HistoryShow from '@/views/search/component/history.vue'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    HistoryShow,
    ResultShow,
    SuggestShow
  },
  props: {},
  data () {
    return {
      value: '',
      show: false,
      history: getItem('history') || []
    }
  },
  watch: {
  },
  created () {
  },
  computed: {
  },
  methods: {
    onSearch (val) {
      this.value = val
      if (this.history.indexOf(val) === -1) {
        this.history.unshift(val)
      }
      this.show = true
    },
    onCancel () {
      this.show = false
      setItem('history', this.history)
      this.$router.go(-1)
    },
    onFocus () {
      this.show = false
    }
  }
}
</script>
<style scoped lang='less'>
  .search-container{
    .van-search{
      background-color: #3296fa;
      .van-search__action{
        color: white;
      }
    }
  }
</style>
