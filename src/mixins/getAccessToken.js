/* eslint-disable */
import {getTokenAPI} from '@/service/api'
import native from '@/tools/native-api.min.js'
import {mapState} from 'vuex'
export default {
    computed: {
      ...mapState({
        userInfo: state => state.base.userInfo
      })
    },
    methods: {
        async getToken () {
            native.getSsoToken().then((res) => {
              // this.$store.dispatch('set_user_info', res)
              this.getAccessToken(res)
            }, (err) => {
              throw new Error(err)
            }).catch((error) => {
              alert(JSON.stringify(error))
            })
        },
        async getAccessToken (res) {
            try {
              let ssoToken = res.ssoToken
              let response = await getTokenAPI(ssoToken, ssoToken)
              let result = response.data
              if (result.bizcode === 10000) {
                if (this.userInfo) {
                  if (!this.userInfo.data) {
                    this.$store.dispatch('set_user_info', result)
                    this.$store.dispatch('set_new_user_sign', true)
                    this.$store.dispatch('set_login', result.data.oAuthToken.access_token)
                    this.initData()
                    return
                  }
                  if (result.data.oAuthToken.access_token === this.userInfo.data.oAuthToken.access_token) {
                    this.$store.dispatch('set_new_user_sign', false)
                  } else {
                    this.$store.dispatch('set_new_user_sign', true)
                    this.$store.dispatch('set_user_info', result)
                  }
                } else {
                  this.$store.dispatch('set_new_user_sign', true)
                  this.$store.dispatch('set_user_info', result)
                }
                this.$store.dispatch('set_login', result.data.oAuthToken.access_token)
                this.initData()
              } else {
                throw new Error('登录异常，请重新登录')
              }
            } catch (error) {
              this.$store.dispatch('set_tooltip', {
                isShow: true,
                msg: error.message
              })
            }
        }
    }
}