
"use strict";

// https://github.com/jsymfony/autoload
let autoload = require("jsymfony-autoload");

let fs = require("fs");

/* global CardinalKeeper */
autoload.register("CardinalKeeper", __dirname + "/library");

var cardinalkeeper = new CardinalKeeper.Application();

cardinalkeeper.publishFolder("/client", __dirname + "/client");

if (fs.existsSync(__dirname + "/bower_components")) cardinalkeeper.publishFolder("/vendor", __dirname + "/bower_components");
if (fs.existsSync("./bower_components")) cardinalkeeper.publishFolder("/vendor", "./bower_components");

module.exports = cardinalkeeper;