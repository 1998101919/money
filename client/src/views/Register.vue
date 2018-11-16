<template>
        <div class="register">
            <div class="container">
                <span>注册账号</span>
                <el-form :model="registerUser" :rules='rules' ref="registerForm" label-width="80px" class="registerForm">
                      <el-form-item  prop="name" >
                        <el-input  v-model="registerUser.name" placeholder="用户名"></el-input>
                      </el-form-item>
                        <el-form-item  prop="email" >
                        <el-input  v-model="registerUser.email" placeholder="邮箱"></el-input>
                      </el-form-item>
                        <el-form-item  prop="password" >
                        <el-input  type='password' v-model="registerUser.password" placeholder="密码"></el-input>
                      </el-form-item>
                        <el-form-item  prop="password2" >
                        <el-input type='password'  v-model="registerUser.password2" placeholder="确认密码"></el-input>
                        </el-form-item>
                      <el-select class="select" v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option label='员工' value="employee" ></el-option>
                            <el-option label="管理员" value="manager"></el-option>
                      </el-select>
                      <el-form-item>
                        <el-button type="primary" class="submitBtn" @click="submitForm('registerForm')">注册</el-button>
                      </el-form-item>
                  </el-form>
            </div>
        </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validator = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "用户名长度4位到16位之间",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: "密码长度4位到16位之间",
            trigger: "blur"
          }
        ],
        password2: [{ validator: validator, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/user/register", this.registerUser)
            .then(res => {
              this.$message({
                showClose: true,
                message: "注册成功",
                type: "success"
              });
              this.$router.push('/login')
            })
        }
      });
    }
  }
};
</script>
<style scoped>
.register {
  position: fixed;
  width: 100%;
  height: 1000px;
  background: url(../assets/bg.jpg) no-repeat;
  background-size: 100% 100%;
}
.container {
  position: relative;
  width: 500px;
  height: 480px;
  margin: 180px auto;
  text-align: center;
}
span {
  display: inline-block;
  padding: 10px 5px;
  color: #424242;
  font-size: 22px;
  font-weight: bold;
}
.registerForm {
  width: 400px;
  margin: 20px;
}
.select {
  width: 320px;
  margin-bottom: 20px;
  margin-left: 80px;
}
.submitBtn {
  width: 100%;
}
</style>

