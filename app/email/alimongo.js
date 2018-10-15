var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";//mongodb://47.98.198.248:27017
 
module.exports = {saveMongo,compareMongo}

function saveMongo(param ,res){//param=>email+timestamp
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('数据库已连接');
        console.log(param);

        var dbase = db.db("one");
        var item = {email: param.email};
        var updateStr = {$set: { timestamp :  param.timestamp }};

        dbase.collection("mail").find(item).toArray(function(err, result) {
            console.log(result);
            if (err) throw err;
            if(result.length===0){//没有匹配到对应数据
                dbase.collection("mail").insertOne(param, function(err, result) {//存入账号信息
                    console.log(result.result);
                    if (err) throw err;
                    console.log("账号信息已存入");

                    res.send({
                        staus: 2001,
                        word: "账号信息已存入"
                    })
                    db.close();
                });
            }else if(result[0].timestamp){//验证码存在，更新验证码
                dbase.collection("mail").updateOne(item, updateStr, function(err, result) {
                    if (err) throw err;
                    console.log("验证码已更新");
                    console.log(result.result);
                    res.send({
                        staus: 2002,
                        word: "验证码已更新"
                    })
                    db.close();
                });
            }else {//验证码不存在，且有数据，这是已经注册的账号
                
                res.send({
                    staus: 2003,
                    word: "已有账号不需要注册"
                })
            }
            db.close();
        });
    });
}

function compareMongo(param, res){//param=>name+code+password+email
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('compareMongo数据库已连接');
        console.log(param);

        var dbase = db.db("one");
        var item = {email: param.email};
        var updateStr;

        dbase.collection("mail").find(item).toArray(function(err, result) {
            console.log(result);
            if (err) throw err;
            if(result.length===0){//没有匹配到对应数据
                res.send({
                    staus: 2001,
                    word: "邮箱还未获取验证码"
                })
            }else if(result[0].timestamp){//验证码存在
                if(param.code === (result[0].timestamp + '').substring((result[0].timestamp + '').length - 4)){//验证码匹配成功
                    updateStr = {$set: { timestamp : false, name:param.name, password:param.password }};
                    
                    dbase.collection("mail").updateOne(item, updateStr, function(err, result) {
                        if (err) throw err;
                        console.log("用户信息已存储");
                        console.log(result.result);
                        res.send({
                            staus: 2002,
                            word: "注册成功"
                        })
                        db.close();
                    });
                }
            }else if(!result[0].timestamp){//验证码不存在，且有数据，这是已经注册的账号
                res.send({
                    staus: 2003,
                    word: "已有账号不需要注册"
                })
            }
            db.close();
        });
    });
}