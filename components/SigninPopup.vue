<template>
  <!-- Sign In Popup
================================================== -->
  <div id="sign-in-dialog" class="zoom-anim-dialog mfp-hide dialog-with-tabs">
    <!--Tabs -->
    <div class="sign-in-form">
      <ul class="popup-tabs-nav">
        <li><a href="#login">Log In</a></li>
        <li><a href="#register">Register</a></li>
      </ul>

      <div class="popup-tabs-container">
        <!-- Login -->
        <div id="login" class="popup-tab-content">
          <SigninForm />
        </div>

        <!-- Register -->
        <div id="register" class="popup-tab-content">
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
