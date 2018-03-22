import defaultImg from '../assets/images/head.jpg'

/**
 * 配置图片根域名
 */
export const basePicUrl = process.env.NODE_ENV === 'production'
  ? '' // 线上环境接口 baseURL
  : '' // 本地开发环境接口 baseURL

/**
 * 默认图片地址
 */
export const defaultImgUrl = defaultImg
