<template>
  <div class="home">
    <ProductList />
  </div>
</template>

<script>
import ProductList from "./user/productList";

export default {
  name: "Home",
  components: {
    ProductList
  }
};
</script>

<style lang="scss" scoped>
</style>