<template>
  <div>
    <!-- Titlebar
================================================== -->
    <div id="titlebar" class="gradient">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Register</h2>

            <!-- Breadcrumbs -->
            <nav id="breadcrumbs" class="dark">
              <ul>
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li>Register</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- Page Content
================================================== -->
    <div class="container">
      <div class="row">
        <div class="col-xl-5 offset-xl-3">
          <RegisterForm />
        </div>
      </div>
    </div>

    <!-- Spacer -->
    <div class="margin-top-70"></div>
    <!-- Spacer / End-->
  </div>
</template>
<script>
export default {};
</script>
