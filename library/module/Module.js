
"use strict";
/* global CardinalKeeper */

var express = require("express");

/**
 * Базовый класс модулей.
 * @class CardinalKeeper.module.Module
 */

module.exports = class Module { 
	
	/**
	 * Имя модуля.
	 * @property {String}
	 */
	get name() {
		return this._name;
	}
	
	/**
	 * Опции модуля.
	 * Берутся автоматически по имени модуля 
	 * из основного конфигурационного файла приложения.
	 * @property {Object}
	 */
	get config() {
		return this._config;
	}
	
	/**
	 * Express-приложение.
	 * http://expressjs.com/4x/api.html#app
	 * @param {express.Application}
	 */
	get express() {
		return this._express;
	}
	
	/**
	 * Родительское приложение модуля.
	 * @property {CardinalKeeper.Application}
	 */
	get application() {
		return this._application;
	}
	
	/**
	 * Путь к каталогу модуля.
	 * @property {String}
	 */
	get homedir() {
		return this._homedir;
	}
	
	get client() {
		return this._client;
	}
	
	/**
	 * Конструктор модуля.
	 * @param {CardinalKeeper.Application} application 
	 * @param {String} homedir 
	 * @param {String} name 
	 */
	constructor(application, homedir, name) {
		var me = this;
		me._application = application;
		me._homedir = homedir;
		me._name = name;
		me._express = express();
		me._config = application.getConfigSection(me.name);
		
		application.publishFolder("/client/module/" + name, homedir + "/client");
		
		// Подключить ресурсы модуля.
		let fs = require("fs");
		fs.readdirSync(homedir + "/resource").forEach(resource => {
			resource = homedir + "/resource/" + resource;
			if (fs.lstatSync(resource).isFile()) me.resource(resource);
		});
		
		// Клиентская часть модуля.
		me._client = new CardinalKeeper.module.Client(homedir + "/client");
	}
	
	/**
	 * Подключить ресурс модуля.
	 * @param {String} path Путь к файлу с классом ресурса.
	 * @return {CardinalKeeper.module.Module}
	 */
	resource(path) {
		let me = this;
		let Resource = require(path);
		let resource = new Resource(me);
		var name = (resource.name == me.name) ? null : resource.name;
		me.express.resource(name, resource.api);
		return me;
	}
	
};