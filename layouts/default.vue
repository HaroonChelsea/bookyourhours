<template>
  <div id="wrapper">
    <Navbar />
    <div class="clearfix"></div>
    <Nuxt />
    <SigninPopup
      v-if="!($route.name === 'register' || $route.name === 'signin')"
    />
    <Footer />
  </div>
</template>
<script>
export default {
  name: "Default",
  middleware: "check-auth",
  created() {
    this.$store.dispatch("initAuth");
  }
};
</script>
