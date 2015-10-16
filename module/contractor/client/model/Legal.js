
/* global Ext */

Ext.define("CardinalKeeper.module.contractor.model.Legal", {
	
	extend: "CardinalKeeper.module.contractor.model.base.Contractor",
	
	proxy: {
		url: "/api/contractor/legal"
	},
	
	fields: [{
		name: "legal_form_id",
		type: "int"
	}, {
		name: "legal_form_title",
		type: "string"
	}, {
		name: "legal_form_title_short",
		type: "string"
	}, {
		name: "legal_title",
		type: "string"
	}, {
		name: "legal_title_short",
		type: "string"
	}, {
		name: "legal_id",
		type: "int"
	}]
	
});