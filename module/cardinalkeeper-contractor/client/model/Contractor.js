
/* global Ext */

Ext.define("CardinalKeeper.module.contractor.model.Contractor", {
	
	extend: "CardinalKeeper.module.contractor.model.base.Contractor",
	
	proxy: {
		url: "/api/contractor"
	},
	
	fields: [{
		name: "contractor_id",
		type: "int"
	}, {
		name: "contractor_type",
		type: "string"
	}, {
		name: "contractor_title",
		type: "string"
	}, {
		name: "contractor_title_short",
		type: "string"
	}]
	
});