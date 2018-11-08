import Vue from 'vue';
import Router from 'vue-router';

/* Components */
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
import Login from '@/components/Login';
import DashboardLayout from '@/components/Layouts/DashboardLayout';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DashboardLayout',
      component: DashboardLayout,
      redirect: '/detail-document-user',
      meta: {
        requiresAuth: true
      },
      children: [
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
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
});
