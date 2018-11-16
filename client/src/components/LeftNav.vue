<template>
    <el-row>
  <el-col  :span='3'>
    <el-menu
         mode="vertical"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
            <router-link to='/home'>
                <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>首页</span>
                </template>
            </el-submenu>
            </router-link>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                        <span>资金管理</span>
                    </template>
                <router-link to='/manage'>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">项目管理</el-menu-item>
                    </el-menu-item-group>
                </router-link>
                </el-submenu>

            <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>信息管理</span>
                </template>
                <router-link to='/info'>
                    <el-menu-item-group>
                    <el-menu-item index="1-1">个人信息</el-menu-item>
                    </el-menu-item-group>
                </router-link>
            </el-submenu>

    </el-menu>
  </el-col>
</el-row>
</template>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    z-index: 9999;
    position: fixed;
    width: 200px;
    min-height: 900px;
  }
</style>

