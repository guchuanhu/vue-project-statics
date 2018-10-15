let request = require('request');
let cheerio = require('cheerio');
let iconv = require('iconv-lite');
let fs = require("fs");
let schedule = require('node-schedule');

let {
    saveMongo
} = require("./alimongo");

let book = [];

function splider(){
    for (let bId = 25100000, counter = 0; bId < 25100100; bId++) {
        counter++;
        let url = 'http://product.dangdang.com/' + bId + '.html';
        console.log(counter);
        request({
            url: url,
            encoding: null
        }, function (error, response, body) { //http://m.xgo.cn/
            if (!error && response.statusCode == 200) {
                //返回的body为抓到的网页的html内容
                let text = iconv.decode(body, 'GBK');
                let $ = cheerio.load(text); //当前的$符相当于拿到了所有的body里面的选择器
                let title = $("title").text().trim();
                title = title.substring(title.indexOf("《")+1,title.indexOf("》"));

                let price = $('#dd-price').text().trim().replace("¥", ''); //价格
                let author = $("title").text().trim();
                author = author.substring(author.indexOf("(")+1,author.indexOf(")"));
                let press = $('.messbox_info').find(".t1").eq(1).text().trim(); //出版社
                let publishingTime = $('.messbox_info').find(".t1").eq(2).text().trim(); //出版时间
                let img = $('#largePic').attr("src");

                let obj = {
                    bId: bId,
                    title: title,
                    price: [{
                        price: price,
                        date: new Date().getTime()
                    }],
                    author: author,
                    press: press,
                    publishingTime: publishingTime,
                    img: img,
                    url: url,
                };
                book.push(obj);

            }
        })
    }

    setTimeout(() => {
        saveMongo(book);
    }, 30000);

}



function scheduleCronstyle() {

    
    schedule.scheduleJob('1 1 1 * * *', function () {

        splider();

        
    });

}

scheduleCronstyle();






