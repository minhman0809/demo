/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import firebase from 'firebase'
import routes from '../router'
import VueRouter from 'vue-router'
import vuexI18n from 'vuex-i18n'
import createPersistedState from 'vuex-persistedstate'
import 'vue-tel-input/dist/vue-tel-input.css'
import VueTelInput from 'vue-tel-input'

Vue.use(VueTelInput)

// Define custom validation rule

import translationsEn from '../components/locals/en.json'
import translationsVi from '../components/locals/vi.json'

import VueCurrencyFilter from 'vue-currency-filter'
Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

export const store = new Vuex.Store({
  state: {
    messageStr: '',
    isIdle: false,
    isLoadingPage: true,
    config: {
      headers: {
        Authorization: ''
      }
    },
    documentInfo: '',
    UserInfo: '',
    userFullInfoStatus: '',
    fallback: 'en',
    locale: 'en',
    user: null,
    error: '',
    errorSignIn: '',
    errorSignUp: '',
    loading: false,
    deposit: {
      currentTab: 'deposit'
    },
    dashboard: {
      currentTab: 'Account'
    },
    account: {
      realAccounts: '',
      demoAccounts: ''
    },
    newPassword: '',
    data: {
      servers: '',
      platforms: ''
    },
    currentEmail: ''
  },
  plugins: [
    createPersistedState({
      paths: ['error', 'isLoadingPage']
    })
  ],
  mutations: {
    depositTab(state) {
      state.deposit.currentTab = 'deposit'
    },
    changeActive(state) {
      state.isActive = false
    },
    setDocumentStatus(state, payload) {
      state.documentInfo.status = payload
    },
    setUserInfo(state, payload) {
      state.UserInfo = payload
      if (
        payload.fullname != null &&
        payload.email != null &&
        payload.first_name != null &&
        payload.last_name != null &&
        payload.country != null &&
        payload.date_birth != null &&
        payload.mobile != null &&
        payload.address_1 != null &&
        payload.city != null &&
        payload.state != null &&
        payload.secret_question != null &&
        payload.answer != null
      ) {
        localStorage.setItem('userFullInfoStatus', true)
        state.userFullInfoStatus = true
      } else {
        localStorage.setItem('userFullInfoStatus', false)
        state.userFullInfoStatus = false
      }
    },
    setDocumentInfo(state, payload) {
      var result = {
        message: 'Document is not upload'
      }
      if (payload == result) {
        state.documentInfo = payload
        state.documentInfo = {}
        localStorage.setItem('documentInfoStatus', '')
      } else {
        state.documentInfo = payload
        localStorage.setItem('documentInfoStatus', payload.status)
      }
    },
    setToken(state, payload) {
      state.config.headers.Authorization = payload
    },
    setCulture(state, payload) {
      state.locale = payload
      Vue.i18n.set(state.locale)
    },
    // Authentication
    setUser(state, payload) {
      state.user = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setErrorSignIn(state, payload) {
      state.errorSignIn = payload
    },
    setErrorSignUp(state, payload) {
      state.errorSignUp = payload
    },
    resetError(state, payload) {
      state.error = ''
    },
    resetErrorSignIn(state, payload) {
      state.errorSignIn = ''
    },
    resetErrorSignUp(state, payload) {
      state.errorSignUp = ''
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    // Change active class for tabs
    setCurrentTab(state, payload) {
      state.deposit.currentTab = payload
    },
    setDashboardTab(state, payload) {
      state.dashboard.currentTab = payload
    },
    // Api
    setRealAccounts(state, payload) {
      state.account.realAccounts = payload
    },
    setDemoAccounts(state, payload) {
      state.account.demoAccounts = payload
    },
    setServers(state, payload) {
      state.data.servers = payload
    },
    setPlatforms(state, payload) {
      state.data.platforms = payload
    }
  },
  actions: {
    getIsLoadingPage({ commit, state }) {
      // commit ('setIsLoadingPage', false)
      state.isLoadingPage = false
    },
    getUser({ commit, state }) {
      axios
        .get(
          'http://103.42.58.128:5000/api/1.0/users/me',
          JSON.parse(localStorage.getItem('config'))
        )
        .then(response => {
          if (response.data == {}) {
            state.status = 'uncreate'
          }
          // if (response.data.id) {
          //   this.UserId = response.data.id
          // }
        })
        .catch(function() {})
    },
    defaultDepositTab({ commit }) {
      console.log('default deposit')
      commit('depositTab')
    },
    getToggle({ commit }, payload) {
      commit('setToggle', payload)
    },
    getDocumentStatus({ commit }, payload) {
      commit('setDocumentStatus', payload)
    },
    async getUserInfo({ commit }, payload) {
      await axios
        .get(
          'http://103.42.58.128:5000/api/1.0/users/me',
          JSON.parse(localStorage.getItem('config'))
        )
        .then(response => {
          if (response.data) {
            commit('setUserInfo', response.data)
          }
        })
        .catch(function() {
          console.log('FAILURE TO GET getUserInfo!!')
          commit('setUserInfo', {})
        })
    },
    async getDocumentInfo({ commit }, payload) {
      await axios
        .get(
          'http://103.42.58.128:5000/api/1.0/users/document',
          JSON.parse(localStorage.getItem('config'))
        )
        .then(response => {
          console.log('ok getDocumentInfo')
          commit('setDocumentInfo', response.data)
        })
        .catch(function() {
          commit('setDocumentInfo', {})
        })
    },
    initializeToken({ commit }, payload) {
      commit('setToken', payload)
    },
    // Translate
    changeCulture({ commit }, payload) {
      commit('setCulture', payload)
    },
    // Authentication Actions
    userSignUp({ commit, state, dispatch }, payload) {
      commit('setLoading', true)
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(async firebaseUser => {
          commit('setUser', {
            email: firebaseUser.email
          })
          commit('setLoading', false)
          let user = firebase.auth().currentUser
          user
            .sendEmailVerification()
            .then(function() {})
            .catch(function(error) {
              commit('setErrorSignUp', error.message)
            })
          commit(
            'setErrorSignUp',
            'Create account successfully. Please verify your email'
          )
          await dispatch('userSignOut')
        })
        .catch(error => {
          commit('setErrorSignUp', error.message)
        })
    },
    async userSignIn({ commit, dispatch, state }, payload) {
      commit('setLoading', true)
      var resultToken = false
      await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(function(firebaseUser) {
          // Refresh token after 55'(3300s)
          setTimeout(function() {
            dispatch('getNewToken')
          }, 3300000)
          commit('setUser', {
            email: firebaseUser.email
          })
          commit('setLoading', false)
          commit('setError', null)
          console.log('sign in')
          state.currentEmail = firebase.auth().currentUser.email
          firebase
            .auth()
            .currentUser.getIdToken()
            .then(async data => {
              console.log('gettoken')
              let myconfig = {
                headers: {
                  Authorization: 'Bearer ' + data
                }
              }
              localStorage.setItem('config', JSON.stringify(myconfig))
              resultToken = true
              // dispatch('getRealAccounts')
              if (firebase.auth().currentUser.emailVerified) {
                // routes.go('/')
                await store.dispatch('createUser')
                routes.replace('/')
              } else {
                console.log('Have to verify')
                commit('setErrorSignIn', 'You have to verify email.')
                // state.emailVerified = false
                // state.UserInfo.email = 'fail'
                await dispatch('userSignOut')
              }
            })
            .catch(error => {
              commit('setErrorSignIn', error.message)
              commit('setLoading', false)
            })
        })
        .catch(error => {
          resultToken = false
          console.log(error)
          commit('setErrorSignIn', error.message)
        })

      routes.replace('/')
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', {
        email: payload.email
      })
    },
    userSignOut({ commit, state }) {
      localStorage.removeItem('config')
      localStorage.removeItem('documentInfoStatus')
      localStorage.removeItem('userFullInfoStatus')
      localStorage.removeItem('userFullInfoStatusLocalStorage')
      firebase.auth().signOut()
      commit('setUser', null)
      routes.replace('/home')
    },
    // Execute changing tab in Deposit
    changeDepositTab({ commit }, payload) {
      commit('setCurrentTab', payload)
    },
    changeDashboardTab({ commit }, payload) {
      commit('setDashboardTab', payload)
    },
    createUser({ commit, dispatch, state }) {
      console.log('current token', JSON.parse(localStorage.getItem('config')))
      axios
        .post(
          'http://103.42.58.128:5000/api/1.0/users',
          {},
          JSON.parse(localStorage.getItem('config'))
        )
        .then(resp => {
          console.log('creating user')
        })
        .catch(error => {
          console.log(error)
          console.log('error creating user', error.message)
        })
    },
    // Implement Get & Post Api
    getRealAccounts({ commit, state }) {
      axios
        .get(
          'http://103.42.58.128:5000/api/1.0/real-accounts',
          JSON.parse(localStorage.getItem('config'))
        )
        .then(resp => {
          let data = resp.data.real_accounts
          commit('setRealAccounts', data)
        })
        .catch(error => {
          commit('setRealAccounts', [])
        })
    },
    createRealAccount({ commit, dispatch, state }, payload) {
      axios
        .post(
          'http://103.42.58.128:5000/api/1.0/real-accounts/generate',
          payload,
          JSON.parse(localStorage.getItem('config'))
        )
        .then(resp => {
          dispatch('getRealAccounts')
        })
        .catch(error => {
          console.log(error)
        })
    },
    getOneRealAccount({ commit, state }, payload) {
      let url = 'http://103.42.58.128:5000/api/1.0/real-accounts/' + payload.id
      axios
        .get(url, JSON.parse(localStorage.getItem('config')))
        .then(resp => {})
    },
    changeLeverageRealAccount({ commit, dispatch, state }, payload) {
      let url =
        'http://103.42.58.128:5000/api/1.0/real-accounts/' +
        payload.id +
        '/change-leverage'
      axios
        .put(url, payload.data, JSON.parse(localStorage.getItem('config')))
        .then(resp => {
          dispatch('getRealAccounts')
        })
    },
    changePasswordRealAccount({ commit, state }, payload) {
      let url =
        'http://103.42.58.128:5000/api/1.0/real-accounts/' +
        payload.id +
        '/change-password'
      axios
        .put(url, payload.data, JSON.parse(localStorage.getItem('config')))
        .then(resp => {})
    },
    getDemoAccounts({ commit, state }) {
      axios
        .get(
          'http://103.42.58.128:5000/api/1.0/demo-accounts',
          JSON.parse(localStorage.getItem('config'))
        )
        .then(resp => {
          let data = resp.data
          commit('setDemoAccounts', data)
        })
    },
    createDemoAccount({ commit, state, dispatch }, payload) {
      axios
        .post(
          'http://103.42.58.128:5000/api/1.0/demo-accounts',
          payload,
          JSON.parse(localStorage.getItem('config'))
        )
        .then(resp => {
          dispatch('getDemoAccounts')
        })
    },
    getOneDemoAccount({ commit, state }, payload) {
      let url = 'http://103.42.58.128:5000/api/1.0/demo-accounts/' + payload.id
      axios
        .get(url, JSON.parse(localStorage.getItem('config')))
        .then(resp => {})
    },
    changeLeverageDemoAccount({ commit, state, dispatch }, payload) {
      let url =
        'http://103.42.58.128:5000/api/1.0/demo-accounts/' +
        payload.id +
        '/change-leverage'
      axios
        .put(url, payload.data, JSON.parse(localStorage.getItem('config')))
        .then(resp => {
          dispatch('getDemoAccounts')
        })
    },
    changePasswordDemoAccount({ commit, state }, payload) {
      let url =
        'http://103.42.58.128:5000/api/1.0/demo-accounts/' +
        payload.id +
        '/change-password'
      axios
        .get(url, payload.password, JSON.parse(localStorage.getItem('config')))
        .then(resp => {})
    },
    // API Server & Platform
    getServer({ commit, state }) {
      let url = 'http://103.42.58.128:5000/api/1.0/servers'
      axios.get(url, JSON.parse(localStorage.getItem('config'))).then(resp => {
        let data = resp.data
        commit('setServers', data)
      })
    },
    getPlatform({ commit, state }) {
      let url = 'http://103.42.58.128:5000/api/1.0/platforms'
      axios.get(url, JSON.parse(localStorage.getItem('config'))).then(resp => {
        let data = resp.data
        commit('setPlatforms', data)
      })
    },
    updatePassword({ commit }, payload) {
      let user = firebase.auth().currentUser
      user
        .updatePassword(payload)
        .then(function() {
          // Update successful
        })
        .catch(function(error) {
          alert('You have to re-sign in!')
          // An error happened
        })
    },
    getNewToken() {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(async data => {
          console.log('Get new token success')
        })
        .catch(error => {
          alert('Error get new token', error.message)
        })
    },
    test() {
      console.log('hello')
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined
    }
  }
})

Vue.use(vuexI18n.plugin, store)

Vue.i18n.add('en', translationsEn)
Vue.i18n.add('vi', translationsVi)

Vue.i18n.set('en')
