<template>
  <form @submit.prevent="submit">
    <label class="form-input-holder">
      <span class="input-title">product Name:</span>
      <input type="text" class="form-input" v-model="form.productName" />
    </label>

    <label class="form-input-holder">
      <span class="input-title">product price:</span>
      <input type="text" class="form-input" v-model="form.productPrice" />
    </label>

    <label class="form-input-holder">
      <span class="input-title">product image:</span>
      <div class="image-preview">
        <img :src="imageUrl" />
      </div>
      <input type="file" class="form-input" @change="imageFileChangeHandler" accept="image/*" />
    </label>

    <label class="form-input-holder">
      <span>category</span>
      <select v-model="form.catigoryName">
        <option v-for="cat of categories" :key="cat.id">{{ cat.name }}</option>
      </select>
    </label>

    <div class="form-footer">
      <Button
        type="submit"
        :disabled="loader"
        :loading="loader"
        class="action"
        color="success"
      >Submit</Button>
      <Button class="action" @click="cancel">Cancel</Button>
    </div>
  </form>
</template>

<script>
import Button from "@/components/shared/button";
export default {
  props: ["product"],
  data() {
    return {
      imageFile: null,
      imageUrl: null,
      form: {
        productName: null,
        productPrice: null,
        catigoryName: null,
        id: null
      },
      loader: false,
      reader: new FileReader()
    };
  },
  components: {
    Button
  },
  created() {
    this.reader.onload = () => {
      this.imageUrl = this.reader.result;
    };
  },
  methods: {
    cancel() {
      this.form = null;
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

    imageFileChangeHandler(event) {
      this.imageFile = event.target.files[0];
      this.reader.readAsDataURL(this.imageFile);
    },
    fillFormData() {
      const {
        productName,
        productPrice,
        imageUrl,
        catigoryName
      } = this.product;
      this.form = { productName, productPrice, catigoryName };
      this.imageUrl = imageUrl;
    },
    addProduct() {
      return this.$store.dispatch("admin/productModule/submitProductForm", {
        product: this.form,
        imageFile: this.imageFile
      });
    },
    editProduct() {
      return this.$store.dispatch("admin/productModule/sumbitEditProductForm", {
        product: this.form,
        documentRef: this.product.id,
        imageFile: this.imageFile
      });
    }
  },
  computed: {
    isEditMode() {
      return !!this.product;
    },
    categories() {
      return this.$store.state.admin.categories;
    }
  },
  mounted() {
    this.isEditMode && this.fillFormData();
    this.$store.dispatch("admin/getCategories");

    console.log(this.$store.state.categories);
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
