<template>
  <div>
    <div :class="['lds-ring', `size-${size}`, `color-${color}`]">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      required: false,
      default: "default",
      validator: function(value) {
        return ["default", "small", "large"].indexOf(value) !== -1;
      },
    },
    color: {
      type: String,
      required: false,
      default: "default",
      validator: function(value) {
        return ["default", "white", "green"].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring {
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 35px;
    height: 35px;
    border: 5px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  &.size-small,
  &.size-small div {
    width: 20px;
    height: 20px;
    border-width: 3px;
  }
  &.size-large,
  &.size-large div {
    width: 51px;
    height: 51px;
    border-width: 7px;
  }
  &.color-green div {
    border: 5px solid #42b983;
    border-color: #42b983 transparent transparent transparent;
  }
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
