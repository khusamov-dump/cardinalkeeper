
/* global Ext */

Ext.define("CardinalKeeper.module.contractor.view.tab.contractor.individual.IndividualForm", {
	
	extend: "CardinalKeeper.view.base.tab.gridtab.Form",
	
	xtype: "individualform",
	
	items: [{
		name: "individual_surname",
		fieldLabel: "Фамилия",
		allowBlank: false,
		bind: "{record.individual_surname}"
	}, {
		name: "individual_first_name",
		fieldLabel: "Имя",
		allowBlank: false,
		bind: "{record.individual_first_name}"
	}, {
		name: "individual_patronymic",
		fieldLabel: "Отчество",
		bind: "{record.individual_patronymic}"
	}, {
		name: "document_number",
		fieldLabel: "ИНН",
		bind: "{record.document_number}"
	}, {
		xtype: "datefield",
		name: "document_date_start",
		fieldLabel: "Дата регистрации",
		format: "Y-m-d",
		bind: "{record.document_date_start}"
	}, {
		xtype: "textarea",
		name: "document_notes",
		fieldLabel: "Заметки",
		bind: "{record.document_notes}"
	}]
	
});