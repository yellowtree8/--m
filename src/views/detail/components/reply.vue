<template>
    <div class="reply-container">
      <van-field maxlength="50" show-word-limit type="textarea" class="reply-field" v-model="value" placeholder="优质评论将会被被优先显示">
        <van-button @click="replyComm" type="default" slot="button">发布</van-button>
      </van-field>
    </div>
</template>
<script>
import hub from '@/utils/hub'
import { replyComm } from '@/api/article'
export default {
  name: 'ReplyComm',
  components: {},
  props: {
    artid: {
      type: String,
      require: true
    },
    commid: {
      type: String
    }
  },
  data () {
    return {
      value: ''
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  methods: {
    async replyComm () {
      try {
        const { data } = await replyComm({
          target: this.commid ? this.commid : this.artid,
          content: this.value,
          art_id: this.commid ? this.artid : null
        })
        console.log(data.data)
        this.value = ''
        if (!this.commid) {
          hub.$emit('addNewReply', data.data.new_obj)
        }
        hub.$emit('addcount')
        this.$emit('closePopup', data.data.new_obj)
      } catch (err) {
        console.log('chucuo', err)
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .reply-field{
    position: relative;
    margin-top: 20px;
    height: 90%;
    /deep/ .van-field__control{
      height: 200px;
      background-color: #f4f5f6;
      font-size: 32px;
    }
    /deep/ .van-field__word-limit{
      float: left;
      position: absolute;
      top: 150px;
      left: 480px;
    }
  }
</style>
