<template>
  <div id="app">
    <router-view></router-view>
    <div v-if="tooltip.isShow">请求：{{tooltip.msg}}</div>
    <transition name="fade">
      <div v-if="loading">等待。。。</div>
    </transition>
    <!--提示框-->
<!-- <toast
v-model="tooltip.isShow"
type="text"
width="70%">{{tooltip.msg}}
</toast> -->
<!-- <loading
v-model="loading"
text="加载中..."></loading> -->
</div>
</template>

<script>
  import {mapState} from 'vuex'
  // import {Toast, Loading} from 'vux'
  import native from '@/tools/native-api.min.js'
  export default {
    name: 'app',
    components: {
      // Toast,
      // Loading
    },
    data () {
      return {
        loading: false // 用于是否显示加载
      }
},
computed: {
  ...mapState({
    tooltip: state => state.base.tooltip,
    isLoading: state => state.base.isLoading
  })
},
created () {
  native.hideFloat()
  native.hideNav()
  native.changeColor([36, 194, 161, 1])
  native.fullscreen()
},
watch: {
  loading (newVal, oldVal) {
    if (!newVal) {
      this.$store.dispatch('set_loading', newVal)
    }
  },
  isLoading (newVal, oldVal) {
    this.loading = newVal
  }
}
}
</script>

<style lang="less"></style>
