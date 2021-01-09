<template>
  <header class="admin-header">
    <button type="button" class="nav-toggle-button" @click="toggleNav">
      <span class="icon">
        <span class="line line-1"></span>
        <span class="line line-2"></span>
        <span class="line line-3"></span>
      </span>
    </button>
    <nav>
      <!-- <button type="button" class="nav-toggle-button-inside" @click="toggleNav">toggle</button> -->

      <ul>
        <li :class="{ active: $route.name === 'admin' }">
          <router-link to="/admin">Home</router-link>
        </li>
        <li :class="{ active: $route.name === 'product' }">
          <router-link to="/admin/product">Product</router-link>
        </li>
        <li :class="{ active: $route.name === 'category' }">
          <router-link to="/admin/category">Category</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    navVisibility() {
      return this.$store.state.admin.navVisibility;
    }
  },
  methods: {
    toggleNav() {
      this.$store.commit("admin/updateNavVisibility", !this.navVisibility);
    }
  }
};
</script>

<style lang="scss">
#admin-content-body {
  transition: 0.5s all ease-in-out;
  padding-top: 50px;
  padding-right: 20px;
  &.nav-opened {
    padding-left: 220px;
  }
}

header {
  width: 200px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: -200px;
  background: #333;
  color: white;
  transition: 0.5s all ease-in-out;
  .nav-toggle-button {
    position: absolute;
    left: 100%;
    width: 40px;
    height: 40px;
    background: #333;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    .icon {
      position: relative;
      display: block;
      width: 100%;
      .line {
        position: absolute;
        display: block;
        width: 100%;
        background: #fff;
        width: 100%;
        height: 3px;
        border-radius: 2px;
        transition: 0.5s;
        &.line-1 {
          transform: translateY(-8px);
        }
        &.line-3 {
          transform: translateY(8px);
        }
        .nav-opened & {
          transform-origin: center;
          &.line-1 {
            transform: translateY(0) rotate(45deg);
          }
          &.line-2 {
            display: none;
          }
          &.line-3 {
            transform: translateY(0) rotate(-45deg);
          }
        }
      }
    }
  }
  .nav-opened & {
    left: 0;
    // .nav-toggle-button {
    //   display: none;
    // }
  }
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    font-size: 16px;
    &:hover,
    &.active {
      background-color: #000;
    }
    a {
      color: wheat;
      padding: 15px 20px;
      text-decoration: none;
      display: block;
      cursor: pointer;
    }
  }
}
</style>
