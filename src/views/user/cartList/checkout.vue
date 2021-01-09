<template>
  <div>
    <h3>checkout page</h3>
    <hr />
    <!-- <h2>Total Price: {{totalPrice += $store.state.cart.productPrice}}</h2> -->
    <li v-for="item in this.$store.state.cart" :key="item.name">
      <div>{{item[0] }}</div>
    </li>
    <span @click="remove">x</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalPrice: 0
    };
  },
  methods: {
    remove() {
      this.$store.commit("cart/removeFromCart");
    }
  },
  mounted() {
    console.log(this.$store.state.cart);
  }
};
</script>

<style>
</style>