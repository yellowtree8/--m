<template>
    <div class="my-container">
      <div class="header not-login" v-if="!user">
        <div class="my-login" @click="$router.push('/login')">
          <img class="login-pic" src="~@/assets/mobile.png">
          <span class="text">登录/注册</span>
        </div>
      </div>
      <div class="header had-login" v-else>
        <div class="user">
          <div class="user-data">
            <van-image
              class="user-pic"
              round
              :src="userData.photo"
            />
            <span class="user-name">{{userData.name}}</span>
          </div>
          <van-button class="data-change" round size="mini" to="/my/edit">编辑资料</van-button>
        </div>
        <div class="account-data">
          <div class="account-item">
            <span class="num">{{userData.art_count}}</span>
            <span class="item">头条</span>
          </div>
          <div class="account-item">
            <span class="num">{{userData.fans_count}}</span>
            <span class="item">关注</span>
          </div>
          <div class="account-item">
            <span class="num">{{userData.follow_count}}</span>
            <span class="item">粉丝</span>
          </div>
          <div class="account-item">
            <span class="num">{{userData.like_count}}</span>
            <span class="item">获赞</span>
          </div>
        </div>
      </div>
      <div class="grid-bar">
        <van-grid :column-num="2">
          <van-grid-item>
            <i slot="icon" class="toutiao toutiao-shoucang"></i>
            <span slot="text" class="grid-text">收藏</span>
          </van-grid-item>
          <van-grid-item>
            <i slot="icon" class="toutiao toutiao-lishi"></i>
            <span slot="text" class="grid-text">历史</span>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="nav-cell">
        <van-cell title="消息通知" is-link/>
        <van-cell title="小智同学" is-link/>
      </div>
      <div class="logout">
        <van-button class="logout-btn" size="large" v-if="user" @click="onLogOut">退出登录</van-button>
      </div>
    </div>
</template>
<script>
// import router from '@/router'
import { getUserData } from '@/api/user'
import { mapState } from 'vuex' // 引入vuex 的mapState方法
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userData: ''
    }
  },
  watch: {},
  created () {
    if (this.user) {
      this.loadUserData()
    }
  },
  computed: {
    ...mapState(['user']) // 将vuex中的user映射到该组件中，这样我们就可以在该组件中调用vuex中数据
  },
  methods: {
    onLogOut () {
      this.$store.commit('setToken', null)
    },
    async loadUserData () {
      try {
        const res = await getUserData()
        this.userData = res.data.data
      } catch (err) {
        console.log('失败', err)
      }
    }
  }
}
</script>
<style scoped lang='less'>
.my-container{
  .header{
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .my-login{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;// flex-direction用来设置flex元素的布局方向
      .login-pic{
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text{
        font-size: 28px;
      }
    }
  }
  .had-login{
    .user{
      height: 231px;
      width: 100%;
      padding: 78px 32px 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .user-data{
        display: flex;
        align-items: center;
        .user-pic{
          border: 4px solid white;
          width: 150px;
          height: 150px;
          margin-right: 20px;
        }
        .user-name{
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .account-data{
      height: 130px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .account-item{
        display: flex;
        flex-direction: column;
        color: #fff;
        .num{
          font-size: 36px;
        }
        .item{
          font-size: 23px;
        }
      }
    }
  }

  .grid-bar{
    height: 145px;
    border-bottom: 10px solid #f5f7f9;
    .van-grid-item{
      height: 145px;
      .toutiao{
        font-size: 45px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      .grid-text{
        font-size: 28px;
      }
    }
  }
  .van-cell{
    height: 100px;
  }
  .logout{
    .logout-btn{
      height: 105px;
      color: #d86262;
    }
  }
}
</style>
