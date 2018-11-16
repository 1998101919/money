const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//定义架构
const profileSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    describe: {
        type: String,
    },
    income: {
        type: String,
        required: true,
    },
    expend: {
        type: String,
        required : true,
    },
    balance: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Profile = mongoose.model('profile', profileSchema) //创建模型


module.exports = Profile;