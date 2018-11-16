<template>
    <div class="infoshow">
       <el-row >
           <el-col :span='8'>
               <div class="user">
                    <img :src="user.avatar" class='avatar' alt="">
               </div>
           </el-col>
           <el-col :span='16'>
               <div class="userinfo">
                  <div class="user-item">
                   <span>用户名:{{user.name}}</span>
                  </div>
                  <div class="user-item">
                    <span>身份:{{user.identity == 'admin' ? '管理员' : '普通员工'}}</span>
                  </div>
               </div>
           </el-col>
       </el-row>
    </div>
</template>
<script>
export default {
  name: "infoshow",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
<style scoped>

.user {
  text-align: center;
  position: relative;
  top: 30%;
  left: 10%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>
