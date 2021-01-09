export default {
  addToCart(state, item) {
    // let x = 1;
    let found; //= state.cart.find((product) => item == item);
    if (found) {
      // state.cart.push(x++);
    } else {
      state.cart.push(item);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
    // this.commit("saveData");
  },

  // saveData(state) {
  //   window.localStorage.setItem("cart", JSON.stringify(state.cart));
  // },

  removeFromCart(state, item) {
    let index = state.cart.indexOf(item);
    state.cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
};
