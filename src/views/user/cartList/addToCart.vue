<template>
  <div>
    <Button color="success" @click="addToCart">Submit</Button>
  </div>
</template>

<script>
import Button from "@/components/shared/button";
export default {
  components: {
    Button
  },
  props: {
    // item: {
    name: String,
    price: String,
    id: String
    // }
  },
  data() {
    return {
      // item: {
      loader: false,
      productName: this.name,
      productPrice: this.price,
      productId: this.id,
      productQuantity: 1
      // }
    };
  },
  methods: {
    addToCart() {
      this.$store.commit("cart/addToCart", this.name);
      this.$emit("cancelForm");
      this.loader = true;
    }
  }
};
</script>

<style>
</style>