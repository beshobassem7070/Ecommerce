<template>
  <div id="app">
    <section class="wave" v-if="!$route.meta.hideNavigation">
      <div class="wrapper">
        <marquee>
          <span class="marquee">Welcome, you can shopping on us website</span>
        </marquee>
      </div>
    </section>

    <div id="nav"></div>
    <Navbar v-if="!$route.meta.hideNavigation" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import Navbar from "@/components/shared/navbar";
export default {
  components: {
    Navbar
  },

  methods: {}
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
input:focus {
  outline: none;
}
body {
  overflow-x: hidden; /* Hide scrollbars */
  margin: 0;
  padding: 0;
}
section {
  width: 100%;
  min-height: 400px;
}

.wave {
  position: relative;
  background: linear-gradient(90deg, #f0027f, #75489f);
}

.wave:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 215px;
  background: url("https://i.hizliresim.com/y0GZa7.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.wrapper {
  max-width: 600px;
  height: 40px;
  text-align: right;
  margin: auto;
  padding-top: 100px;
  color: wheat;
  font-size: 30px;
  animation: move-text 1s ease-in-out infinite;
}
@keyframes move-text {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.el-form-item__content {
  margin-left: 0px !important;
}
.el-input__inner {
  border: none !important;
  background: none !important;
  border-bottom: 1px solid wheat !important;
  border-radius: 0 !important;
  color: white !important;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
