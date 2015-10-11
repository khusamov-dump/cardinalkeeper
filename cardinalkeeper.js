
"use strict";

// https://github.com/jsymfony/autoload
var autoload = require("jsymfony-autoload");

/* global CardinalKeeper */
autoload.register("CardinalKeeper", __dirname + "/library");

var cardinalkeeper = new CardinalKeeper.Application();

cardinalkeeper.publishFolder("/client", __dirname + "/client");
cardinalkeeper.publishFolder("/vendor", __dirname + "/bower_components");

module.exports = cardinalkeeper;