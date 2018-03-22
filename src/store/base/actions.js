import * as types from './mutations_types'

export default {
  set_tooltip: ({commit}, obj) => {
    commit(types.SET_TOOLTIP, obj)
  },
  set_loading: ({commit}, isLoading) => {
    commit(types.SET_LOADING, isLoading)
  }
}
