<template>
  <div>
    <nav
      :class="[
        { change_color: scrollPosition > 100 },
        'navbar navbar-expand-lg fixed-top navbar-dark ftco_navbar ftco-navbar-light',
      ]"
      id="ftco-navbar"
    >
      <div class="container">
        <a class="navbar-brand" style="color:wheat">E-commerce</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="oi oi-menu"></span> Menu
        </button>

        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <!-- <li class="nav-item">
              <a @click="home" class="nav-link">Home</a>
            </li>-->
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/contact" class="nav-link">Contact</router-link>
            </li>
            <li class="nav-item">
              <router-link to="profile" v-if="user" class="nav-link"></router-link>
            </li>

            <li v-if="user" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{ userProfile.name }}</a>
              <div
                :class="[
        { change_color: scrollPosition > 100 },
        'dropdown-menu',
      ]"
                aria-labelledby="navbarDropdown"
              >
                <a class="dropdown-item" href="#">{{ user.email }}</a>
                <div class="dropdown-divider"></div>
                <li class="nav-item">
                  <Button
                    to="/auth/register"
                    style="display: flex; margin:auto"
                    color="error"
                    @click="logOut"
                    v-if="user"
                  >log out</Button>
                </li>
              </div>
            </li>

            <li class="nav-item">
              <router-link to="/auth/register" v-if="!user" class="nav-link">log in</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/auth/register" v-if="!user" class="nav-link">sign up</router-link>
            </li>
            <li class="nav-item">
              <CartPage v-if="user" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import CartPage from "../../../views/user/cartList/cartPage";
import Button from "@/components/shared/button";
import * as firebase from "firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      loggedIn: false,
      user: null,
      showModal: false,
      scrollPosition: null
    };
  },
  components: {
    CartPage,
    Button
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/auth/register");
            this.$store.state.user = false;
          });
        });
    },
    showModalHandler(product) {
      this.showModal = true;
      this.selectedProduct = product;
    },
    hideModalHandler() {
      this.showModal = false;
      this.showDeleteModal = false;
    },
    signUp() {
      this.$router.push("/auth/register");
    },
    signIn() {
      this.$router.push("/auth/register");
    },
    home() {
      this.$router.push("/");
    },
    contact() {
      this.$router.push("/contact");
    },
    profile() {
      this.$router.push(`profile/${this.userProfile.name}`);
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.$store.dispatch("fetchUserProfile", user);
      } else {
        this.user = null;
      }
    });
  },
  computed: {
    ...mapState(["userProfile"])
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
    this.$store.dispatch("admin/getCategories");
    console.log(this.$store.state.user);
  }
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  background: none;
  margin-left: -80px;
  float: left !important;
}
.change_color {
  background-color: #13232f;
  transition: 0.5s all ease-in-out;
}

.dropdown-menu a {
  color: wheat !important;
}
.dropdown-menu a:hover {
  background: none;
}
.nav-item:hover {
  background: none !important;
}
</style>
