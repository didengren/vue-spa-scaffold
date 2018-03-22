export default {
  methods: {
    falseHints (error) {
      if (error && error.message) {
        this.$store.dispatch('set_tooltip', {
          isShow: true,
          msg: error.message
        })
      }
    }
  }
}
