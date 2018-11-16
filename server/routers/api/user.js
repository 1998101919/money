const express = require('express');
const app = express();
const router = express.Router(); //使用路由
const bcrypt = require('bcrypt'); //加密密码
const gravatar = require('gravatar'); //全球公认的头像
const jwt = require('jsonwebtoken'); //返回相应的token值
const passport = require('passport'); //验证token


const User = require('../../model/User'); //引入Schema模型

const key = require('../../config/keys') //引入加密名称

//注册接口
router.post('/register', (req, res) => {
    //验证
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(404).json('邮箱存在')
            } else {
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    identity: req.body.identity,
                    password: req.body.password,
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash; //赋值

                        newUser.save()
                            .then(data => res.json(data)) //保存
                            .catch(err => console.log(err))
                    });
                });
            }
        })
})

//登录接口
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //查找数据库
    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.status(404).json({ msg: '用户不存在' })
            } else {
                bcrypt.compare(password, user.password)
                    .then(data => {
                        if (data) {
                            //jwt返回token
                            const rule = { id: user.id, name: user.name,avatar : user.avatar, email: user.email, identity: user.identity }
                            jwt.sign(rule, key.sercret, { expiresIn: 3600 }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                })
                            })
                        } else {
                            res.status(400).json({ err: '密码错误' })
                        }
                    })
            }
        })


})

//测试接口 使用jwt做验证
// router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.json({
//         name: req.user.name,
//         email: req.user.email,
//         identity: req.user.identity
//     })
// })



module.exports = router;