<template>
    <div class="comment-show">
      <div class="comments">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getComments"
        >
          <van-cell class="comm-item" border v-for="(item,index) in list" :key="index">
            <van-image
              slot="icon"
              width="39.5"
              height="39.5"
              round
              :src="item.aut_photo"
            />
            <div class="comm-test" slot="default">
              <span class="aut_name">{{item.aut_name}}</span>
              <div class="comm_like" @click="likeComm(item)">
                <van-icon name="good-job-o" :color="item.is_liking?'red':''"/>
                <span>{{item.like_count}}</span>
              </div>
              <div class="comm_content">{{item.content}}</div>
              <span class="pubdate">{{item.pubdate | relativeTime}}</span>
              <van-button @click="showPopup(item)" class="comm-btn">{{item.reply_count}}评论</van-button>
            </div>
            <van-popup style="height: 90%" v-model="show" get-container="body" position="bottom">
              <comm-incomm @closePop="closePop" @addCount="addCount(item)" :item="commitem" :artid="artid" :likeComm="likeComm"></comm-incomm>
            </van-popup>
          </van-cell>
        </van-list>
      </div>
    </div>
</template>
<script>
import hub from '@/utils/hub'
import { getComments, likeComm, unlikeComm } from '@/api/article'
import CommIncomm from '@/views/detail/components/comm_comm.vue'
export default {
  name: 'CommentShow',
  components: {
    CommIncomm
  },
  props: {
    artid: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      show: false,
      commitem: {},
      isreply: false
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    hub.$on('addNewReply', (data) => {
      this.list.unshift(data)
    })
  },
  computed: {
  },
  methods: {
    async getComments () {
      try {
        const { data } = await getComments({
          type: 'a',
          source: this.artid,
          offset: this.lastid,
          limit: 2
        })
        console.log(data.data)
        this.lastid = data.data.last_id
        const result = data.data.results
        this.list.push(...result)
        if (data.data.last_id === data.data.end_id) {
          this.finished = true
        }
        this.loading = false
      } catch (err) {
        console.log('chucuo', err)
      }
    },
    showPopup (item) {
      this.commitem = item
      this.show = true
    },
    closePop () {
      this.show = false
    },
    addCount (item) {
      item.reply_count++
      this.$emit('addCount')
    },
    async likeComm (item) {
      try {
        if (!item.is_liking) {
          await likeComm({
            target: item.com_id
          })
          item.like_count++
        } else {
          await unlikeComm(item.com_id)
          item.like_count--
        }
        item.is_liking = !item.is_liking
      } catch (err) {
        console.log('chucuo', err)
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .comm-item{
    .comm-test{
      margin-left: 20px;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      .aut_name{
        color: #3296fa;
      }
      .comm_like{
        position: absolute;
        right: 20px;
      }
      .comm_content{
        width: 600px;
        height: 120px;
        line-height: 120px;
        font-size: 30px;
        overflow: hidden;
      }
      .pubdate{
        font-size: 24px;
      }
      .comm-btn{
        width: 134px;
        height: 50px;
        font-size: 24px;
        border: 1px solid white;
        border-radius: 25px;
        background-color: #f4f5f6;
        margin-left: 20px;
      }
    }
  }
</style>
