
/* global Ext */

Ext.define("CardinalKeeper.module.contractor.view.tab.contractor.legal.LegalForm", {
	
	extend: "CardinalKeeper.view.base.tab.gridtab.Form",
	
	xtype: "legalform",
	
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
		title: "Наименование юридического лица",
		xtype: "fieldset",
		defaults: {
			xtype: "textfield",
			anchor: "100%"
		},
		items: [{
			fieldLabel: "Полное",
			name: "legal_title",
			bind: "{record.legal_title}",
			allowBlank: false
		}, {
			fieldLabel: "Сокращенное",
			name: "legal_title_short",
			bind: "{record.legal_title_short}"
		}]
	}, {
		xtype: "fieldset",
		title: "Организационно-правовая форма (ОПФ)",
		defaults: {
			xtype: "textfield",
			anchor: "100%"
		},
		items: [{
			fieldLabel: "Тип ОПФ",
			name: "legal_form_id",
			bind: "{record.legal_form_id}",
			xtype: "combobox",
			allowBlank: false,
			autoLoadOnValue: true,
			store: {
				type: "legalforms",
				/*listeners: {
					load: function(store) {
						store.insert(0, [{
							legal_form_id: null,
							title_short: "",
							title: "Без формы"
						}]);
					}
				}*/
			},
			displayField: "title",
			valueField: "legal_form_id",
			//editable: false,
			//pageSize: 25,
			matchFieldWidth: false,
			listConfig: {
				minWidth: 220,
				border: 1,
				itemTpl: "{title_short} — {title}"
			},
			
		}, {
			fieldLabel: "Суффикс",
			name: "ownership_type_add",
			bind: "{record.ownership_type_add}",
			emptyText: "Например «города Москвы»"
		/*}, {
			xtype: "fieldset",
			title: "Другая организационно-правовая форма",
			defaults: {
				xtype: "textfield",
				anchor: "100%"
			},
			items: [{
				xtype: "textarea",
				name: "ownership_type_freetitle",
				fieldLabel: "Другая ОПФ",
				bind: "{record.ownership_type_freetitle}"
			}, {
				name: "ownership_type_freetitle",
				fieldLabel: "Сокращение",
				bind: "{record.ownership_type_freetitle_short}"
			}]*/
		}]
	}, {
		fieldLabel: "Заметки",
		name: "document_notes",
		bind: "{record.document_notes}",
		xtype: "textarea"
	}]
	
});