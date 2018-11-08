// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';
import { store } from './store';

Vue.use(router);

import vueHeadful from 'vue-headful';
Vue.component('vue-headful', vueHeadful);

import Vuex from 'vuex';
Vue.use(Vuex);

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
} from 'vuetify';
import '../node_modules/vuetify/src/stylus/app.styl';

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
});

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyDlkNMhq68CppJ6jtJUOCIqxzkoZR5Y7dk',
  authDomain: 'forex-ec208.firebaseapp.com',
  databaseURL: 'https://forex-ec208.firebaseio.com',
  projectId: 'forex-ec208',
  storageBucket: 'forex-ec208.appspot.com',
  messagingSenderId: '139288539827'
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  // console.log('isAuthenticated :', isAuthenticated);
  // console.log('requiresAuth :', requiresAuth);
  let documentInfoStatus = localStorage.getItem('documentInfoStatus');
  let expirationTime = localStorage.getItem('expirationTime');
  let config = localStorage.getItem('config');

  var now = new Date().getTime();

  let expire = expirationTime <= now; // exprire == true
  console.log('expire :', expire);
  if (isAuthenticated && !expire) {
    console.log('in session');
    localStorage.setItem('expirationTime', now + 15 * 60000);
    store.dispatch('getNewToken');
  } else {
    console.log('object');
    store.dispatch('userSignOut');
  }

  // if (!config && to.name != 'HomePage' && !documentInfoStatus && !expire) {
  //   await Promise.all([
  //     store.dispatch('getUserInfo'),
  //     store.dispatch('getDocumentInfo')
  //   ]);
  // }
  // indexedDB.deleteDatabase('firebasesessionStorageDb') ;

  if (requiresAuth && !isAuthenticated) {
    console.log('aaaaaaaaaaaaaaa');
    next('/login');
  } else {
    console.log('bbbb');
    store.state.isLoadingPage = false;
    next();
  }
});

/* eslint-disable no-new */
const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser);
      }
    }
  });
  unsubscribe();
});
