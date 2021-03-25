export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "bookyourhours",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "/css/style.css" },
      { rel: "stylesheet", href: "/css/colors/blue.css" }
    ],
    script: [
      {
        src: "/js/jquery-3.5.1.min.js",
        body: true
      },
      {
        src: "/js/jquery-migrate-3.3.1.min.js",
        body: true
      },
      {
        src: "/js/mmenu.min.js",
        body: true
      },
      {
        src: "/js/tippy.all.min.js",
        body: true
      },
      {
        src: "/js/simplebar.min.js",
        body: true
      },
      {
        src: "/js/bootstrap-slider.min.js",
        body: true
      },
      {
        src: "/js/bootstrap-select.min.js",
        body: true
      },
      {
        src: "/js/snackbar.js",
        body: true
      },
      {
        src: "/js/clipboard.min.js",
        body: true
      },
      {
        src: "/js/counterup.min.js",
        body: true
      },
      {
        src: "/js/magnific-popup.min.js",
        body: true
      },
      {
        src: "/js/slick.min.js",
        body: true
      },
      {
        src: "/js/custom.js",
        body: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
