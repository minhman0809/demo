import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import DetailUser from '@/components/DetailUser';
import DetailDocumentUser from '@/components/DetailDocumentUser';
import DetailVerifyDocument from '@/components/DetailVerifyDocument';
import RejectDocument from '@/components/RejectDocument';
import PaymentRequestDetails from '@/components/PaymentRequestDetails';
import PaymentDetails from '@/components/PaymentDetails';
import PaymentReject from '@/components/PaymentReject';
import DeactiveUser from '@/components/DeactiveUser';
import ListUserStatus from '@/components/ListUserStatus';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home,
    //   redirect: '/home',
    //   meta: {
    //     requiresAuth: true
    //   },
    //   children: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail-user',
      name: 'DetailUser',
      component: DetailUser
    },
    {
      path: '/detail-verify-document/:id',
      name: 'DetailVerifyDocument',
      component: DetailVerifyDocument,
      props: true
    },
    {
      path: '/reject-document',
      name: 'RejectDocument',
      component: RejectDocument
    },
    {
      path: '/payment-request',
      name: 'PaymentRequestDetails',
      component: PaymentRequestDetails
    },
    {
      path: '/payment-details',
      name: 'PaymentDetails',
      component: PaymentDetails
    },
    {
      path: '/payment-reject',
      name: 'PaymentReject',
      component: PaymentReject
    },
    {
      path: '/deactive-user',
      name: 'DeactiveUser',
      component: DeactiveUser
    },
    {
      path: '/detail-document-user',
      name: 'DetailDocumentUser',
      component: DetailDocumentUser
    },
    {
      path: '/list-user-status',
      name: 'ListUserStatus',
      component: ListUserStatus
    }
    //     ]
    //   },
    //   {
    //     path: '/home',
    //     name: 'Home',
    //     component: Home
    //   }
  ]
});
