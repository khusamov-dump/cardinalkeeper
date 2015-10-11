
"use strict";
/* global CardinalKeeper */

var ini = require("multi-ini");

/**
 * Класс отвечающий за клиентский модуль приложения.
 * @class CardinalKeeper.module.Client
 */

module.exports = class Client {
	
	get config() {
		return this._config;
	}
	
	/**
	 * Массив со списком контроллеров клиентского модуля.
	 * @property {Array}
	 */
	get controllers() {
		var me = this;
		let result = [];
		if ("controller" in me.config) {
			let namespace = me.config.namespace;
			me.config.controller.forEach(controller => {
				result.push(namespace + ".controller." + controller);
			});
		}
		return result;
	}
	
	/**
	 * Конструктор приложения.
	 */
	constructor(homedir) {
		var me = this;
		me._config = ini.read(homedir + "/config.ini");
	}
	
};