const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./user');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

// 使用userRouter来处理/user的请求
app.use('/user', userRouter);

app.get('/', function (req, res) {
    res.send('<h3>hello world</h3>')
});

app.listen(9003, console.log('node app start at port 9003'));
