console.log("shutdown server");

var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000);

server.close();

console.log("server shutdown");
