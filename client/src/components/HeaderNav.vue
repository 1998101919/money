<template>
    <div class="headerNav">
       <el-menu class="header" mode="horizontal" background-color="#545c64" text-color="#fff">
            <el-menu-item index="1"><img src="../assets/logo.png" alt=""></el-menu-item>
            <el-menu-item class="item2" index="2">星爷资金管理系统</el-menu-item>
            <el-menu-item class="item4" index="5">
                <el-dropdown @command='dropdown'>
                    <span class="el-dropdown-link" >
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu   slot="dropdown" trigger='click'>
                        <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                        <el-dropdown-item command='logout'>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu-item>
            <el-menu-item class="item3" index="4"><p >欢迎 {{user.name}}</p></el-menu-item>
        </el-menu>

    </div>
</template>

<script>
export default {
  name: "headerNav",
  data() {
    return {};
  },
  computed : {
    user(){
      return this.$store.getters.user;
    }
  },
  methods: {
    info() {
      this.$router.push('/info')
    },
    logout() {
      //清除token
      localStorage.removeItem("eleToken");
      //改变vuex的状态
      this.$store.dispatch("clearUser");
      //跳转
      this.$router.push("/login");
    },
    dropdown(data) {
      switch (data) {
        case "info":
          this.info();
          break;
        case "logout":
          this.logout();
          break;
      }
    }
  }
};
</script>

<style scoped>
.item2 {
  font-size: 20px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}
.item3,
.item4 {
  float: right;
}

img {
  width: 40px;
  height: 40px;
}
.el-dropdown-link {
  color: #fff;
}
</style>
