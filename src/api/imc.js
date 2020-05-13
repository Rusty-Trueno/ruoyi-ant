import { axios } from '@/utils/request'
import Vue from 'vue'
import { USER_ID, ACCESS_TOKEN, DEVICE_ID } from '@/store/mutation-types'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function transformList (res) {
  const _res = {}
  _res.code = res.code
  _res.message = res.message
  _res.timestamp = new Date().getTime()
  _res.result = {}
  _res.result.pageNum = res.result.pageNum
  _res.result.pageSize = res.result.pageSize
  _res.result.rows = res.result.list
  _res.result.total = parseInt(res.result.total)
  _res.result.totalPage = res.result.pages
  return _res
}

export function getAllPartyAImcTask (parameter) {
  const params = {
    role: 1,
    userId: Vue.ls.get(USER_ID)
  }
  Object.assign(params, parameter)
  return axios({
    url: '/imc/inspectionTask/getTaskListByUserId',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': Vue.ls.get(DEVICE_ID),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: params
  })
}
