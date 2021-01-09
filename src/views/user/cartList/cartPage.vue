<template>
  <div>
    <div>
      <ul class="products-page" v-if="products">
        <modalCart :isAdmin="true" @editProduct="showModalHandler"></modalCart>
      </ul>
    </div>

    <Modal :show="showModal" @close="hideModalHandler">
      <Button @click="hideModalHandler">Close</Button>
      <h3>cart</h3>
      <hr />
      <li v-for="item in this.$store.state.cart" :key="item.id">
        {{ item }}
        <span @click="remove">x</span>
      </li>
      <router-link to="/checkout" class="btn btn-primary">checkout</router-link>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/shared/modal";
import Button from "@/components/shared/button";
import modalCart from "./modalCart.vue";

export default {
  components: {
    Modal,
    Button,
    modalCart
  },
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      selectedProductToDelet: null,
      loader: false,
      selectedProduct: null
    };
  },
  methods: {
    showModalHandler(product) {
      this.showModal = true;
      this.selectedProduct = product;
    },
    hideModalHandler() {
      this.showModal = false;
      this.showDeleteModal = false;
    },

    showDeleteModalHandeler(id) {
      this.showDeleteModal = true;
      this.selectedProductToDelet = id;
    },
    deleteProduct(id) {
      this.loader = true;
      this.$store.dispatch("admin/productModule/deleteProduct", id).then(() => {
        this.selectedProductToDelet = null;
        this.showDeleteModal = false;
        this.loader = false;
      });
    },
    remove() {
      this.$store.commit("cart/removeFromCart");
    }
  },
  mounted() {
    this.$store.dispatch("admin/productModule/getProducts");
    console.log(this.$store.state.cart);
  },
  computed: {
    products() {
      return this.$store.state.admin.productModule.products;
    }
  }
};
</script>

<style lang="scss" scoped>
.products-page {
  display: flex;
  flex-wrap: wrap;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 5px;
    box-sizing: border-box;
    flex-basis: calc(50% - 20px);
    margin: 15px 10px 0;

    &:hover {
      background: none;
    }
    .delete-product {
      font-size: 11px;
    }
  }
}
.page-loading {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 150px;
}
h3 {
  text-align: center;
}
.action {
  margin-left: 10px;
}
</style>
