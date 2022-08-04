<template>
    <div class="suggest-show">
      <ul class="suggest-wrap">
        <li class="suggest" v-for="(item,index) in suggestions" :key="index" @click="$emit('clickSuggestion',item)">
          <span class="test" v-html="onHighline(item)"></span>
        </li>
      </ul>
    </div>
</template>
<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SuggestShow',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    value: {
      handler: debounce(function (value) {
        this.onInput(value)
      }, 50),
      immediate: true
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    async onInput (val) {
      try {
        if (!val) {
          return
        }
        const { data } = await getSuggestion(val)
        this.suggestions = data.data.options
      } catch (err) {
        console.log('chucuo', err)
      }
    },
    onHighline (test) {
      if (!test) {
        return
      }
      const regobj = new RegExp(this.value, 'gi')
      test = test.replace(regobj, `<span style="color: red">${this.value}</span>`)
      return test
    }
  }
}
</script>
<style scoped lang='less'>
  .suggest-show{
    .suggest-wrap{
      .suggest{
        height: 90px;
        border: 1px solid #e8e8e8;
        display: flex;
        align-content: center;
        .test{
          font-size: 32px;
        }
        .test::before{
          content: '\e60d';
          font-family: "toutiao";
          color: #d4d4d4;
          font-size: 48px;
          padding: 20px;
          display: inline-block;
        }
      }
    }
  }
</style>
