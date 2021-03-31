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
