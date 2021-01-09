<template>
  <div>
    <div v-if="this.$store.state.login">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <h1>LOGIN</h1>
        <el-form-item prop="email">
          <el-input v-model="ruleForm.email" placeholder="Email"></el-input>
        </el-form-item>

        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            placeholder="Password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="button-submit" type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        </el-form-item>
      </el-form>
      <button type="button" @click="forget" class="forget-password">Forget my password</button>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      ruleForm: {
        pass: "",
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
        ],
        pass: [
          {
            required: true,
            message: "Please input password address",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    async submitForm() {
      try {
        const signInUser = await firebase
          .auth()
          .signInWithEmailAndPassword(this.ruleForm.email, this.ruleForm.pass)
          .then(() => {
            this.$router.replace({ name: "Home" });
            console.log(signInUser);
          });
      } catch (error) {
        console.log(error);
        this.$message.error("Oops, there wrong on email or password.");
      }
    },
    forget() {
      // this.$store.state.login = false;
      this.$store.state.forgetPasswordd = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  padding-top: 100px;
  margin: auto;
  margin-top: 50px;
  max-width: 100%;
  padding: 20px;
  h1 {
    text-align: center;
    color: wheat;
    margin-bottom: 50px;
  }
  .button-submit {
    width: 100%;
    background: linear-gradient(90deg, #f0027f, #75489f);
  }
}
.forget-password {
  background: none;
  border: none;
  cursor: pointer;
  color: wheat;
  margin-left: 20px;
  margin-bottom: 40px;
}
.bg-purple {
  background: white;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
