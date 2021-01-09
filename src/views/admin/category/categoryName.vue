<template>
  <form @submit.prevent="submit">
    <label class="form-input-holder">
      <span class="input-title">Category Name:</span>
      <input type="text" class="form-input" v-model="categoryName" />
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
  props: ["selectedCategory"],
  data() {
    return {
      categoryName: null,
      loader: false
    };
  },
  components: {
    Button
  },
  methods: {
    cancel() {
      this.categoryName = null;
      this.$emit("cancelForm");
    },
    addCategory() {
      this.$store.dispatch("admin/submitCategoryForm", {
        name: this.categoryName
      });
    },
    editCategory() {
      return this.$store.dispatch("admin/submitEditCategoryForm", {
        category: { name: this.categoryName },
        documentRef: this.selectedCategory.id
      });
    },
    submit() {
      this.loader = true;
      const callMethod = this.isEditMode ? "editCategory" : "addCategory";
      this[callMethod]().then(() => {
        this.categoryName = null;
        this.$emit("cancelForm");
        this.loader = false;
      });
    },
    fillFormData() {
      this.categoryName = this.selectedCategory.name;
    }
  },
  computed: {
    isEditMode() {
      return !!this.selectedCategory;
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
}
.form-footer {
  .action {
    margin-right: 10px;
  }
}
</style>
