let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: '373587357@qq.com',
    pass: 'shcnrvkzyiqdbhbf' //授权码,通过QQ获取

  }
});
let mailOptions = {
  from: '373587357@qq.com', // 发送者  
  to: '1973231806@qq.com', // 接受者,可以同时发送多个,以逗号隔开  
  subject: '注册码', // 标题  
  //text: 'Hello world', // 文本  
  html: 'hello me'
};
let {
  saveMongo,
  compareMongo
} = require("./alimongo");

module.exports = {
  sendMail,
  codeMail
};

function sendMail(params, res) { //发送邮件验证码
  let timestamp = new Date().getTime();
  let code = (timestamp + '').substring((timestamp + '').length - 4);
  mailOptions.to = params.email;
  mailOptions.html = "验证码：" + code + "。请您在10分钟之内使用验证码激活账号。";
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    saveMongo(Object.assign(params,{timestamp:timestamp}),res);
  });
}

function codeMail(params, res) { //邮件注册
  console.log(params);
  compareMongo(params, res);
}