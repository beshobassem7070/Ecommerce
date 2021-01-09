<template>
  <button
    :type="type"
    :class="['button', `button-${color}`]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot v-if="!loading"></slot>
    <Loading :size="'small'" v-else></Loading>
  </button>
</template>

<script>
import Loading from "@/components/shared/loading";

export default {
  name: "Button",
  components: {
    Loading,
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "button",
    },
    color: {
      type: String,
      required: false,
      default: "default",
      validator: function(value) {
        return ["default", "success", "error", "info"].indexOf(value) !== -1;
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  border: none;
  background: #eee;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &-success {
    background: #42b983;
    color: #fff;
  }
  &-error {
    background: #f44336;
    color: #fff;
  }
  &-info {
    background: #81d4fa;
  }

  &:hover {
    box-shadow: 2px 2px 5px grey;
  }
  &:focus {
    outline: none;
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
