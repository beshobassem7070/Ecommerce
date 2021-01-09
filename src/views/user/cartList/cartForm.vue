<template>
  <form @submit.prevent="submit">
    <label class="form-input-holder">
      <div class="image-preview">
        <img :src="imageUrl" />
      </div>
      <h1 class="input-title">{{form.productName}}</h1>

      <h3>{{form.productPrice}} $</h3>
      <p>{{form.catigoryName}}</p>

      <input type="number" class="form-input" v-model="quantity" />

      <h1>total price {{quantity * form.productPrice}}</h1>
    </label>

    <div class="form-footer">
      <!-- <Button
        type="submit"
        :disabled="loader"
        :loading="loader"
        class="action"
        color="success"
      >Submit</Button>-->
      <Button class="action" @click="cancel">Cancel</Button>
      <AddToCart
        @cancelForm="hideModalHandler"
        :name="form.productName"
        :price="form.productPrice"
        :id="form.documentRef"
      ></AddToCart>
    </div>
  </form>
</template>

<script>
import Button from "@/components/shared/button";
import AddToCart from "./addToCart";

export default {
  props: ["product"],
  data() {
    return {
      imageFile: null,
      imageUrl: null,
      showModal: false,
      showDeleteModal: false,
      form: {
        productName: null,
        productPrice: null,
        catigoryName: null,
        documentRef: null
      },
      loader: false,
      quantity: 1
    };
  },
  components: {
    Button,
    AddToCart
  },

  methods: {
    cancel() {
      this.form = null;
      this.$emit("cancelForm");
    },
    hideModalHandler() {
      this.$message({
        message: "Congrats, the product added success.",
        type: "success"
      });
      this.$emit("cancelForm");
    },

    submit() {
      this.loader = true;
      const callMethod = this.isEditMode ? "editProduct" : "addProduct";
      this[callMethod]().then(() => {
        this.form = null;
        this.imageUrl = null;
        this.$emit("cancelForm");
        this.loader = false;
      });
    },

    fillFormData() {
      const {
        productName,
        productPrice,
        imageUrl,
        documentRef,
        catigoryName
      } = this.product;
      this.form = { productName, productPrice, documentRef, catigoryName };
      this.imageUrl = imageUrl;
    },
    addProduct() {
      return this.$store.dispatch("admin/productModule/submitProductForm", {
        product: this.form,
        imageFile: this.imageFile
      });
    }
  },
  computed: {
    isEditMode() {
      return !!this.product;
    }
  },
  mounted() {
    this.isEditMode && this.fillFormData();
  }
};
</script>

<style lang="scss" scoped>
.form-input-holder {
  margin-bottom: 10px;
  display: block;
  .input-title {
    display: block;
  }
  .form-input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 6px 12px;
    box-sizing: border-box;
  }
  .image-preview {
    max-width: 150px;
    img {
      width: 100%;
    }
  }
}
.form-footer {
  .action {
    margin-right: 10px;
  }
}
</style>
