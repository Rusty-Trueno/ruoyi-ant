import api from './index'
import { axios, pureAxios } from '@/utils/request'

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
export function login (parameter) {
  console.log(parameter)
  return axios({
    url: '/uac/auth/form',
    method: 'post',
    auth: {
      username: 'ananops-client-uac',
      password: 'ananopsClientSecret'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'deviceId': parameter.deviceId
    },
    params: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo (loginInfo) {
  console.log(loginInfo)
  return axios({
    url: '/uac/user/queryUserInfo/' + loginInfo.userName,
    method: 'post',
    headers: {
      'deviceId': loginInfo.deviceId,
      'Authorization': 'Bearer ' + loginInfo.token
    }
  })
}

export function logout (token) {
  return axios({
    url: '/uac/user/logout',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export function imgcode (deviceId) {
  return pureAxios({
    url: '/uac/auth/code/image',
    method: 'post',
    headers: {
      'deviceId': deviceId
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
