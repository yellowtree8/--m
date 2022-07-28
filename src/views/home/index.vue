<template>
    <div id="home-container">
      <van-nav-bar class="page-nav-bar">
        <van-button class="search-btn" slot="title" icon="search" round type="info">搜索</van-button>
      </van-nav-bar>
      <van-tabs animated swipeable class="tabs">
        <div slot="nav-right" class="hamburger" @click="showPopup">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <van-tab v-for="item in channel" :key="item.id" :title="item.name">
          <article-list :channel="item"/>
        </van-tab>
      </van-tabs>
      <van-popup v-model="show" position="top">
        <channel-show :mychannel="channel"/>
      </van-popup>
    </div>
</template>
<script>
import ChannelShow from '@/views/home/components/pindao.vue'
import { getChannels } from '@/api/user'
import ArticleList from '@/views/home/components/list.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelShow
  },
  props: {},
  data () {
    return {
      channel: [],
      articles: [],
      show: false
    }
  },
  watch: {},
  created () {
    this.getChannels()
  },
  computed: {
  },
  methods: {
    async getChannels () {
      try {
        const channeldata = await getChannels()
        this.channel = channeldata.data.data.channels
      } catch (res) {
        console.log('fail', res)
      }
    },
    showPopup () {
      this.show = true
    }
  }
}
</script>
<style scoped lang='less'>
  #home-container{
    padding-bottom: 100px;
    /deep/ .van-overlay{
      background-color: white;
    }
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn{
      width: 555px;
      height: 66px;
      background-color: #5babfb;
      font-size: 28px;
      .van-icon-search{
        color: white;
      }
    }
    /deep/ .van-tabs{
      position:relative
      .van-tabs__line{
        background-color: #3296fa;
        margin-bottom: 8px;
        width: 31px;
        height: 8px;
      }
      .van-tab{
        width: 200px;
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
        font-size: 28px;
        color:#777777;
      }
      .van-tab--active{
        font-size: 30px;
        color: #333333;
      }
      .hamburger{
        position: fixed;
        display: flex;
        right: 0px;
        width: 66px;
        height: 82px;
        justify-content: center;
        align-items: center;
        background-color: white;
        opacity: 0.9;
        .toutiao-gengduo{
          font-size: 33px;
        }
        &::before{
          position: absolute;
          left: 0;
          content: "";
          width: 1px;
          height: 100%;
          background-image: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
    }
  }
</style>
