const express = require('express');
const app = express();
const router = express.Router(); //使用路由
const passport = require('passport'); //验证token

const Profile = require('../../model/Profile'); //引入Schema模型

const key = require('../../config/keys') //引入加密名称


//添加数据接口 通过token验证才能添加
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileObj = {}

    if (req.body.type) profileObj.type = req.body.type;
    if (req.body.describe) profileObj.describe = req.body.describe;
    if (req.body.income) profileObj.income = req.body.income;
    if (req.body.expend) profileObj.expend = req.body.expend;
    if (req.body.balance) profileObj.balance = req.body.balance;
    if (req.body.remarks) profileObj.remarks = req.body.remarks;

    new Profile(profileObj).save()
        .then(data => {
            res.json(data)
        })
        .catch(err => console.log(err))
})

//获取数据所有信息
router.get('/', (req, res) => {
    Profile.find()
        .then(user => {
            if (!user) {
                res.status(404).json('没有任何数据')
            } else {
                res.json(user)
            }
        })
})

//获取单条数据信息
router.get('/:id', (req, res) => {
    Profile.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json('没有找到该用户')
            } else {
                res.json(user)
            }
        })
})

//编辑单条数据
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileObj = {}

    if (req.body.type) profileObj.type = req.body.type;
    if (req.body.describe) profileObj.describe = req.body.describe;
    if (req.body.income) profileObj.income = req.body.income;
    if (req.body.expend) profileObj.expend = req.body.expend;
    if (req.body.balance) profileObj.balance = req.body.balance;
    if (req.body.remarks) profileObj.remarks = req.body.remarks;
    
    Profile.findOneAndUpdate({_id :req.params.id},{$set : profileObj}, {'new' : true})
        .then(user => {
            if(!user){
                res.status(404).json('没有找到该用户')
            }else{
                res.json(user)
            }
        })
})

//删除单条数据
router.delete('/delete/:id',(req,res) => {
    Profile.findByIdAndRemove({_id : req.params.id})
        .then(user => {
            if(!user){
                res.status(404).json('没有找到该用户')
            }else{
                res.json(user)
            }
        })
})




module.exports = router;