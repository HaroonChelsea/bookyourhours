export const state = () => ({
  auth: {
    loggedIn: false
  }
});

export const mutations = {
  setLoggin(state, data) {
    state.auth = { ...state, loggedIn: true, ...data };
  },
  logoutUser(state) {
    state.auth = {
      loggedIn: false
    };
  }
};

export const actions = {
  loginUser(vuexContext, userData) {
    return this.$axios
      .$post("https://bookyourhours.herokuapp.com/v1/auth/login", {
        email: userData.email,
        password: userData.password
      })
      .then(res => {
        vuexContext.commit("setLoggin", res);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("tokens", JSON.stringify(res.tokens));
      });
  },
  registerUser(vuexContext, userData) {
    return this.$axios
      .$post("https://bookyourhours.herokuapp.com/v1/auth/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber
      })
      .then(res => {
        vuexContext.commit("setLoggin", res);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("tokens", JSON.stringify(res.tokens));
      });
  },
  logout(vuexContext) {
    this.$axios.$post("https://bookyourhours.herokuapp.com/v1/auth/logout", {
      refreshToken: vuexContext.state.auth.tokens.refresh.token
    });
    vuexContext.commit("logoutUser");
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
    this.$router.push("/");
  },

  initAuth(vuexContext) {
    let user, tokens;
    if (process.client) {
      user = JSON.parse(localStorage.getItem("user"));
      tokens = JSON.parse(localStorage.getItem("tokens"));
    }
    if (!user || !tokens) {
      return;
    }
    vuexContext.commit("setLoggin", { user, tokens });
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  user(state) {
    return state.auth.user;
  }
};
