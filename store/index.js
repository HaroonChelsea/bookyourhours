export const state = () => ({
  token: null
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  }
};

export const actions = {
  loginUser(vuexContext, userData) {
    return this.$axios
      .$post("https://bookyourhours.herokuapp.com/v1/auth/login", {
        email: userData.email,
        password: userData.password
      })
      .then(res => vuexContext.commit("setToken", res.tokens));
  },
  registerUser(vuexContext, userData) {
    return this.$axios
      .$post("https://bookyourhours.herokuapp.com/v1/auth/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber
      })
      .then(res => vuexContext.commit("setToken", res.tokens));
  }
};

export const getters = {};
