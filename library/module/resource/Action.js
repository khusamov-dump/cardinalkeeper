
"use strict";

/**
 * Класс действия ресурса.
 * @class CardinalKeeper.module.resource.Action
 */

module.exports = class Action { 
	
	/**
	 * Имя действия.
	 * @property {String}
	 */
	get name() {
		return this._name;
	}
	
	/**
	 * Ресурс действия.
	 * @property {CardinalKeeper.module.Resource}
	 */
	get resource() {
		return this._resource;
	}
	
	set resource(resource) {
		this._resource = resource;
	}
	
	/**
	 * Модуль ресурса.
	 * @property {CardinalKeeper.module.Module}
	 */
	get module() {
		return this.resource.module;
	}
	
	/**
	 * Приложение.
	 * @property {CardinalKeeper.Application}
	 */
	get application() {
		return this.module.application;
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
	 * Конструктор действия.
	 */
	constructor(resource, name) {
		let me = this;
		me._resource = resource;
		me._name = name;
	}
	
	action(request, response) {
		
	}
	
};