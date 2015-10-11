
/* global Ext */

Ext.define("CardinalKeeper.view.base.tab.gridtab.Form", {
	
	extend: "Ext.form.Panel",
	
	xtype: "gridtabform",
	
	layout: "anchor",
	
	defaults: {
		xtype: "textfield",
		labelWidth: 130,
		anchor: "100%"
	},
	
	trackResetOnLoad: true
	
	//http://javascript.ru/forum/extjs/56236-svyazannyjj-bind-komponent-zavisit-ot-validnosti-formy.html
	/*listeners: {
		validitychange: "onValidityChange",
		scope: "this"
	},
	
	initComponent: function() {
		this.callParent(arguments);
		
		// не работает - сбивает ссылку на форму - перенес в контроллер окна
		
		var viewModel = this.lookupViewModel();
		viewModel && viewModel.set("form.isValid", this.isValid());
	},
	
	onValidityChange: function(me, valid) {
		var viewModel = this.lookupViewModel();
		viewModel && viewModel.set("form.isValid", valid);
	}*/
	
});