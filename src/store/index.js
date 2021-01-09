import Vue from "vue";
import Vuex from "vuex";
import AdminStore from "./admin/index";
import cart from "./userCart/index";
import * as firebase from "firebase";
// import * as fb from "./firebase";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
    user: false,
    forgetPasswordd: false,
    login: false,
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
      state.user = true;
    },
  },
  actions: {
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password);

      // create user profile object in userCollections
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          name: form.name,
        });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());
      router.push("/").catch(() => {});
    },
  },

  modules: {
    admin: AdminStore,
    cart: cart,
  },
});
// beshobassem100@gmail.com
