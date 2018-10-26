import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Views/Home'
import DetailUser from '@/components/Views/DetailUser'
import DetailDocumentUser from '@/components/Views/DetailDocumentUser'
import DetailVerifyDocument from '@/components/Views/DetailVerifyDocument'
import RejectDocument from '@/components/Views/RejectDocument'
import PaymentRequestDetails from '@/components/Views/PaymentRequestDetails'
import PaymentDetails from '@/components/Views/PaymentDetails'
import PaymentReject from '@/components/Views/PaymentReject'
import DeactiveUser from '@/components/Views/DeactiveUser'
import ListUserStatus from '@/components/Views/ListUserStatus'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/home',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/detail-user',
          name: 'DetailUser',
          component: DetailUser
        },
        {
          path: '/detail-verify-document',
          name: 'DetailVerifyDocument',
          component: DetailVerifyDocument
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
    }
    //   {
    //     path: '/home',
    //     name: 'Home',
    //     component: Home
    //   }
  ]
})
