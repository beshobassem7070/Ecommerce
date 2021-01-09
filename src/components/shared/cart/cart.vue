<template>
  <div class="product-cart">
    <div class="cart-image">
      <img :src="data.imageUrl" :alt="data.name" />
    </div>
    <div class="cart-body">
      <h2 class="cart-title">{{data.productName}}</h2>
      <p class="product-price">{{data.productPrice}}$</p>
      <p class="product-price">{{data.catigoryName}}</p>
      <div class="admin-actions" v-if="isAdmin">
        <Button color="info" @click="editProduct">Edit</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/shared/button";

export default {
  name: "productCart",
  props: ["data", "isAdmin"],
  components: {
    Button
  },
  methods: {
    editProduct() {
      this.$emit("editProduct", this.data);
    }
  }
};
</script>

<style lang="scss" scoped>
.product-cart {
  position: relative;
  max-width: 300px;
  .cart-image {
    img {
      max-width: 100%;
      display: block;
      border-radius: 5px 5px 0 0;
    }
  }
  .cart-body {
    padding: 20px 15px;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    .cart-title {
      margin-top: 0;
    }
    .admin-actions {
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 30;
    }
  }
}
</style>