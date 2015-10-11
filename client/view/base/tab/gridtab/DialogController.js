
/* global Ext */

Ext.define("CardinalKeeper.view.base.tab.gridtab.DialogController", {
	
	extend: "Ext.app.ViewController",
	
	alias: "controller.gridtabdialog",
	
	init: function() {
		//this.getViewModel().set("form", this.lookupReference("form"));
		
		// TODO посмотреть это свойство http://docs.sencha.com/extjs/5.1/5.1.1-apidocs/#!/api/Ext.grid.Panel-cfg-twoWayBindable
		// TODO также посмотреть это свойство http://docs.sencha.com/extjs/5.1/5.1.1-apidocs/#!/api/Ext.form.field.ComboBox-cfg-publishes
		// Возможно оно поможет 
	
		//http://javascript.ru/forum/extjs/56236-svyazannyjj-bind-komponent-zavisit-ot-validnosti-formy.html
		var formPanel = this.lookupReference("form");
		var viewModel = formPanel.lookupViewModel();
		
		viewModel && viewModel.set("form.isValid", !formPanel.hasInvalidField());
		viewModel && viewModel.set("form.isDirty", formPanel.isDirty());
		
		
		
		/* перетащил в формулы
		var valid = !formPanel.hasInvalidField();
		var dirty = formPanel.isDirty();
		var submitDisabled = !valid || !dirty;
		viewModel && viewModel.set("form.submitDisabled", submitDisabled);*/
		
		// TODO Опцию form.submitDisabled реализовать на формулах, см. тут http://javascript.ru/forum/extjs/56330-pochemu-ne-rabotayut-usloviya-v-bind.html
		
		formPanel.on("validitychange", function(form, valid) {
			var viewModel = formPanel.lookupViewModel();
			
			viewModel && viewModel.set("form.isValid", valid);
			
			/*перетащил в формулы
			var dirty = formPanel.isDirty();
			var submitDisabled = !valid || !dirty;
			viewModel && viewModel.set("form.submitDisabled", submitDisabled);*/
		});
		
		formPanel.on("dirtychange", function(form, dirty) {
			var viewModel = formPanel.lookupViewModel();
			
			viewModel && viewModel.set("form.isDirty", dirty);
			
			/*перетащил в формулы
			var valid = !formPanel.hasInvalidField();
			var submitDisabled = !valid || !dirty;
			viewModel && viewModel.set("form.submitDisabled", submitDisabled);*/
		});
		
	},
	
	onBeforeShow: function() {
		var me = this;
		var form = me.lookupReference("form");
		var record = form.getRecord();
		me.getViewModel().set("record", record.phantom ? record : record.copy());
	},
	
	getStore: function() {
		return this.getViewModel().get("gridStore");
	},
	
	onSubmit: function() {
		var me = this;
		var form = me.lookupReference("form");
		
		if (form.isValid()) {
			form.updateRecord();
			
			if (form.getRecord().phantom) {
				// insert
				Ext.Msg.wait("Данные добавляются! Подождите...", "Добавление");
				form.getRecord().save({
					scope: me,
					success: me.onInsertSuccess,
					failure: me.onInsertFailure
				});
			} else {
				// update
				var store = me.getStore();
				
				//https://fiddle.sencha.com/#fiddle/o95
				if (form.isDirty()) {
				//if (store.getModifiedRecords().length || store.getRemovedRecords().length) {
					
					Ext.Msg.wait("Данные обновляются! Подождите...", "Обновление");
					store.sync({
						scope: me,
						/*callback: function() {
							console.info(arguments);
						},*/
						
						//http://javascript.ru/forum/extjs/56295-kogda-v-forme-datapole-mystore-sync-podvisaet.html
						
						
						//http://javascript.ru/forum/extjs/56291-podvisanie-na-ext-data-store-sync.html
						/*success: "onSyncSuccess",
						failure: "onSyncFailure",*/
						success: me.onUpdateSuccess,
						failure: me.onUpdateFailure
					});
				} else {
					me.getView().close();
				}
				
			}
		}
	},
	
	onInsertSuccess: function(record) {
		var me = this;
		me.getStore().add(record);
		
		// Вызов record.save() не обновляет pagingtoolbar и не меняет фантомный id на реальный
		// http://javascript.ru/forum/showthread.php?p=375070#post375070
		me.getStore().sync();
		
		Ext.Msg.hide();
		me.getView().close();
	},
	
	onInsertFailure: function(record, operation) {
		var me = this;
		Ext.Msg.hide();
		Ext.Msg.alert("Ошибка", "Произошла ошибка при добавлении!");
		console.error("Произошла ошибка при добавлении!", record, operation);
	},
	
	onUpdateSuccess: function(record) {
		var me = this;
		Ext.Msg.hide();
		me.getView().close();
	},
	
	onUpdateFailure: function(batch, options) {
		var me = this;
		Ext.Msg.hide();
		Ext.Msg.alert("Ошибка", "Произошла ошибка при обновлении!");
		console.error("Произошла ошибка при обновлении!", batch, options);
	}
	
});