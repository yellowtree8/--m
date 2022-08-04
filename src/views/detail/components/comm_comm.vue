<template>
    <div class="comm-comm">
      <van-nav-bar
        :title="''+item.reply_count+'条回复'"
        left-text="返回"
        left-arrow
        @click-left="$emit('closePop')"
      />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getComments"
      >
        <van-cell :style="index===0?'border-bottom: 10px solid #f4f5f6':''" class="comm-item" border v-for="(item,index) in list" :key="index">
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
              <van-icon name="good-job-o" :color="item.is_liking?'red':''" />
              <span>{{item.like_count}}</span>
            </div>
            <div class="comm_content">{{item.content}}</div>
            <span class="pubdate">{{item.pubdate | relativeTime}}</span>
          </div>
        </van-cell>
      </van-list>
      <van-cell class="reply-cell">
        <van-button round class="reply-btn" @click="replyPopup">写评论</van-button>
      </van-cell>
      <van-popup style="height: 20%" v-model="isreply" get-container="body" position="bottom">
        <reply-comm :artid="artid" :commid="commid" @closePopup="onReply"></reply-comm>
      </van-popup>
    </div>
</template>
<script>
import ReplyComm from '@/views/detail/components/reply.vue'
import { getComments } from '@/api/article'
export default {
  name: 'CommIncomm',
  components: {
    ReplyComm
  },
  props: {
    item: {
      type: Object,
      require: true
    },
    artid: {
      type: String,
      require: true
    },
    likeComm: {
      type: Function,
      require: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      list: [this.item],
      commid: this.item.com_id,
      lastid: null,
      isreply: false
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  methods: {
    async getComments () {
      try {
        const { data } = await getComments({
          type: 'c',
          source: this.commid,
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
    replyPopup () {
      this.isreply = true
    },
    onReply (data) {
      this.isreply = false
      this.list.splice(1, 0, data)
      this.$emit('addCount')
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
    }
  }
  .reply-cell{
    position: fixed;
    bottom: 0;
    .reply-btn{
      width: 600px;
      margin-left: 40px;
    }
  }
</style>
