<template>
    <div id="tabbar-container">
      <!-- 子路由出口 -->
      <router-view></router-view>
      <!-- /子路由出口、 -->
      <van-tabbar class="tabbar" route>
        <van-tabbar-item to="/home">
          <i slot="icon" class="toutiao toutiao-shouye"></i>
          <span class="tabbar-word">首页</span>
        </van-tabbar-item>
        <van-tabbar-item to="/qa">
          <i slot="icon" class="toutiao toutiao-wenda"></i>
          <span class="tabbar-word">问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="/vedio">
          <i slot="icon" class="toutiao toutiao-shipin"></i>
          <span class="tabbar-word">视频</span>
        </van-tabbar-item>
        <van-tabbar-item to="/my">
          <i slot="icon" class="toutiao toutiao-wode"></i>
          <span class="tabbar-word" v-if="$store.state.user">我的</span>
          <span class="tabbar-word" v-else>未登录</span>
        </van-tabbar-item>
      </van-tabbar>
    </div>
</template>
<script>
export default {
  name: 'LayOut',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style scoped lang='less'>
.tabbar-container{
  .tabbar{
    display: flex;
    flex: 1;
    .toutiao{
      font-size: 40px;
    }
    .tabbar-word{
      font-size: 20px;
    }
  }
}
</style>
