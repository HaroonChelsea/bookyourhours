<template>
  <div id="wrapper">
    <Navbar />
    <div class="clearfix"></div>
    <div class="dashboard-container">
      <SideBar />
      <Nuxt />
    </div>
    <SigninPopup />
    <Footer />
  </div>
</template>
<script>
export default {
  middleware: ["check-auth", "auth"],
  created() {
    this.$store.dispatch("initAuth");
  }
};
</script>
