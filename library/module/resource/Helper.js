
"use strict";

/**
 * Класс действия ресурса.
 * @class CardinalKeeper.module.resource.Helper
 */

module.exports = class Helper { 
	
	/**
	 * Ресурс помощника.
	 * @property {CardinalKeeper.module.Resource}
	 */
	get resource() {
		return this._resource;
	}
	
	set resource(resource) {
		this._resource = resource;
	}
	
	helper() {}
	
};