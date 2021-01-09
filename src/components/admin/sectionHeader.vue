<template>
  <div class="section-header">
    <h3 class="section-title">
      <slot name="title"></slot>
    </h3>
    <div class="action">
      <Button type="button" class="button-success" @click="fireAddModalEvent">Add</Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/shared/button/index.vue";
export default {
  props: ["addMethod"],
  components: {
    Button
  },
  methods: {
    fireAddModalEvent() {
      this.$emit("addModalEvent");
    }
  }
};
</script>

<style lang="scss" scoped>
.section-header {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  .section-title {
    margin: 0;
  }
}
</style>