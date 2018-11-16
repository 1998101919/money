const express = require('express'); //使用express框架
const app = express(); //实例化app
const mongoose = require('mongoose'); //使用连接数据库的模块
const bodyParser = require('body-parser'); //对post请求的请求体进行解析。
const path = require('./config/keys').url //引入mlab的地址
const passport = require('passport'); //验证token

const user = require('./routers/api/user'); //引入user路由接口

const profile = require('./routers/api/profile'); //引入profile路由接口


// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);


mongoose.connect(path,() => { //连接
    console.log('Mongoose is connected')
})


const port = process.env.PORT || 8888 //设置端口为环境变量的端口或者8888


app.use('/api/user',user) //使用user内的路由
app.use('/api/profile',profile) //使用profile内的路由

app.listen(port,() => { //监听端口是否开启
    console.log(`Server is running in ${port}`)
})