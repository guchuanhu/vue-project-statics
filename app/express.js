let app = require('express')();
let bodyParser = require('body-parser');
// import {sendMail,codeMail} from "./email/email";
let {sendMail,codeMail} = require('./email/email');
let {getMongo} = require('./splider/alimongo');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


app.all('*', function (req, res, next) {//解决跨域问题
    console.log(14);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});


app.get('/', function (req, res) {
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    res.json(req.body);
});

app.post('/email', function (req, res) {
    sendMail(req.body,res);//发送邮件验证码
});
app.post('/register', function (req, res) {
    codeMail(req.body,res);//邮件注册账号
});
app.post('/book', function (req, res) {
    getMongo({},res);//获取书籍信息
});

var server = app.listen(8011, function () {
    console.log("应用实例，访问地址为 http://locahost:" + this.address().port);
})


process.on('uncaughtException', function(err) {
    console.error('Error caught in uncaughtException event:', err);
});