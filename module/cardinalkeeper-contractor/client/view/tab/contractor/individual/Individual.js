
/* global Ext */

Ext.define("CardinalKeeper.module.contractor.view.tab.contractor.individual.Individual", {
	
	extend: "CardinalKeeper.view.base.tab.gridtab.Grid",
	
	requires: ["CardinalKeeper.module.contractor.view.tab.contractor.individual.IndividualForm"],
	
	title: "Физические лица",
	
	viewModel: {
		data: {
			gridDataModel: "CardinalKeeper.module.contractor.model.Individual"
		},
	},
	
	subViews: {
		form: "individualform",
		dialog: {
			viewModel: {
				data: {
					insertTitle: "Новое физическое лицо"
				},
				formulas: {
					updateTitle: function(get) {
						// TODO Когда поле не валидно, то по bind-у его значение не передается.
						var title = [];
						var surname = get("record.individual_surname");
						title.push(surname);
						var name = get("record.individual_first_name");
						if (name) title.push(name[0] + ".");
						var patronymic = get("record.individual_patronymic");
						if (patronymic) title.push(patronymic[0] + ".");
						return "Физическое лицо «" + title.join(" ") + "»";
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
		dataIndex: "individual_surname",
		text: "Фамилия",
		flex: 2
	}, {
		dataIndex: "individual_first_name",
		text: "Имя",
		flex: 2
	}, {
		dataIndex: "individual_patronymic",
		text: "Отчество",
		flex: 2
	}, {
		dataIndex: "document_notes",
		text: "Заметки",
		flex: 4
	}]
	
});