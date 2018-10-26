// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { store } from './store'

Vue.use(router)

import vueHeadful from 'vue-headful'
Vue.component('vue-headful', vueHeadful)

import Vuex from 'vuex'
Vue.use(Vuex)

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  }
})

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyDlkNMhq68CppJ6jtJUOCIqxzkoZR5Y7dk',
  authDomain: 'forex-ec208.firebaseapp.com',
  databaseURL: 'https://forex-ec208.firebaseio.com',
  projectId: 'forex-ec208',
  storageBucket: 'forex-ec208.appspot.com',
  messagingSenderId: '139288539827'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
