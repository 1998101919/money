<template>
        <div class="login">
            <div class="container">
                <span>星爷资金管理系统</span>
                <el-form :model="loginUser" :rules='rules' ref="loginForm" label-width="80px" class="loginForm">
                    <el-form-item  prop="email" >
                        <el-input  v-model="loginUser.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item  prop="password" >
                        <el-input  type='password' v-model="loginUser.password" placeholder="密码"></el-input>
                    </el-form-item>
                      <el-form-item>
                        <el-button type="primary" class="submitBtn" @click="submitForm('loginForm')">登录</el-button>
                      </el-form-item>
                  </el-form>
            </div>
        </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      rules: {
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
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/api/user/login", this.loginUser)
            .then(res => {
              //提示消息
              this.$message({
                showClose: true,
                message: "登录成功",
                type: "success"
              });
              //存储token
              const {token} = res.data

              //解析token
              const newToken = jwt_decode(token);
              //存储到vuex中
              this.$store.dispatch('setIsAutnenticated',!this.isEmpty(newToken))
              this.$store.dispatch('setUser',newToken)

              localStorage.setItem('eleToken',token)
              //跳转
              this.$router.push('/index')
            })
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style scoped>
.login {
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
.loginForm {
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

