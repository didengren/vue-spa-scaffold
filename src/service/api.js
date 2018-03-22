import qs from 'qs'
import axios from './axios'

/**
 * card-order
 * 续卡申请记录列表
 * url:'/api/care/salelist'
 * method:post
 * @param:{member_id：0}
 */
export const getCardOrderListAPI = (userId, status, size = 10, page = 1) => { // 续卡申请记录列表
  return axios.post('/api/care/salelist', qs.stringify({
    member_id: userId,
    type: status,
    limit: size,
    page: page
  }))
}

/**
 * 审核确认
 * url:'/ceo/ThBigScreen/queryModelUrl'
 * method:post
 * @param modelId
 */
export const testAPI = (modelId) => { // 续卡支付
  return axios.post('/ceo/ThBigScreen/queryModelUrl', qs.stringify({
    modelId: modelId
  }))
}
