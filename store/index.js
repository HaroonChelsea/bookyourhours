import Cookie from "js-cookie";

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
        Cookie.set("jwt", res.tokens.access.token);
        document.cookie = "user=" + JSON.stringify(res.user);
        document.cookie = "tokens=" + JSON.stringify(res.tokens);
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
  initAuth(vuexContext, req) {
    let user, tokens;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const userCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("user="));
      const tokenCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("tokens="));

      if (!userCookie || !tokenCookie) {
        return;
      }
      user = JSON.parse(userCookie.split("=")[1]);
      tokens = JSON.parse(tokenCookie.split("=")[1]);
    } else if (process.client) {
      user = JSON.parse(localStorage.getItem("user"));
      tokens = JSON.parse(localStorage.getItem("tokens"));
    }
    if (!tokens || !user) {
      return;
    }
    if (new Date().getTime() > +tokens.access.expires) {
      vuexContext.dispatch("logout");
      return;
    }
    vuexContext.commit("setLoggin", { user, tokens });
  },
  logout(vuexContext) {
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");
    if (process.client) {
      this.$axios.$post("https://bookyourhours.herokuapp.com/v1/auth/logout", {
        refreshToken: vuexContext.state.auth.tokens.refresh.token
      });
      localStorage.removeItem("user");
      localStorage.removeItem("tokens");
    }
    vuexContext.commit("logoutUser");
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
// if (req) {
//   if (!req.headers.cookie) {
//     return;
//   }
//   const jwtCookie = req.headers.cookie
//     .split(";")
//     .find(c => c.trim().startsWith("jwt="));
//   if (!jwtCookie) {
//     return;
//   }
//   tokens = jwtCookie.split("=")[1];
// } else
