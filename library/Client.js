
"use strict";
/* global CardinalKeeper */

var pretty = require("pretty");

/**
 * Класс клиентского приложения.
 * @class CardinalKeeper.Client
 */

module.exports = class Client {

	/**
	 * Express-middleware.
	 * @property {Function}
	 */
	get middleware() {
		return this._middleware;
	}
	
	/**
	 * Подключить клиентскую часть модуля приложения.
	 * @param {CardinalKeeper.module.Client} client
	 */
	use(client) {
		var me = this;
		me._modules.push(client);
	}
	
	/**
	 * Конструктор приложения.
	 */
	constructor() {
		var me = this;
		
		me._modules = [];
		
		me._middleware = function(request, response) {
			
			// HEAD
			let head = [];
			
			head.push('<meta charset="utf-8">');
			head.push('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">');
			
			// PACE
			let paceOptions = JSON.stringify({
				restartOnPushState: false,
				restartOnRequestAfter: false
			});
			head.push('<link href="/vendor/pace/themes/blue/pace-theme-center-simple.css" rel="stylesheet" />');
			head.push('<style type="text/css">.pace { height: 15px; }</style>');
			head.push(`<script data-pace-options='${paceOptions}' src='/vendor/pace/pace.js'></script>`);
			
			// Sencha Ext JS
			let extjsPath = "/vendor/khusamov-sencha-extjs";
			extjsPath = "http://localhost/ext-5.1.0";
			head.push(`<link href="${extjsPath}/build/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all-debug.css" rel="stylesheet">`);
			head.push(`<script src="${extjsPath}/build/ext-all-debug.js"></script>`);
			head.push(`<script src="${extjsPath}/build/packages/ext-locale/build/ext-locale-ru-debug.js"></script>`);
			
			// Убрать когда выйдет Хром версии 44
			// http://javascript.ru/forum/extjs/56067-input-vniz-sekhali-vse.html
			head.push('<style type="text/css">.x-form-text { display: inherit; }</style>');
			
			// Подключение библиотеки Khusamov Ext JS
			head.push('<script src="/vendor/khusamov-extjs/packages/delegates.js"></script>');
			head.push('<script>Ext.Loader.setPath("Khusamov", "/vendor/khusamov-extjs/src");</script>');
			
			
			let controllers = ["Root"];
			let namespaces = [];
			let models = ["MainMenuItem"];
			let stores = ["MainMenu"];
			
			me._modules.forEach(module => {
				namespaces.push(module.config.namespace);
				controllers = controllers.concat(module.controllers);
			});
			
			// Подключение клиентского приложения
			var appOptions = JSON.stringify({
				title: "Кардинал Кипер 2015",
				name: "CardinalKeeper",
				appFolder: "/client",
				extend: "CardinalKeeper.Application",
				namespaces: namespaces,
				controllers: controllers,
				models: models,
				stores: stores
			});
			head.push(`<script>Ext.application(${appOptions});</script>`);
			
			// HTML
			let html = [];
			
			html.push("<head>");
			html.push(head.join(""));
			html.push("</head>");
			html.push('<body></body>');
			
			let output = '<!DOCTYPE html><html lang="ru">' + html.join("") + "</html>";
			
			output = pretty(output);
			
			response.send(output);
		};
		
	}
	
};