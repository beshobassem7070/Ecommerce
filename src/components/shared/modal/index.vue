<template>
  <transition name="fade">
    <div class="modal-container" v-if="show" @click.self="$emit('close')">
      <div class="modal-content" :style="{ 'max-width': width + 'px' }">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      dafault: false,
    },
    width: {
      type: Number,
      required: false,
      dafault: 500,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 10px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
  }
  &.fade-enter-active {
    animation: bounce-in 0.5s;
  }
  &.fade-leave-active {
    transition: opacity 0.3s;
  }
  .modal-content {
    width: 90%;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    margin: 50px auto;
    box-sizing: border-box;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
