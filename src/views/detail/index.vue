<template>
    <div class="detail-container">
      <van-nav-bar
        class="page-nav-bar nav-bar"
        left-arrow
        @click-left="$router.back()"
      >
        <van-icon name="ellipsis" slot="right"/>
      </van-nav-bar>
      <div class="article-info">
        <div class="title">
          <h2>{{info.title}}</h2>
        </div>
        <div class="aut-info">
          <van-image
            class="aut-photo"
            round
            width="39.5"
            height="39.5"
            :src="info.aut_photo"
          />
          <div class="aut-name">
            <span>{{info.aut_name}}</span>
            <span style="color: #c1c1c1">{{info.pubdate | relativeTime}}</span>
          </div>
          <van-button :loading="loading" @click="oncollectUser()" class="guanzhu-btn" round type="info">{{this.info.is_followed?'已关注':'+关注'}}</van-button>
        </div>
        <div v-if="false" class="art-text" v-html="info.content"></div>
      </div>
      <comment-show @addCount="info.comm_count++" :artid="artid"></comment-show>
      <div class="comment">
        <van-button round @click="onReply">写评论</van-button>
        <van-icon @click="onLike()" size="20px" :color="attitude===1?'red':''" :badge="info.like_count>99?'99+':info.like_count" name="good-job-o" />
        <van-icon size="20px" :badge="info.comm_count>99?'99+':info.comm_count" name="comment-o" />
        <van-icon @click="collectArticle()" :color="iscollected?'red':''" size="20px" name="star-o" />
        <van-icon size="20px" name="share-o" />
        <van-popup style="height: 20%" v-model="isreply" get-container="body" position="bottom">
          <reply-comm :artid="artid" @closePopup="onclosePop"></reply-comm>
        </van-popup>
      </div>
    </div>
</template>
<script>
import { getDetails, collectArticle, cancelCollect, likeArticle, cancelLike } from '@/api/article'
import { collectUser, cancelCollectuser } from '@/api/user'
import CommentShow from '@/views/detail/components/comment.vue'
import ReplyComm from '@/views/detail/components/reply.vue'
export default {
  name: 'ArticleDetail',
  components: {
    CommentShow,
    ReplyComm
  },
  props: {
    id: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      artid: this.id,
      info: [],
      value: '',
      iscollected: false,
      attitude: -1,
      loading: false,
      isreply: false
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    async getDetails () {
      console.log(this.id)
      try {
        const { data } = await getDetails(this.id)
        this.info = data.data
        this.iscollected = this.info.is_collected
        this.attitude = this.info.attitude
        console.log(data.data)
      } catch (err) {
        console.log('chucuo', err)
      }
    },
    async oncollectUser () {
      this.loading = true
      try {
        if (this.info.is_followed) {
          await cancelCollectuser(this.info.aut_id)
        } else {
          await collectUser({
            target: this.info.aut_id
          })
        }
        this.info.is_followed = !this.info.is_followed
      } catch (err) {
        console.log('chucuo', err)
      }
      this.loading = false
    },
    async collectArticle () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (this.iscollected) {
          await cancelCollect(this.id)
          this.$toast.success('取消收藏')
        } else {
          await collectArticle({
            target: this.id
          })
          this.$toast.success('收藏成功')
        }
        this.iscollected = !this.iscollected
      } catch (err) {
        console.log('chucuo', err)
        this.$toast.fail('操作失败')
      }
    },
    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (this.attitude === 1) {
          await cancelLike(this.id)
          this.attitude = 0
          this.info.like_count--
          this.$toast.success('取消点赞')
        } else {
          await likeArticle({
            target: this.id
          })
          this.attitude = 1
          this.info.like_count++
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log('chucuo', err)
        this.$toast.fail('操作失败')
      }
    },
    onReply () {
      this.isreply = true
    },
    onclosePop () {
      this.isreply = false
      this.info.comm_count++
    }
  }
}
</script>
<style scoped lang='less'>
  .detail-container{
    width: 750px;
    /deep/ .page-nav-bar{
      position: fixed;
      width: 750px;
      top: 0;
    }
    .article-info{
      padding-left: 38px;
      padding-right: 38px;
      margin-top: 92px;
      .title{
        height: 200px;
        display: flex;
        align-items: center;
        h2{
          font-size: 40px;
        }
      }
      .aut-info{
        height: 100px;
        display: flex;
        .aut-photo{
          margin-right: 10px;
        }
        .aut-name{
          font-size: 28px;
          display: flex;
          flex-direction: column;
        }
        .guanzhu-btn{
          width: 170px;
          height: 58px;
          margin-left: auto;
        }
      }
      .art-text{
        font-size: 32px;
        /deep/ *{
          overflow: auto;
        }
        /deep/ img{
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .comment{
      position:fixed;
      bottom: 0;
      border-top: 1px solid #d8d8d8;
      width: 750px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .van-button{
        height: 50px;
        width: 286px;
        margin-right: 50px;
      }
    }
  }
</style>
