var express = require('express')
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
console.log("RESTapi TU : Start!");

app.post('/login', function (req, res) {
    var https = require('https');
    // console.log("req", req.body);
    
    var options = {
        'method': 'POST',
        'hostname': 'restapi.tu.ac.th',
        'path': '/api/v1/auth/Ad/verify',
        'headers': {
            'Content-Type': 'application/json',
            'Application-Key': 'MjU0OTNkYjM1MWE5Mzk0MGVlNzU3MGUyMzRiYWQ0N2ZkOGFmMGJkMWVkNjBiMDEwYTJhZTliMzNkZGU5ZTMzMw=='
        }
    };

    var _req = https.request(options, function (_res) {
        var chunks = [];

        _res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        _res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(req.body.UserName +" Success");
            return res.send(body.toString())
        });

        _res.on("error", function (error) {
            console.error(error);
        });
    });
    //"{\n\t\"UserName\":\"req.body.UserName\",\n\t\"req.body.PassWord\":\"PassWord\"\n}";
    var postData = JSON.stringify({"UserName":req.body.UserName , "PassWord" : req.body.PassWord})

    _req.write(postData);
    _req.end();
    
})

app.listen(3002)

