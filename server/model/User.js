const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//定义架构
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    identity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model('user', userSchema) //创建模型


module.exports = User;