
/* global Ext */

Ext.define("CardinalKeeper.model.base.Base", {
	
	extend: "Ext.data.Model",
	
	clientIdProperty: "client_id",
	
	identifier: "sequential",
	
	schema: {
		namespace: "CardinalKeeper.model",
		proxy: {
			type: "rest",
			//url: "application/rest/{entityName:uncapitalize}",
			reader: {
				type: "json",
				rootProperty: "data",
				totalProperty: "total",
				successProperty: "success",
				messageProperty: "error"
			},
			writer: {
				type: "json"
			}
		}
	}
	
});