<template>
  <div>
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 image-header">
            <img class="img-fluid" src="@/assets/image/e-commerce.png" width="800" height="800" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <div v-for="item in filteredItems" :key="item.id">
        <p>{{item.name}}</p>
      </div>

      <input type="text" v-model="search" />-->
      <div v-if="products" class="container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-6" v-for="product of products" :key="product.id">
            <ul class="products-page">
              <li class="product">
                <CartList :data="product" :isAdmin="true" @editProduct="showModalHandler"></CartList>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Loading v-else color="green" size="large" class="page-loading"></Loading>
    </div>

    <Modal :show="showModal" @close="hideModalHandler">
      <Button @click="hideModalHandler">Close</Button>
      <CartForm @cancelForm="hideModalHandler" :product="selectedProduct" />
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/shared/modal";
import Button from "@/components/shared/button";
import Loading from "@/components/shared/loading";
import CartForm from "../cartList/cartForm";
import CartList from "../cartList";

export default {
  components: {
    Modal,
    Button,
    Loading,
    CartForm,
    CartList
  },
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      selectedProductToDelet: null,
      loader: false,
      selectedProduct: null,
      search: ""
      // items: this.$store.state.admin.productModule.products
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
    }
  },
  mounted() {
    this.$store.dispatch("admin/productModule/getProducts");
    // console.log(this.$store.state.admin.productModule.products);
  },
  computed: {
    products() {
      return this.$store.state.admin.productModule.products;
    }
    // filteredItems() {
    //   return this.items.filter(item => {
    //     return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
.image-header {
  margin: auto;
  text-align: center;
  .img-fluid {
    margin-top: -170px;
  }
}

.products-page {
  // margin-top: 50px;
  // display: flex;
  // flex-wrap: wrap;
  li {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // background-color: #fff;
    // // box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    // padding: 15px;
    // border-radius: 5px;
    // box-sizing: border-box;
    // flex-basis: calc(30% - 20px);
    // margin: 15px 10px 0 auto;

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
