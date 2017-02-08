var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './data/';

/* GET home page. */
router.get('/', function (req, res, next) {
    fs.readFile(PATH + 'data.json', function (err, data) {
        if (err) {
            //send 直接发送 string
            return res.send({
                status: 0,
                info: '读取文件出现异常'
            });
        }
        //定义文件读取行数
        var COUNT = 50;
        var obj = [];
        try {
            obj = JSON.parse(data.toString());
        } catch (e) {
            obj = [];
        }
        if (obj.length > COUNT) {
            obj = obj.slice(0, COUNT);
        }
        return res.send({
            status: 1,
            data: obj
        });
    });
});

module.exports = router;
