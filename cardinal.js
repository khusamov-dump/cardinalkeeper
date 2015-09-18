
var express = require("express");
var resource = require("express-resource");
var app = express();




app.resource("contract", require("./api/contract.js"));

app.use(express.static(__dirname + "/public"));

var server = app.listen(8080, function () {
	var port = server.address().port;
	console.log("Cardinal app listening at port %s", port);
});