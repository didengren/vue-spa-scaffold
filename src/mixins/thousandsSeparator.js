/* eslint-disable */
// 千位分隔符
export default {
  filters: {
    thousandsSeparator (val) {
      if (isNaN(Number(val))) return val
      return Number(val).toLocaleString()
    }
  }
}