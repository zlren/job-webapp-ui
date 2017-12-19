const mongoose = require('mongoose');

// mongodb地址，react这个集合，没有会自动新建
const mongodb_url = 'mongodb://10.109.246.71:27017/react';
const db = mongoose.connection.openUri(mongodb_url);

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    console.log('connect mongodb success !');
});

const models = {
    user: {
        user: {type: String, require: true},
        pwd: {type: String, require: true},
        type: {type: String, require: true},
        avatar: {type: String, require: false},
        desc: {type: String},
        title: {type: String},
        // 如果是boss还有额外的两个字段
        company: {type: String},
        money: {type: String}
    },
    chat: {}
};

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
}