
/* global Ext */

Ext.define("CardinalKeeper.module.contractor.view.tab.contractor.Contractor", {
	
	extend: "CardinalKeeper.view.base.tab.gridtab.Grid",
	
	title: "Контрагенты",
	
	viewModel: {
		data: {
			gridDataModel: "CardinalKeeper.module.contractor.model.Contractor"
		},
	},
	
	subViews: {
		contextMenu: false
	},
	
	columns: [{
		dataIndex: "document_id",
		text: "Техномер",
		width: 60,
		hidden: true
	}, {
		dataIndex: "document_number",
		text: "ИНН",
		width: 80
	}, {
		dataIndex: "document_date_start",
		text: "Регистрация",
		width: 160,
		xtype: "datecolumn",
		format: "Y-m-d"
	}, {
		dataIndex: "contractor_title_short",
		text: "Контрагент",
		flex: 2
	}, {
		dataIndex: "contractor_type",
		text: "Тип",
		flex: 2
	}, {
		dataIndex: "document_notes",
		text: "Заметки",
		flex: 4
	}]
	
});