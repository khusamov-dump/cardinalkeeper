
Ext.define("CardinalKeeper.module.contractor.model.base.Contractor", {
	
	extend: "CardinalKeeper.model.base.Document",
	
	fields: [{
		name: "contractor_id",
		type: "int"
	}, {
		name: "contractor_type",
		type: "string"
	}, {
		name: "contractor_title",
		type: "string"
	}]
	
});