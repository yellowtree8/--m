<template>
    <div class="login-container">
        <van-nav-bar
            class="page-nav-bar"
            title="登录"
        >
          <van-icon slot="left" name="arrow-left" @click="$router.back()"/>
        </van-nav-bar>
        <van-form ref="loginForm" @submit="onSubmit">
            <van-field
                v-model="user.mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules="checkRules.mobileRule"
                type='number'
            >
              <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="code"
                placeholder="请输入验证码"
                :rules="checkRules.codeRule"
                type='number'
            >
              <template #button>
                <van-count-down
                v-if="isCountdown"
                :time='1000*60'
                format="ss 秒"
                @finish="onCountfinish"
                />
                <van-button
                  v-else
                  size="small"
                  type="primary"
                  round native-type="button"
                  @click='onSendnum'
                  >发送验证码
                  </van-button>
              </template>
              <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
            </van-field>
            <div style="margin: 16px;">
                <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { login, getCode } from '@/api/user.js'
// import store from '@/store'
// import func from 'vue-editor-bridge'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 表单验证规则
      checkRules: {
        mobileRule: [{
          required: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^1[3,5,7,8]\d{9}$/,
          message: '手机号格式出错'
        }],
        codeRule: [{
          required: true,
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式出错'
        }]
      },
      // 倒计时状态
      isCountdown: false
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  methods: {
    // async await是常用的异步调用写法，可以通过await写多个异步任务
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证，在vant组件的表单选项中的rule中调整
      // Toast轻提示在组件中的使用，需要通过this.@toast来调用
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 2000
      })
      // 3.提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setToken', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('请输入正确的手机号和验证码')
        } else {
          console.log('登录失败，未知错误')
        }
      }
      // 4.根据响应结果返回后续操作
    },
    async onSendnum () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('出错', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountdown = true
      // 3.请求发送验证码
      try {
        await getCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('发送过于频繁，请稍后重试')
        } else if (err.response.status === 404) {
          this.$toast('手机号错误，请重新输入')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    },
    onCountfinish () {
      this.isCountdown = false
    }
  }
}
</script>
<style scoped lang='less'>
    .login-container{
        .toutiao{
            font-size: 48px;
        }
        .van-field__button{
          .van-button{
            width: 200px;
            height: 40px;
            background-color: #ededed;
            color:#919191;
            border: none;
          }
        }
        .login-btn{
          background-color: #6db4fb;
          height: 90px;
          width: 694px;
        }
    }
</style>
