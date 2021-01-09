<template>
  <div>
    <SectionHeader @addModalEvent="showModalHandler">
      <template #title>cateories list</template>
      <template #action></template>
    </SectionHeader>

    <div>
      <ul class="categories-page" v-if="categories">
        <li class="category" v-for="category of categories" :key="category.id">
          {{ category.name }}
          <div>
            <Button
              class="delete-category"
              color="error"
              @click="showDeleteModalHandeler(category.id)"
            >DELETE</Button>

            <Button class="edit-category" color="info" @click="showModalHandler(category)">EDIT</Button>
          </div>
        </li>
      </ul>
      <Loading v-else color="green" size="large" class="page-loading"></Loading>
    </div>

    <Modal :show="showModal" @close="hideModalHandler">
      <Button @click="hideModalHandler">Close</Button>
      <CategoryName @cancelForm="hideModalHandler" :selectedCategory="selectedCategory" />
    </Modal>

    <Modal :show="showDeleteModal" @close="hideModalHandler" :width="350">
      <h3>Are you sure delete this category ?</h3>
      <Button
        color="error"
        :disabled="loader"
        :loading="loader"
        @click="deleteCategory(selectedCategoryToDelet)"
      >delete</Button>
      <Button @click="hideModalHandler" class="action">close</Button>
    </Modal>
  </div>
</template>

<script>
import SectionHeader from "@/components/admin/sectionHeader";
import Modal from "@/components/shared/modal";
import Button from "@/components/shared/button";
import Loading from "@/components/shared/loading";
import CategoryName from "./categoryName";
export default {
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      selectedCategoryToDelet: null,
      loader: false,
      selectedCategory: null
    };
  },
  components: {
    SectionHeader,
    Modal,
    Button,
    CategoryName,
    Loading
  },
  methods: {
    showModalHandler(category) {
      this.showModal = true;
      this.selectedCategory = category;
    },
    hideModalHandler() {
      this.showModal = false;
      this.showDeleteModal = false;
    },

    showDeleteModalHandeler(id) {
      this.showDeleteModal = true;
      this.selectedCategoryToDelet = id;
    },
    deleteCategory(id) {
      this.loader = true;
      this.$store.dispatch("admin/deleteCategory", id).then(() => {
        this.selectedCategoryToDelet = null;
        this.showDeleteModal = false;
        this.loader = false;
      });
    }
  },
  mounted() {
    this.$store.dispatch("admin/getCategories");
  },
  computed: {
    categories() {
      return this.$store.state.admin.categories;
    }
  }
};
</script>

<style lang="scss" scoped>
.categories-page {
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
    .delete-category {
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
