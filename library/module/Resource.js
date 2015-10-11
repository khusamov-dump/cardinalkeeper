
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
	constructor(module, name) {
		var me = this;
		me._name = name;
		me._module = module;
		
		// Подключить действия ресурса.
		me._api = {};
		["index", "create", "update", "destroy"].forEach(action => {
			me._api[action] = function(request, response) {
				me[action].call(me, request, response);
			};
		});
	}
	
};