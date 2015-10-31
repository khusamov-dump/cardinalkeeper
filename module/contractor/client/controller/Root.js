
/* global Ext */

Ext.define("CardinalKeeper.module.contractor.controller.Root", {
	
	extend: "CardinalKeeper.controller.base.TabController",
	
	views: [
		"tab.contractor.Contractor",
		"tab.contractor.businessman.Businessman",
		"tab.contractor.individual.Individual",
		"tab.contractor.legal.Legal"
	],
	
	models: [
		"Contractor", 
		"Businessman", 
		"Individual", 
		"Legal"
	],
	
	stores: ["Individuals"],
	
	menu: {
		text: "Контрагенты",
		path: "contractor",
		expanded: false,
		children: [{
			text: "Физические лица",
			path: "individual",
			leaf: true
		}, {
			text: "Юридические лица",
			path: "legal",
			leaf: true
		}, {
			text: "Индивидуальные предприниматели",
			path: "businessman",
			leaf: true
		}]
	}
	
});