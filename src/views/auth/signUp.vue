<template>
  <div>
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <h1>SIGN UP</h1>
        <el-form-item prop="name" class="form-item">
          <el-input v-model="ruleForm.name" placeholder="Full Name"></el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input v-model="ruleForm.email" placeholder="Email"></el-input>
        </el-form-item>

        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            placeholder="Password"
            class="input"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="Confarim password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="button-submit"
            type="primary"
            @click="submitForm('ruleForm')"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import "firebase/auth";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        name: "",
        email: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 3,
            message: "Length should more than 2 char ",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      try {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch("signup", {
              email: this.ruleForm.email,
              password: this.ruleForm.pass,
              name: this.ruleForm.name,
            });
          }
        });
      } catch (error) {
        this.$message.error("Oops, this is a error message.");
      }
    },
  },
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

.bg-purple {
  background: white;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
