<template>
  <div class="HomePage">
    <!-- <side-bar v-bind:test="test" /> -->
    <!-- <div class="Content-MenuBar tab-content test" id="v-pills-tabContent">  -->
    <!-- <top-nav-bar /> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- </div> -->
  </div>
</template>
<script>
// import TopNavBar from './TopNavBar.vue';
// import SideBar from './SideBar.vue';
import { mapState } from 'vuex';

export default {
  data () {
    return {
    };
  },
  // components: {
  //   TopNavBar,
  //   SideBar
  // }
};
</script>
<style>
</style>
