<template>
    <van-cell class="article-item">
        <div slot="title" class="title">{{article.title}}</div>
        <div class="author-data1" slot="label">
            <div v-if="article.cover.type === 3"  class="image-wrap">
              <div v-for="(item,index) in article.cover.images" :key="index">
                <van-image :src="item" fit="cover" class="article-image"/>
              </div>
            </div>
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}}评论</span>
            <span>{{article.pubdate}}</span>
        </div>
        <div v-if="article.cover.type==1">
          <div slot="value" class="article-value">
            <van-image :src="article.cover.images[0]" fit="cover" class="alone-image"/>
          </div>
        </div>
    </van-cell>
</template>
<script>
export default {
  name: 'ArticleShow',
  components: {},
  props: {
    article: {
      reuqired: true,
      type: Object
    }
  },
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
  .article-item{
    .title{
      flex-basis: 480px;
      color: #3a3a3a;
      font-size: 32px;
    }
    .author-data1{
      .image-wrap{
        display: flex;
        justify-content: space-around;
        .article-image{
          width: 235px;
          height: 148px;
        }
      }
      span{
        float:left;
        font-size: 23px;
        padding: 4px;
      }
    }
    /deep/ .van-cell__value{
      flex: unset;
      width: 232px;
      height: 146px;
      .alone-image{
        width: 100%;
        height: 146px;
      }
    }
  }
</style>
