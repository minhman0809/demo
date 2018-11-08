/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import firebase from 'firebase';
import routes from '../router';
import VueRouter from 'vue-router';
import vuexI18n from 'vuex-i18n';
import createPersistedState from 'vuex-persistedstate';
import 'vue-tel-input/dist/vue-tel-input.css';
import VueTelInput from 'vue-tel-input';

Vue.use(VueTelInput);

// Define custom validation rule

import translationsEn from '../components/locals/en.json';
import translationsVi from '../components/locals/vi.json';

import VueCurrencyFilter from 'vue-currency-filter';
Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
});

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

export const store = new Vuex.Store({
  state: {
    isLoadingPage: false,
    isIdle: false,
    config: {
      headers: {
        Authorization: ''
      }
    },
    userFullInfoStatus: '',
    fallback: 'en',
    locale: 'en',
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
    slideCurrency: '',
    lastLoginAt: '',
    // Firebase
    loading: false,
    user: null,
    error: '',
    errorSignIn: '',
    errorSignUp: '',
    errorForgot: '',
    currentEmail: null
  },

  plugins: [
    createPersistedState({
      paths: ['isLoadingPage']
    })
  ],
  mutations: {
    // translate
    setCulture(state, payload) {
      state.locale = payload;
      Vue.i18n.set(state.locale);
    },
    // Performance
    setIsLoadingPage(state, payload) {
      state.isLoadingPage = payload.set;
    },
    // Authentication
    setToken(state, payload) {
      state.config.headers.Authorization = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setCurrentEmail(state, payload) {
      state.currentEmail = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setErrorSignIn(state, payload) {
      state.errorSignIn = payload;
    },
    setErrorSignUp(state, payload) {
      state.errorSignUp = payload;
    },
    setErrorForgot(state, payload) {
      state.errorForgot = payload;
    },
    resetError(state, payload) {
      state.error = '';
    },
    resetCurrentEmail(state) {
      state.currentEmail = null;
    },
    resetErrorSignIn(state, payload) {
      state.errorSignIn = '';
    },
    resetErrorSignUp(state, payload) {
      state.errorSignUp = '';
    },
    resetErrorForgot(state, payload) {
      state.errorForgot = '';
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    getNewToken() {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(async data => {
          console.log('Get new token success');
        })
        .catch(error => {
          console.log('Error get new token', error);
        });
    },
    userSignUp({ commit, state, dispatch }, payload) {
      commit('setIsLoadingPage', {
        set: true
      });
      commit('setLoading', true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(async firebaseUser => {
          commit('setUser', {
            email: firebaseUser.email
          });
          commit('setLoading', false);

          await firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(async function(firebaseUser) {
              // Refresh token after 55'(3300s)
              commit('setUser', {
                email: firebaseUser.email
              });
              commit('setLoading', false);
              commit('setError', null);
              // commit('setCurrentEmail', firebase.auth().currentUser.email)
              await firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(async data => {
                  // console.log('gettoken');
                  let myconfig = {
                    headers: {
                      Authorization: 'Bearer ' + data
                    }
                  };
                  localStorage.setItem('config', JSON.stringify(myconfig));
                  resultToken = true;
                })
                .catch(error => {
                  // Error tao acc moi, Hoac acc da ton tai
                  commit('setErrorSignIn', error.message);
                  commit('setLoading', false);
                });
            })
            .catch(error => {
              resultToken = false;
              // ERROR login
              commit('setErrorSignIn', error.message);
              commit('setIsLoadingPage', {
                set: false
              });
            });

          let user = firebase.auth().currentUser;
          user
            .sendEmailVerification()
            .then(function() {})
            .catch(function(error) {
              commit('setErrorSignUp', error.message);
            });
          commit(
            'setErrorSignUp',
            'Create account successfully. Please verify your email'
          );
          await dispatch('userSignOut');
          commit('setIsLoadingPage', {
            set: false
          });
        })
        .catch(error => {
          commit('setErrorSignUp', error.message);
          commit('setIsLoadingPage', {
            set: false
          });
        });
    },
    async userSignIn({ commit, dispatch }, payload) {
      console.log('sign in');
      commit('setLoading', true);
      commit('setIsLoadingPage', {
        set: true
      });
      var resultToken = false;
      await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(async function(firebaseUser) {
          let expirationTime = new Date().getTime() + 15 * 60000;
          localStorage.setItem('expirationTime', expirationTime);
          // Delete get new token here
          // setInterval(function() {
          //   dispatch('getNewToken');
          // }, 3300000);
          commit('setUser', {
            email: firebaseUser.email
          });
          commit('setLoading', false);
          commit('setError', null);
          localStorage.setItem(
            'currentEmail',
            firebase.auth().currentUser.email
          );
          await firebase
            .auth()
            .currentUser.getIdToken()
            .then(async data => {
              // console.log('gettoken');
              let myconfig = {
                headers: {
                  Authorization: 'Bearer ' + data
                }
              };
              localStorage.setItem('config', JSON.stringify(myconfig));
              resultToken = true;
              routes.replace('/');
              // if (firebase.auth().currentUser.emailVerified) {
              //   // await Promise.all([
              //   //   store.dispatch('getUserInfo'),
              //   //   store.dispatch('getDocumentInfo')
              //   // ]);
              // } else {
              //   // console.log('Have to verify');
              //   commit('setErrorSignIn', 'You have to verify email.');
              //   await dispatch('userSignOut');
              //   commit('setIsLoadingPage', {
              //     set: false
              //   });
              // }
            })
            .catch(error => {
              commit('setErrorSignIn', error.message);
              commit('setLoading', false);
              commit('setIsLoadingPage', {
                set: false
              });
            });
        })
        .catch(error => {
          resultToken = false;
          commit('setErrorSignIn', error.message);
          commit('setIsLoadingPage', { set: false });
        });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', {
        email: payload.email
      });
    },
    async userSignOut({ commit, state }) {
      await firebase.auth().signOut();
      localStorage.clear();
      // localStorage.removeItem('config');
      // localStorage.removeItem('documentInfoStatus');
      // localStorage.removeItem('userFullInfoStatus');
      // localStorage.removeItem('userFullInfoStatusLocalStorage');
      // localStorage.removeItem('expirationTime');
      commit('resetCurrentEmail');
      commit('setUser', null);
      await routes.replace('/login');
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  }
});

Vue.use(vuexI18n.plugin, store);

Vue.i18n.add('en', translationsEn);
Vue.i18n.add('vi', translationsVi);

Vue.i18n.set('en');
