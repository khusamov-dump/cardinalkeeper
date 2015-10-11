
/* global Ext */

Ext.define("CardinalKeeper.module.contractor.view.tab.contractor.businessman.Businessman", {
	
	extend: "CardinalKeeper.view.base.tab.gridtab.Grid",
	
	requires: ["CardinalKeeper.module.contractor.view.tab.contractor.businessman.BusinessmanForm"],
	
	title: "Индивидуальные предприниматели",
	
	viewModel: {
		data: {
			gridDataModel: "CardinalKeeper.module.contractor.model.Businessman"
		},
	},
	
	subViews: {
		form: "businessmanform",
		dialog: {
			viewModel: {
				data: {
					insertTitle: "Новый индивидуальный предприниматель"
				},
				formulas: {
					updateTitle: function(get) {
						// TODO Когда поле не валидно, то по bind-у его значение не передается.
						/*var title = [];
						var surname = get("record.individual_surname");
						title.push(surname);
						var name = get("record.individual_first_name");
						if (name) title.push(name[0] + ".");
						var patronymic = get("record.individual_patronymic");
						if (patronymic) title.push(patronymic[0] + ".");
						return "ИП «" + title.join(" ") + "»";*/
						return "ИП";
					}
				}
			}
		}
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
		text: "Индивидуальный предприниматель",
		flex: 2
	}, {
		dataIndex: "document_notes",
		text: "Заметки",
		flex: 4
	}]
	
});