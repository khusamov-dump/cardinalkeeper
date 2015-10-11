
/* global Ext */

Ext.define("CardinalKeeper.controller.base.BaseController", {
	
	extend: "Ext.app.Controller",
	
	/**
	 * Получить имя пространства модуля.
	 */
	getNamespace: function() {
		var me = this;
		var result = null;
		var classname = me.self.getName();
		var namespaces = me.getApplication().namespaces;
		namespaces.forEach(function(namespace) {
			if (classname.indexOf(namespace) == 0) {
				result = namespace;
				return false;
			}
		});
		return result;
	},
	
});