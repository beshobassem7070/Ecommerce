<template>
  <div class="vue-tempalte">
    <div class="container">
      <!-- <div class="row">
        <div class="col-lg-0 col-md-2 col-sm-1"></div>
        <div class="col-lg-10 col-md-8 col-sm-10">
      <div>-->
      <el-form :model="user" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="email">
          <el-input v-model="user.email" placeholder="Email"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="button-submit" @click="forgetPassword('ruleForm')">Submit</el-button>
        </el-form-item>
      </el-form>
      <!-- </div>
        </div>
        <div class="col-lg-0 col-md-2 col-sm-1"></div>
      </div>-->
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {
        email: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    forgetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
          this.$message({
            message: "Congrats, this is a success message.",
            type: "success"
          });
          this.user = {
            email: ""
          };
        })
        .catch(() => {
          this.$message.error("Oops, the email is wrong ");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.button-submit {
  color: wheat;
  width: 100%;
  background: linear-gradient(90deg, #f0027f, #75489f);
}
.button-submit:hover {
  color: wheat;
}
</style>