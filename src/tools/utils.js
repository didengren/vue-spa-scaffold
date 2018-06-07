/* eslint-disable */
String.prototype.trims = function () {
  return this.replace(/\s/g, '') // this.replace(/^\s+/, '').replace(/\s+$/, '')
}

export const VerifyFn = () => {}
VerifyFn.init = (str) => {
  if (typeof str === 'string') {
    return str.trims()
  }
  return str
}
VerifyFn.prototype = {
  name: (str) => { // 验证用户名
    str = VerifyFn.init(str)
    if (/^[\u4e00-\u9fa50-9a-zA-Z]{2,20}$/.test(str)) {
      return true
    }
    return false
  }
}

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
  console.log(dateObject)
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

export function getNowFormatDate (seperator1) {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
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

/**
 * 加法函数，用来得到精确的加法结果
 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * 调用：accAdd(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 */
export function accAdd (arg1, arg2) {
  var r1, r2, m, c
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    var cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

/**
 * 减法函数，用来得到精确的减法结果
 * 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 * 调用：accSub(arg1,arg2)
 * 返回值：arg1减去arg2的精确结果
 */
export function accSub (arg1, arg2) {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka //动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accMul(arg1,arg2)
 * 返回值：arg1乘以 arg2的精确结果
 */
export function accMul (arg1, arg2) {
  var m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (
    Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  )
}

/**
 * 除法函数，用来得到精确的除法结果
 * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 * 调用：accDiv(arg1,arg2)
 * 返回值：arg1除以arg2的精确结果
 */
export function accDiv (arg1, arg2) {
  var t1 = 0
  var t2 = 0
  var r1, r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return r1 / r2 * Math.pow(10, t2 - t1)
}

/**
 * 强制保留小数点后两位小数
 * 调用：toDecimal2(val)
 * 返回值：保留小数后的val
 */
export function toDecimal2 (val) {
  var f = parseFloat(val)
  if (isNaN(f)) {
    return false
  }
  var f = Math.round(val * 100) / 100
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}

/**
 * 传入rem为单位的数值，返回px为单位的数值
 * @param val
 * @return px为单位的数值
 */
export function backPX (val) {
  return window.rootFontSize * Number(val)
}
