<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  created() {
    if (localStorage.eleToken) {
      const newToken = jwt_decode(localStorage.eleToken)
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(newToken));
      this.$store.dispatch("setUser", newToken);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>


<style scoped>
</style>

