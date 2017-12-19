const express = require('express');
const Router = express.Router();
const utility = require('utility');

const model = require('./model');
const User = model.getModel('user');

Router.get('/list', function (req, res) {
    User.find({}, function (err, doc) {
        return res.json(doc);
    })
});

Router.get('/info', function (req, res) {
    // 在这里判断用户有没有cookie，进行校验
    // code值为1表示有问题
    return res.json({code: 1});
});

Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body;
    console.log('收到的消息', user, pwd, type);

    User.findOne({user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'});
        }
        User.create({user, pwd: md5Pwd(pwd), type}, function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'});
            } else {
                return res.json({code: 0}); // 注册成功
            }
        });
    })
});

// 加盐后两次计算
function md5Pwd(pwd) {
    const salt = 'zlren_react_demo';
    return utility.md5(utility.md5(pwd + salt));
}


module.exports = Router;
