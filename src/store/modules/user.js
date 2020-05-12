import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, LOGIN_NAME, REFRESH_TOKEN, DEVICE_ID } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    userId: '',
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    roleCode: '',
    roleName: '',
    status: '',
    buttons: [], // 按钮权限
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_BUTTONS: (state, buttons) => {
      state.buttons = buttons
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_ROLE_CODE: (state, roleCode) => {
      state.roleCode = roleCode
    },
    SET_ROLE_NAME: (state, roleName) => {
      state.roleName = roleName
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_AUTH_TREE: (state, authTree) => {
      state.authTree = authTree
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          console.log(24)
          const result = response.result
          console.log(response)
          Vue.ls.set(ACCESS_TOKEN, result.access_token)
          Vue.ls.set(LOGIN_NAME, result.loginName)
          Vue.ls.set(REFRESH_TOKEN, result.refresh_token)
          Vue.ls.set(DEVICE_ID, userInfo.deviceId)
          commit('SET_TOKEN', result.access_token)
          commit('SET_NAME', result.loginName)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }, loginInfo) {
      return new Promise((resolve, reject) => {
        getInfo(loginInfo).then(response => {
          const result = response.result
          if (result.roles) {
            commit('SET_ROLES', result.roles)
            commit('SET_BUTTONS', result.buttons)
            commit('SET_USERID', result.id)
            commit('SET_INFO', result)
            console.log(result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          // console.log(result)
          commit('SET_NAME', { name: result.userName, welcome: welcome() })
          commit('SET_AVATAR', result.avatar || '/avatar2.jpg')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_INFO', {})
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
