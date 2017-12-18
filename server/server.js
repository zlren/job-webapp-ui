const express = require('express');
const mongoose = require('mongoose');

// mongodb地址，react这个集合，没有会自动新建
const mongodb_url = 'mongodb://10.109.246.71:27017/react';

const db = mongoose.connection.openUri(mongodb_url);

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    console.log('connect mongodb success !');
});

const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true},
}));

// 新增数据
// User.create({
//     name: 'zlren',
//     age: 18
// }, function (err, doc) {
//     if (!err) {
//         console.log(doc);
//     } else {
//         console.log(err);
//     }
// });


const app = express();

app.get('/', function (req, res) {
    res.send('<h3>hello world</h3>')
});

app.get('/data', function (req, res) {
    // 查询数据，传入一个空的条件表示查询所有的
    User.findOne({user: 'zlren'}, function (err, doc) {
        res.json(doc);
    });
});

app.listen(9003, console.log('node app start at port 9003'));
