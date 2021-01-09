import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import productModule from "../admin/productModule";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    productModule,
  },
};
