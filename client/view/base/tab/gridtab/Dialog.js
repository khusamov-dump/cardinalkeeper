
/* global Ext, CardinalKeeper */

Ext.define("CardinalKeeper.view.base.tab.gridtab.Dialog", {
	
	extend: "CardinalKeeper.view.base.window.Modal",
	
	requires: [
		"CardinalKeeper.view.base.tab.gridtab.DialogController",
		"CardinalKeeper.view.base.tab.gridtab.Form"
	],
	
	xtype: "gridtabdialog",
	
	controller: "gridtabdialog",
	
	viewModel: {
		data: {
			insertTitle: "Название формы не задано"
		},
		formulas: {
			ok: function(get) {
				return get("record").phantom ? "Добавить" : "Обновить";
			},
			okDisabled: function(get) {
				return !get("form.isDirty") || !get("form.isValid");
			},
			title: function(get) {
				return get("record").phantom ? get("insertTitle") : get("updateTitle");
			},
			updateTitle: function(get) {
				return get("insertTitle");
			}
		}
	},
	
	listeners: {
		beforeshow: "onBeforeShow"
	},
	
	bind: "{title}",

	buttons: [{
		text: "Ок",
		handler: "onSubmit",
		bind: {
			text: "{ok}",
			disabled: "{okDisabled}"
			//disabled: "{form.submitDisabled}"
			//disabled: "{!form.isDirty || !form.isValid}" // TODO потом выяснить, почему не оказывает действия! http://javascript.ru/forum/showthread.php?p=374642#post374642
			//disabled: "{!form.isDirty}"
		}
	}, {
		text: "Отмена",
		handler: function() {
			this.up("window").close();
		}
	}],
	
	getForm: function() {
		return this.lookupReference("form");
	},
	
	onBeforeAdd: function(component) {
		if (component instanceof CardinalKeeper.view.base.tab.gridtab.Form) {
			component.setReference("form");
		}
	}
	
});