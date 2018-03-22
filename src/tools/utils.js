/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStorage = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 手机格式验证
 * @param val
 */
export const telVerify = val => {
  let res
  let reg = /^1(3|4|5|7|8)\d{9}$/
  if (!val) {
    res = {code: false, msg: '手机号码不能为空'}
  } else {
    if (reg.test(val)) {
      res = {code: true, msg: ''}
    } else {
      res = {code: false, msg: '手机号码格式错误'}
    }
  }
  return res
}

/**
 * 密码格式验证
 * @param val
 */
export const pwdVerify = val => {
  let res
  let reg = /^[0-9A-Za-z]{6,12}$/
  if (!val) {
    res = {code: false, msg: '密码不能为空'}
  } else {
    if (reg.test(val)) {
      res = {code: true, msg: ''}
    } else {
      res = {code: false, msg: '密码格式错误'}
    }
  }
  return res
}

/**
 * 格式化时间戳
 */
export const formatDate = function (dateObject, format) {
  var date = {
    'M+': dateObject.getMonth() + 1,
    'd+': dateObject.getDate(),
    'h+': dateObject.getHours(),
    'm+': dateObject.getMinutes(),
    's+': dateObject.getSeconds(),
    'q+': Math.floor((dateObject.getMonth() + 3) / 3),
    'S+': dateObject.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (dateObject.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
}

/**
 * 货币格式
 */
export const formatMoney = function (number, places, symbol, thousand, decimal) {
  number = number || 0
  places = !isNaN(places = Math.abs(places)) ? places : 2
  symbol = symbol !== undefined ? symbol : '$'
  thousand = thousand || ','
  decimal = decimal || '.'
  var negative = number < 0 ? '-' : ''
  var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
  var j = (j = i.length) > 3 ? j % 3 : 0
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}
