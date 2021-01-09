<template>
  <div class="product-cart">
    <div>
      <Button color="info" @click="editProduct">
        <i class="el-icon-shopping-cart-2"></i> cart
      </Button>
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
