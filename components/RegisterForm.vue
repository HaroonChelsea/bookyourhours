<template>
  <div class="login-register-page">
    <!-- Welcome Text -->
    <div class="welcome-text">
      <h3 style="font-size: 26px;">Let's create your account!</h3>
      <span v-if="$route.name === 'register'"
        >Already have an account?
        <NuxtLink to="/signin">Log in!</NuxtLink></span
      >
    </div>

    <!-- Account Type -->
    <div class="account-type">
      <div>
        <input
          id="freelancer-radio"
          type="radio"
          name="account-type-radio"
          class="account-type-radio"
          checked
        />
        <label for="freelancer-radio" class="ripple-effect-dark"
          ><i class="icon-material-outline-account-circle"></i>
          Freelancer</label
        >
      </div>

      <div>
        <input
          id="employer-radio"
          type="radio"
          name="account-type-radio"
          class="account-type-radio"
        />
        <label for="employer-radio" class="ripple-effect-dark"
          ><i class="icon-material-outline-business-center"></i> Employer</label
        >
      </div>
    </div>
    <div v-if="error.response.status" class="notification error closeable">
      <p>{{ error.response.message }}</p>
      <a
        class="close"
        @click="error.response.status = !error.response.status"
      ></a>
    </div>
    <!-- Form -->
    <form id="register-account-form">
      <small v-if="error.name.status" class="error">
        {{ error.name.message }}
      </small>
      <div class="input-with-icon-left">
        <i class="icon-feather-user"></i>
        <input
          v-model="name"
          type="text"
          class="input-text with-border"
          placeholder="Full name"
        />
      </div>
      <small v-if="error.email.status" class="error">
        {{ error.email.message }}
      </small>
      <div class="input-with-icon-left">
        <i class="icon-material-baseline-mail-outline"></i>
        <input
          id="emailaddress-register"
          v-model="email"
          type="email"
          class="input-text with-border"
          name="emailaddress-register"
          placeholder="Email Address"
        />
      </div>
      <small v-if="error.phone.status" class="error">
        {{ error.phone.message }}
      </small>
      <div class="input-with-icon-left">
        <i class="icon-line-awesome-phone-square"></i>
        <input
          v-model="phone"
          type="tel"
          class="input-text with-border"
          placeholder="Phone Number (xxx xxx xxxx)"
        />
      </div>
      <small v-if="error.password.status" class="error">
        {{ error.password.message }}
      </small>
      <div
        class="input-with-icon-left"
        title="Should be at least 8 characters long"
        data-tippy-placement="bottom"
      >
        <i class="icon-material-outline-lock"></i>
        <input
          id="password-register"
          v-model="password"
          type="password"
          class="input-text with-border"
          name="password-register"
          placeholder="Password"
        />
      </div>
      <small v-if="error.confirmPass.status" class="error">
        {{ error.confirmPass.message }}
      </small>
      <div class="input-with-icon-left">
        <i class="icon-material-outline-lock"></i>
        <input
          id="password-repeat-register"
          v-model="passwordConfirm"
          type="password"
          class="input-text with-border"
          name="password-repeat-register"
          placeholder="Repeat Password"
        />
      </div>
    </form>

    <!-- Button -->
    <button
      class="button full-width button-sliding-icon ripple-effect margin-top-10"
      type="submit"
      @click="userRegister"
    >
      <div v-if="isLoading" class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div v-else>
        Register
        <i class="icon-material-outline-arrow-right-alt"></i>
      </div>
    </button>

    <!-- Social Login -->
    <div class="social-login-separator"><span>or</span></div>
    <div class="social-login-buttons">
      <button class="facebook-login ripple-effect">
        <i class="icon-brand-facebook-f"></i> Register via Facebook
      </button>
      <button class="google-login ripple-effect">
        <i class="icon-brand-google-plus-g"></i> Register via Google+
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      name: null,
      email: null,
      phone: null,
      password: null,
      passwordConfirm: null,
      error: {
        name: {
          status: false,
          message: ""
        },
        email: {
          status: false,
          message: ""
        },
        phone: {
          status: false,
          message: ""
        },
        password: {
          status: false,
          message: ""
        },
        confirmPass: {
          status: false,
          message: ""
        },
        response: {
          status: false,
          message: ""
        }
      }
    };
  },
  methods: {
    async userRegister() {
      if (this.validateForm()) {
        try {
          this.isLoading = true;
          await this.$axios.$post(
            "https://bookyourhours.herokuapp.com/v1/auth/register",
            {
              name: this.name,
              email: this.email,
              password: this.password,
              phoneNumber: this.phone
            }
          );

          await this.$auth
            .loginWith("local", {
              data: {
                email: this.email,
                password: this.password
              }
            })
            .then(res => {
              const data = res.data;
              this.$auth.setUser(data.user);
              this.$auth.setUserToken(
                data.tokens.access.token,
                data.tokens.refresh.token
              );
              this.$auth.$storage.setUniversal("user", data.user, true);
              this.$auth.$storage.setUniversal("tokens", data.tokens, true);
              this.isLoading = false;
            });
          this.$router.push("/");
        } catch (e) {
          this.error.response.status = true;
          this.error.response.message = e.response.data.message;
          this.isLoading = false;
        }
      }
    },
    validateForm() {
      if (this.email && this.password && this.phone) {
        if (!this.validEmail(this.email)) {
          this.error.email.status = true;
          this.error.email.message = "Email address is not valid!";
        }
        if (!this.validPhoneNumber(this.phone)) {
          this.error.phone.status = true;
          this.error.phone.message = "Phone number is not valid!";
        }
        if (!this.validPassword(this.password)) {
          this.error.password.status = true;
          this.error.password.message =
            "Password must be eight characters one letter and one number";
        }
        if (this.password !== this.passwordConfirm) {
          this.error.confirmPass.status = true;
          this.error.confirmPass.message = "Password does not match!";
        }
        if (
          this.error.email.status === false &&
          this.error.phone.status === false &&
          this.error.name.status === false &&
          this.error.password.status === false &&
          this.error.confirmPass.status === false
        ) {
          return true;
        }
      }
      if (!this.name) {
        this.error.name.status = true;
        this.error.name.message = "Name is required!";
      }
      if (!this.email) {
        this.error.email.status = true;
        this.error.email.message = "Email address is required!";
      }
      if (!this.phone) {
        this.error.phone.status = true;
        this.error.phone.message = "Phone number is required!";
      }
      if (!this.password) {
        this.error.password.status = true;
        this.error.password.message = "Password is required!";
      }
      setTimeout(() => {
        this.error.password.status = false;
        this.error.name.status = false;
        this.error.email.status = false;
        this.error.phone.status = false;
        this.error.confirmPass.status = false;
      }, 5000);
    },
    validEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    validPhoneNumber(phoneNumber) {
      const re = /(\d{3})[ -]?(\d{3})[ -]?(\d{4})/g;
      return re.test(phoneNumber);
    },
    validPassword(pass) {
      const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return re.test(pass);
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  border: 3px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
