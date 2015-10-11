
/* global Ext */

Ext.define("CardinalKeeper.model.base.Document", {
	
	extend: "CardinalKeeper.model.base.Base",
	
	idProperty: "document_id",
	
	fields: [{
		name: "document_id",
		type: "int"
	}, {
		name: "document_parent_id",
		type: "int",
		allowNull: true,
		defaultValue: null
	}, {
		name: "document_number",
		type: "string",
		allowNull: true,
		defaultValue: null
	}, {
		name: "document_subject",
		type: "string",
		allowNull: true,
		defaultValue: null
	}, {
		name: "document_notes",
		type: "string",
		allowNull: true,
		defaultValue: null
	}, {
		name: "document_date_start",
		type: "date",
		dateFormat: "Y-m-d",
		allowNull: true,
		defaultValue: null
	}, {
		name: "document_date_end",
		type: "date",
		dateFormat: "Y-m-d",
		allowNull: true,
		defaultValue: null
	}]
	
});