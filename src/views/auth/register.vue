<template>
  <div>
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 image-header">
            <img
              class="img-fluid"
              src="@/assets/image/default@tablet-83f017c08356e1b69d531716b99faa0ff7ff6cee61097d7f5169a55032d79e73.png"
              width="600"
              height="400"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-1"></div>
        <div class="col-lg-8 col-md-8 col-sm-10">
          <div class="form">
            <div class="button-register">
              <button
                @click="routingSignUp"
                :class="[!this.$store.state.login ? 'active' : '', 'tab']"
              >signup</button>
              <button
                @click="routingLogin"
                :class="[this.$store.state.login ? 'active' : '', 'tab']"
              >login</button>
            </div>
            <div v-if="!this.$store.state.login" :class="signUp ? 'active-signup' : ''">
              <signUp />
            </div>
            <div
              v-else-if="this.$store.state.login"
              :class="this.$store.state.login ? 'active-login' : ''"
            >
              <login />
            </div>

            <div v-if="this.$store.state.forgetPasswordd" :class="signUp ? 'active-signup' : ''">
              <forgetPassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import login from "./login";
import signUp from "./signUp";
import forgetPassword from "./forgetPassword";

export default {
  data() {
    return {
      // login: false,
      signUp: false
    };
  },
  components: {
    login,
    signUp,
    forgetPassword
  },
  methods: {
    routingLogin() {
      this.$store.state.login = true;
      this.signUp = false;
    },
    routingSignUp() {
      this.signUp = true;
      this.$store.state.login = false;
    }
  },
  mounted() {
    console.log(this.$store.state.forgetPasswordd);
  }
};
</script>

<style lang="scss" scoped>
$body-bg: #c1bdba;
$form-bg: #13232f;
$white: #ffffff;

$main: #1ab188;
$main-light: lighten($main, 5%);
$main-dark: darken($main, 5%);

$gray-light: #a0b3b0;
$gray: #ddd;

$thin: 300;
$normal: 400;
$bold: 600;
$br: 4px;
.image-header {
  margin: auto;
  text-align: center;
  .img-fluid {
    margin-top: -170px;
  }
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

.active-login {
  opacity: 0;
  animation: fade-in-login 0.5s ease-in-out forwards;
}
@keyframes fade-in-login {
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.active-signup {
  opacity: 0;
  animation: fade-in-signup 0.5s ease-in-out forwards;
}
@keyframes fade-in-signup {
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.form {
  padding-top: 100px;
  margin: auto;
  margin-top: 50px;
  max-width: 100%;
  padding: 20px;
  margin-left: 0;
  border: 1px solid black;
  border-radius: 15px;
  background: #13232f;
  box-shadow: 0 4px 10px 4px rgba($form-bg, 0.3);
  margin-bottom: 100px;
  .button-submit {
    width: 100%;
    background: linear-gradient(90deg, #f0027f, #75489f);
  }
}

.button-register {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .tab {
    display: block;
    padding: 15px;
    color: $gray-light;
    font-size: 20px;
    float: left;
    width: 50%;
    text-align: center;
    cursor: pointer;
    transition: 0.5s ease;
    border: none;
  }
}
.active {
  background: #75489f;
  color: $white;
}

// .marquee {
//   background: red;
//   white-space: nowrap;
//   animation: rightThenLeft 4s infinite;
// }
</style>
