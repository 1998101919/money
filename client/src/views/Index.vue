<template>
  <div class="index">
        <HeaderNav></HeaderNav>
        <LeftNav></LeftNav>
        <router-view></router-view>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav'
import LeftNav from '../components/LeftNav'
export default {
  name: 'index',
  components : {
    HeaderNav,
    LeftNav
  }

}
</script>
