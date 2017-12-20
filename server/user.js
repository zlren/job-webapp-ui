const express = require('express');
const Router = express.Router();
const utility = require('utility');

const model = require('./model');
const User = model.getModel('user');

// 统一显示条件，在查询的结果中不显示pwd和_v字段
const _filter = {pwd: 0, __v: 0};

Router.get('/list', function (req, res) {

    // 删除所有的用户
    // User.remove({}, function (err, doc) {
    // });

    User.find({}, function (err, doc) {
        return res.json(doc);
    })
});

Router.get('/info', function (req, res) {
    // 在这里判断用户有没有cookie，进行校验
    const {userid} = req.cookies;

    console.log('后端获取到的cookie为', userid);


    if (!userid) {
        // code值为1表示有问题
        return res.json({code: 1});
    } else {
        User.findOne({_id: userid}, _filter, function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'});
            } else if (doc) {
                return res.json({code: 0, data: doc});
            }
        });
    }
});

// 注册
Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body;
    console.log('收到的消息', user, pwd, type);

    User.findOne({user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'});
        }

        const newUser = new User({user, pwd: md5Pwd(pwd), type});
        // 这里用save可以拿到id，类似于mysql的回显id的操作
        newUser.save(function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'});
            } else {
                // 设置cookie
                res.cookie('userid', doc._id);

                // 简单过滤下，我们只需要这几个，尤其不需要pwd
                const {user, type, _id} = doc;
                return res.json({code: 0, data: {user, type, _id}}); // 注册成功
            }
        });
    })
});


Router.post('/login', function (req, res) {
    const {user, pwd} = req.body;

    // 第一个是条件查询，第二个字段是显示条件，表示在查询的结果中不显示pwd
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (doc) {
            // 设置cookie
            res.cookie('userid', doc._id);
            return res.json({code: 0, data: doc});
        } else {
            return res.json({code: 1, msg: '用户名或密码错误'});
        }
    })
});


// 加盐后两次计算
function md5Pwd(pwd) {
    const salt = 'zlren_react_demo';
    return utility.md5(utility.md5(pwd + salt));
}


module.exports = Router;
