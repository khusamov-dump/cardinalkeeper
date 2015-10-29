
"use strict";

/**
 * Базовый класс ресурсов модулей.
 * @class CardinalKeeper.module.Resource
 */

module.exports = class Resource { 
	
	/**
	 * Имя ресурса.
	 * @property {String}
	 */
	get name() {
		return this._name;
	}
	
	/**
	 * Опции ресурса.
	 * Берутся автоматически по имени модуля и ресурса
	 * из основного конфигурационного файла приложения.
	 * @property {Object}
	 */
	get config() {
		return this.module.config[this.name];
	}
	
	/**
	 * Массив функций API ресурса.
	 * @property {Object}
	 */
	get api() {
		return this._api;
	}
	
	/**
	 * Адаптер основной базы данных приложения.
	 * https://github.com/vitaly-t/pg-promise#usage
	 * @property {pg-promise.Database}
	 */
	get database() {
		return this.application.database;
	}
	
	/**
	 * Приложение.
	 * @property {CardinalKeeper.Application}
	 */
	get application() {
		return this.module.application;
	}
	
	/**
	 * Модуль ресурса.
	 * @property {CardinalKeeper.module.Module}
	 */
	get module() {
		return this._module;
	}
	
	/**
	 * Конструктор ресурса.
	 */
	constructor(module, name, homedir) {
		var me = this;
		me._name = name;
		me._module = module;
		me._api = {};
		me._helpers = {};

		// Подключить действия ресурса.
		["index", "create", "update", "destroy"].forEach(action => {
			me._api[action] = function(request, response) {
				me[action].call(me, request, response);
			};
		});
		
		// Если определена директория, то подключаем действия из нее.
		if (homedir) {
			let actionDir = homedir + "/" + name;
			let fs = require("fs");
			if (fs.lstatSync(actionDir).isDirectory()) {
				me.action(actionDir);
			}
		}
	}
	
	/**
	 * Подключение действия ресурса как отдельный объект.
	 * @param {String | CardinalKeeper.module.resource.Action} action Директория с действиями или объект действия.
	 */
	action(action) {
		var me = this;
		
		function includeAction(action) {
			me._api[action.name] = function(request, response) {
				action.action(request, response);
			};
		}
		
		if (typeof action == "string") {
			let actionDir = action;
			let fs = require("fs");
			fs.readdirSync(actionDir).forEach(filename => {
				filename = actionDir + "/" + filename;
				if (fs.lstatSync(filename).isFile()) {
					let Action = require(filename);
					let action = new Action(me);
					includeAction(action);
				}
			});
		} else {
			action.resource = me;
			includeAction(action);
		}
	}
	
	getHelper(name) {
		let me = this;
		if (!me._helpers[name]) {
			let classname = "CardinalKeeper.module." + me.module.name + ".resource.helper." + name;
			let helper = eval(`new ${classname}()`);
			helper.resource = me;
			me._helpers[name] = helper.helper;
		}
		return me._helpers[name];
	}
	
	index(request, response) { // GET
		response.send({
			success: false,
			message: "Метод не реализован"
		});
	}
	
	create(request, response) { // POST
		response.send({
			success: false,
			message: "Метод не реализован"
		});
	}
	
	update(request, response) { // PUT
		response.send({
			success: false,
			message: "Метод не реализован"
		});
	}
	
	destroy(request, response) { // DELETE
		response.send({
			success: false,
			message: "Метод не реализован"
		});
	}
	
};