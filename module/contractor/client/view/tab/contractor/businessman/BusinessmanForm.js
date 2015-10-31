
/* global Ext */

Ext.define("CardinalKeeper.module.contractor.view.tab.contractor.businessman.BusinessmanForm", {
	
	extend: "CardinalKeeper.view.base.tab.gridtab.Form",
	
	xtype: "businessmanform",
	
	items: [{
		fieldLabel: "ИНН",
		name: "document_number",
		bind: "{record.document_number}"
	}, {
		fieldLabel: "Дата регистрации",
		name: "document_date_start",
		bind: "{record.document_date_start}",
		xtype: "datefield",
		format: "Y-m-d"
	}, {
		fieldLabel: "Физическое лицо",
		name: "document_parent_id",
		bind: "{record.document_parent_id}",
		xtype: "combobox",
		allowBlank: false,
		autoLoadOnValue: true,
		store: {
			type: "contractor-individuals"
		},
		displayField: "contractor_title",
		valueField: "document_id",
		/*pageSize: 25,
		matchFieldWidth: false,*/
		listConfig: {
			border: 1
		}
	}, {
		fieldLabel: "Заметки",
		name: "document_notes",
		bind: "{record.document_notes}",
		xtype: "textarea"
	}]
	
});