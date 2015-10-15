
"use strict";
/* global CardinalKeeper */

/**
 * Класс приложения.
 * @class CardinalKeeper.Application
 */

var ini = require("multi-ini");
var express = require("express");
var bodyParser = require("body-parser"); // https://www.npmjs.com/package/body-parser
require("express-resource"); // https://github.com/expressjs/express-resource

module.exports = class Application {
	
	/**
	 * Опции приложения.
	 * @property {Object}
	 */
	get config() {
		return this._config;
	}
	
	/**
	 * Адаптер основной базы данных приложения.
	 * https://github.com/vitaly-t/pg-promise#usage
	 * @property {pg-promise.Database}
	 */
	get database() {
		return this._database;
	}
	
	/**
	 * HTTP-сервер от Node.js.
	 * https://nodejs.org/api/http.html
	 * @property {http.Server}
	 */
	get server() {
		return this._server;
	}
	
	/**
	 * Express-приложение.
	 * http://expressjs.com/4x/api.html#app
	 * @property {express.Application}
	 */
	get express() {
		return this._express;
	}
	
	get client() {
		return this._client;
	}
	
	/**
	 * Конструктор приложения.
	 */
	constructor() {
		var me = this;
		me._express = express();
		me.express.use(bodyParser.json());
		
		// Создать клиент для базы данных PostgreSQL.
		me._postgres = new CardinalKeeper.database.Postgres({
			connect: function(client) {
				console.log("Connected to database:\n", client.connectionParameters);
			},
			disconnect: function(client) {
				console.log("Disconnecting from database:\n", client.connectionParameters);
			},
		});
		
		me._client = new CardinalKeeper.Client(me);
		me.express.get("/", me._client.middleware);
	}
	
	/**
	 * Инициализация приложения.
	 * Подключает конфигурационный файл приложения.
	 * @param {String} configPath
	 * @return {CardinalKeeper.Application}
	 */
	init(configPath) {
		var me = this;
		
		// Подключить конфигурационный файл.
		me._configFile = ini.read(configPath);
		me._config = me.getConfigSection("application");
		
		// Добавляем в конфиг переменную path содержащую абсолютный путь к папке с конфигурационным файлом.
		var mpath = require("path");
		me._config.path = mpath.dirname(mpath.resolve(configPath));
		
		// Подключить основную базу данных.
		me._database = me._postgres.createAdapter(me.config.database);
		
		// Подключить модули приложения.
		me.config.module.forEach(path => {
			me.module(path);
		});
		//me._config.cardinalkeeper.module.forEach(me.module.bind(me));
		
		return me;
	}
	
	/**
	 * Получить раздел основного конфигурационного файла приложения.
	 * @param {String} section
	 * @return {Object}
	 */
	getConfigSection(section) {
		
		let result = this._configFile[section] || {};
		
		result.isDefined = function(path) {
			path = path.split(".");
			let current = result;
			let defined = true;
			path.forEach(item => {
				if (item in current) {
					current = current[item];
				} else {
					defined = false;
					return false;
				}
			});
			return defined;
		};
		
		result.get = function(path, defaultValue) {
			let value = result;
			path = path.split(".");
			path.every(item => {
				if (item in value) {
					value = value[item];
				} else {
					value = defaultValue;
					return false;
				}
				return true;
			});
			return value;
		};
		
		return result;
	}
	
	/**
	 * Подключить модуль.
	 * Внимание, относительные пути (начинающиеся с ./) отсчитываются от месторасположения конфига.
	 * @param {String} path
	 * @return {CardinalKeeper.Application}
	 */
	module(path) {
		var me = this;
		path = path.replace(/^.\//, me.config.path + "/");
		let Module = require(path);
		let module = new Module(me);
		me.express.use("/api/" + module.name, module.express);
		me.client.use(module.client);
		return me;
	}

	/**
	 * Опубликовать папку в вебе.
	 * @param {String} [webPath]
	 * @param {String} folder
	 * @return {CardinalKeeper.Application}
	 */
	publishFolder(webPath, folder) {
		var me = this;
		if (folder) {
			me.express.use(webPath, express.static(folder));
		} else {
			me.express.use(express.static(webPath));
		}
	}
	
	/**
	 * Создать веб-сервер.
	 * @return {http.Server}
	 */
	listen() {
		return this.express.listen.apply(this.express, arguments);
	}
	
	/**
	 * Запустить приложение.
	 * @param {String} [configPath] Путь к конфигурационному файлу.
	 * @return {CardinalKeeper.Application}
	 */
	run(configPath) {
		var me = this;
		if (configPath) me.init(configPath);
		me._server = me.listen(me.config.port, function () {
			var port = me.server.address().port;
			console.log("Cardinal Keeper application listening at port %s", port);
		});
		return me;
	}
	
};