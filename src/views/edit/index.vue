<template>
    <div class="edit-container">
      <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      />
      <van-cell-group>
        <van-cell title="头像" value="内容" is-link>
          <van-image
            round
            width="30"
            height="30"
            :src="profile.photo"
          />
        </van-cell>
        <van-cell title="昵称" :value="profile.name" is-link />
        <van-cell title="性别" :value="profile.gender?'男':'女'" is-link />
        <van-cell title="生日" :value="profile.birthday" is-link />
      </van-cell-group>
    </div>
</template>
<script>
import { getUserprofile } from '@/api/user'
export default {
  name: 'EditIndex',
  components: {},
  props: {},
  data () {
    return {
      profile: {}
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  mounted () {
    this.getUserprofile()
  },
  methods: {
    async getUserprofile () {
      try {
        const { data } = await getUserprofile()
        this.profile = data.data
        console.log(this.profile)
      } catch (err) {
        console.log('chucuo', err)
      }
    }
  }
}
</script>
<style scoped lang='less'>

</style>
