var express = require('express');
var app = express();

app.use(express.static("./dev"));


// app.listen(83,"192.168.0.64");
// node 服务器
//app.listen(80,"192.168.123.120");
//app.listen(80,"127.0.0.1");

// 家里笔记本
app.listen(80,"192.168.0.109");