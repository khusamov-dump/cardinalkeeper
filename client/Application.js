
/* global Ext, Pace */

Ext.define("CardinalKeeper.Application", {
	
	extend: "Ext.app.Application",
	
	requires: [
		"Khusamov.override.Override", 
		"CardinalKeeper.view.main.Main"
	],
	
	mainView: "CardinalKeeper.view.main.Main",
	
	config: {
		title: "Кардинал Кипер 2015"
	},
	
	init: function() {
		this.initPageTitle();
		console.log(this.getTitle() + ". Программа управления предприятием.");
		console.log("Версия Sencha Ext JS =", Ext.getVersion().version);
		console.log(Pace ? "Обнаружена Pace." : "Внимание, Pace недоступна.");
		this.getMainView().getViewModel().set("applicationTitle", this.getTitle());
	},
	
	initPageTitle: function() {
		
		// TODO учитывать случай, когда в head уже есть свой title
		
		var title = "<title>" + this.getTitle() + "</title>";
		Ext.dom.Helper.append(Ext.getDoc().down("head"), title);
	},
	
	launch: function() {
		if (Pace) {
			Pace.stop();
			console.log("Pace успешно выключена.");
		}
	}
	
});