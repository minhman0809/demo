<template>
  <v-app>


    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-footer :fixed="fixed" app>
      <span>&copy; IPCOIN 2018</span>
    </v-footer>

  </v-app>
</template>

<script>

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'bubble_chart',
          title: 'Home',
          name: 'Home'
        },
        {
          icon: 'bubble_chart',
          title: 'Detail Document User',
          name: 'DetailDocumentUser'
        },
        {
          icon: 'bubble_chart',
          title: 'Detail Verify Document',
          name: 'DetailVerifyDocument'
        },
        {
          icon: 'bubble_chart',
          title: 'Reject Document',
          name: 'RejectDocument'
        },
        {
          icon: 'bubble_chart',
          title: 'Payment Request',
          name: 'PaymentRequestDetails'
        },
        {
          icon: 'bubble_chart',
          title: 'Payment Details',
          name: 'PaymentDetails'
        },
        {
          icon: 'bubble_chart',
          title: 'Payment Reject',
          name: 'PaymentReject'
        },
        {
          icon: 'bubble_chart',
          title: 'Deactive User',
          name: 'DeactiveUser'
        },
        {
          icon: 'bubble_chart',
          title: 'Detail User',
          name: 'DetailUser'
        },
        {
          icon: 'bubble_chart',
          title: 'List User Status',
          name: 'ListUserStatus'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Admin Site'
    }
  },
  name: 'App'
}
</script>
