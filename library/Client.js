
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
	constructor(application) {
		var me = this;
		
		me._application = application;
		me._modules = [];
		
		
		
		me._middleware = function(request, response) {
			
			var appConfig = me._application.config;
			
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
			if (appConfig.get("sencha.extjs.source.type") == "localhost") {
				extjsPath = "http://localhost/ext-" + appConfig.get("sencha.extjs.source.version", "5.1.1");
			}
			let theme = appConfig.get("sencha.extjs.theme", "crisp");
			let debug = appConfig.get("sencha.extjs.debug") ? "-debug" : "";
			let locale = appConfig.get("sencha.extjs.locale", "ru");
			head.push(`<link href="${extjsPath}/build/packages/ext-theme-${theme}/build/resources/ext-theme-${theme}-all${debug}.css" rel="stylesheet">`);
			head.push(`<script src="${extjsPath}/build/ext-all${debug}.js"></script>`);
			head.push(`<script src="${extjsPath}/build/packages/ext-locale/build/ext-locale-${locale}${debug}.js"></script>`);
			
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
				//namespaces.push(module.config.get("namespace")); // это не прокатит, так как module это объект класса CardinalKeeper.module.Client
				// и в module.config нет метода get()
				namespaces.push(module.config.namespace);
				controllers = controllers.concat(module.controllers);
			});
			
			// Подключение клиентского приложения
			var appOptions = JSON.stringify({
				title: appConfig.get("title", "Кардинал Кипер 2015"),
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