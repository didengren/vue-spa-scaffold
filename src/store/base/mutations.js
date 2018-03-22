import * as types from './mutations_types'

export default {
  [types.SET_TOOLTIP] (state, tooltip) {
    state.tooltip.isShow = tooltip.isShow
    state.tooltip.msg = tooltip.msg
  },
  [types.SET_LOADING] (state, isLoading) {
    state.isLoading = isLoading
  }
}
