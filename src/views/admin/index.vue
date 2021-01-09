<template>
  <div id="admin-content-body" class="admin-component" :class="{'nav-opened':navVisibility}">
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,900;1,400;1,700&display=swap"
      rel="stylesheet"
    />
    <Header></Header>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-3"></div>
        <div class="col-lg-6 col-md-6 col-sm-6">
          <div style="margin:auto; margin-top:150px">
            <h1>Welcome admin you can add, remove, edit and follow all data</h1>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3"></div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/admin/header";
export default {
  components: {
    Header
  },
  computed: {
    navVisibility() {
      return this.$store.state.admin.navVisibility;
    }
  }
};
</script>
<style lang="scss" >
body {
  font-family: "Lato", sans-serif;
}
</style>