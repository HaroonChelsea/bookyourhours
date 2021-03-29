<template>
  <!-- Sign In Popup
================================================== -->
  <div
    v-if="!($route.name === 'register' || $route.name === 'signin')"
    id="sign-in-dialog"
    class="zoom-anim-dialog mfp-hide dialog-with-tabs"
  >
    <!--Tabs -->
    <div class="sign-in-form">
      <ul class="popup-tabs-nav">
        <li><a href="#loginForm">Log In</a></li>
        <li><a href="#registerForm">Register</a></li>
      </ul>

      <div class="popup-tabs-container">
        <!-- Login -->
        <div id="loginForm" class="popup-tab-content">
          <SigninForm />
        </div>

        <!-- Register -->
        <div id="registerForm" class="popup-tab-content">
          <RegisterForm />
        </div>
      </div>
    </div>
  </div>
  <!-- Sign In Popup / End -->
</template>
<script>
export default {};
</script>
