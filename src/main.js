import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

import * as firebase from "firebase";
Vue.prototype.firebase = firebase;

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyAUuy3cpoKoPKjWJmY6DMt9ONUZC2ko9p4",
      authDomain: "vue-ecommerce-67529.firebaseapp.com",
      databaseURL: "https://vue-ecommerce-67529.firebaseio.com",
      projectId: "vue-ecommerce-67529",
      storageBucket: "vue-ecommerce-67529.appspot.com",
      messagingSenderId: "349698086535",
      appId: "1:349698086535:web:14bc33bcdb8140e51d8a22",
      measurementId: "G-W411VJ5EF7",
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  },
}).$mount("#app");
