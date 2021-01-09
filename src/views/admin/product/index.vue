<template>
  <div>
    <SectionHeader @addModalEvent="showModalHandler">
      <template #title>products list</template>
      <template #action></template>
    </SectionHeader>

    <div>
      <ul class="products-page" v-if="products">
        <li class="product" v-for="product of products" :key="product.id">
          <Cart
            :data="product"
            :isAdmin="true"
            @editProduct="showModalHandler"
          ></Cart>

          <Button
            class="delete-product"
            color="error"
            @click="showDeleteModalHandeler(product.id)"
            >DELETE</Button
          >
        </li>
      </ul>
      <Loading v-else color="green" size="large" class="page-loading"></Loading>
    </div>

    <Modal :show="showModal" @close="hideModalHandler">
      <Button @click="hideModalHandler">Close</Button>
      <ProductForm @cancelForm="hideModalHandler" :product="selectedProduct" />
    </Modal>

    <Modal :show="showDeleteModal" @close="hideModalHandler" :width="350">
      <h3>Are you sure delete this product ?</h3>
      <Button
        color="error"
        :disabled="loader"
        :loading="loader"
        @click="deleteProduct(selectedProductToDelet)"
        >delete</Button
      >
      <Button @click="hideModalHandler" class="action">close</Button>
    </Modal>
  </div>
</template>

<script>
import SectionHeader from "@/components/admin/sectionHeader";
import Modal from "@/components/shared/modal";
import Button from "@/components/shared/button";
import Loading from "@/components/shared/loading";
import ProductForm from "./productForm";
import Cart from "@/components/shared/cart/cart";
export default {
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      selectedProductToDelet: null,
      loader: false,
      selectedProduct: null,
    };
  },
  components: {
    SectionHeader,
    Modal,
    Button,
    Loading,
    ProductForm,
    Cart,
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
  },
  mounted() {
    this.$store.dispatch("admin/productModule/getProducts");
  },
  computed: {
    products() {
      return this.$store.state.admin.productModule.products;
    },
  },
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
