<template>
    <div class="channel-show">
      <van-nav-bar class="close-nav">
        <i slot="left" class="toutiao toutiao-guanbi" @click='$emit("popIn")'></i>
      </van-nav-bar>
       <van-cell title="我的频道" class="my-channel" >
        <span slot="default" class="write-button" v-if="isedited == false" @click="onEdit">编辑</span>
        <span slot="default" class="write-button" v-else @click="onEdit">完成</span>
       </van-cell>
       <van-grid gutter="10px" class="mychannel">
        <van-grid-item class="grid-item mychannel-gird" v-for="(item,index) in userchannel" :key="index" @click="!isedited?$emit('changeChannel',index):function(){return}">
          <div class="grid-content">
            <div class="mychannel-name">{{item.name}}</div>
            <i class="mychannel-close toutiao toutiao-guanbi" v-if="isedited == true" @click="deleteChannel(item.id, index)"></i>
          </div>
        </van-grid-item>
      </van-grid>
       <van-cell title="频道推荐" class="channel-advise" />
       <van-grid gutter="10px" class="mychannel">
        <van-grid-item v-for="(item,index) in morechannel" :key="index" :text="item.name" @click="addChannel(item)"/>
      </van-grid>
    </div>
</template>
<script>
import { getAllchannels, patchNewchannel, deleteChannel } from '@/api/user'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelShow',
  components: {},
  props: {
    mychannel: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      allchannel: [],
      isedited: false,
      userchannel: this.mychannel
    }
  },
  watch: {},
  created () {
    this.getAllchannels()
  },
  computed: {
    morechannel () {
      return this.allchannel.filter((item) => {
        return this.userchannel.findIndex((myitem) => {
          return myitem.id === item.id
        }) === -1
      })
    }
  },
  methods: {
    async getAllchannels () {
      try {
        const res = await getAllchannels()
        this.allchannel = res.data.data.channels
      } catch (err) {
        console.log('出错', err)
      }
    },
    onEdit () {
      this.isedited = !this.isedited
    },
    async addChannel (channel) {
      try {
        this.userchannel.push(channel)
        if (this.$store.state.user) {
          await patchNewchannel({
            channels: [channel]
          })
        } else {
          setItem('channels', this.userchannel)
        }
      } catch (err) {
        console.log('用户未认证')
      }
    },
    async deleteChannel (id, index) {
      try {
        this.userchannel.splice(index, 1)
        if (this.$store.state.user) {
          await deleteChannel(id)
        } else {
          setItem('channels', this.userchannel)
        }
      } catch (err) {
        console.log('cuocuo', err)
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .channel-show{
    .grid-item{
      position: relative;
    }
    /deep/ .van-grid-item__content{
      background-color: #f4f5f6;
    }
    .mychannel{
      /deep/ .van-grid-item__content{
        height: 100px;
      }
    }
    .grid-content{
      .mychannel-close{
        display: inline-block;
        position: absolute;
        right: -15px;
        top: -15px;
        width: 32px;
        height: 32px;
        border: 1px solid red;
        border-radius: 16px;
        line-height: 32px;
        text-align: center;
      }
      .mychannel-name{
        font-size: 24px;
        color: #222222;
      }
    }
    .close-nav{
      border: none;
    }
    .my-channel{
      .write-button{
        display: inline-block;
        width: 104px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid red;
        border-radius: 50px;
        color: red;
      }
    }
  }
</style>
