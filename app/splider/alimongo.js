var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";//mongodb://47.98.198.248:27017
 
module.exports = {saveMongo,getMongo};

function saveMongo(param){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('数据库已连接');

        var dbase = db.db("dangdang");

        param.forEach(element => {
            dbase.collection("book").find({bId: element.bId}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                if(result.length){//更新数据价格
                    let obj = {
                        price: element.price[0].price,
                        date: new Date().getTime()
                    };
                    element.price.push(obj);
                    let updateStr = {$set: { "price" : element.price}};
                    dbase.collection("book").updateOne({bId: element.bId}, updateStr, function(err, res) {
                        if (err) throw err;
                        console.log("文档更新成功");
                        console.log(res.result);
                    });
                }else{//插入新数据
                    console.log(element);
                    dbase.collection("book").insertOne(element, function(err, result) {//存入账号信息
                        if (err) throw err;
                        console.log("账号信息已存入");
                    });
                }
            });
        });
        
        setTimeout(()=>{db.close();},5000);


    });
}

function getMongo(param,res){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('数据库已连接');
        console.log(param);

        var dbase = db.db("dangdang");

        dbase.collection("book").find(param).toArray(function(err, result) { //存入账号信息
            console.log(result);
            if (err) throw err;
            console.log("书籍信息已获取");
            res.send({
                staus: 2001,
                data: result,
                word: "书籍信息已获取"
            })
            db.close();
        });;

    });
}
