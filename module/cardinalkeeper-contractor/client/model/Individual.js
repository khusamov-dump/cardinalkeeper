
/* global Ext */

Ext.define("CardinalKeeper.module.contractor.model.Individual", {
	
	extend: "CardinalKeeper.module.contractor.model.base.Contractor",
	
	proxy: {
		url: "/api/contractor/individual"
	},
	
	fields: [{
		name: "individual_id",
		type: "int"
	}, {
		name: "individual_first_name",
		type: "string"
	}, {
		name: "individual_surname",
		type: "string"
	}, {
		name: "individual_patronymic",
		type: "string"
	}]
	
});