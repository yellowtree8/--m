<template>
    <div class="history-show">
      <van-list
        :finished="history.length === 0"
        finished-text="没有更多了"
      >
        <van-cell title='历史记录'>
          <span slot="default" @click="isedited = !isedited">{{isedited?'完成':'编辑'}}</span>
        </van-cell>
        <van-cell v-for="(item,index) in history" :key="index" :title="item" @click="$emit('clickHistory', item)">
          <i class="toutiao toutiao-guanbi" slot="right-icon" v-if="isedited" @click.stop="historyDelete(index)"></i>
        </van-cell>
      </van-list>
    </div>
</template>
<script>
export default {
  name: 'HistoryShow',
  components: {},
  props: {
    his: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isedited: false,
      history: this.his
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  methods: {
    historyDelete (index) {
      this.history.splice(index, 1)
    }
  }
}
</script>
<style scoped lang='less'>

</style>
