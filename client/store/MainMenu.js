
/* global Ext */

Ext.define("CardinalKeeper.store.MainMenu", {
	
	extend: "Ext.data.TreeStore",
	
	alias: "store.mainmenu",
	
	model: "CardinalKeeper.model.MainMenuItem",
	
	root: {
		text: "Компания",
		path: "company",
		expanded: true,
		/*children: [{
			text: "Контрагенты",
			path: "contractor",
			expanded: false,
			children: [{
				path: "individual",
				text: "Физические лица",
				leaf: true
			}, {
				path: "legal",
				text: "Юридические лица",
				leaf: true
			}, {
				path: "businessman",
				text: "Индивидуальные предприниматели",
				leaf: true
			}]
		}, {
			text: "Договора",
			path: "contract",
			
			leaf: true,
			expanded: false,
			children: [{
				path: "out",
				text: "Исходящие",
				leaf: true
			}, {
				path: "in",
				text: "Входящие",
				leaf: true
			}]
			
		}, {
			text: "Платежные поручения",
			path: "payment-order",
			expanded: true,
			leaf: true
		}, {
			text: "Факсимильные копии документов",
			path: "faximile",
			expanded: true,
			leaf: true
		}, {
			text: "Справочники",
			path: "lookup",
			expanded: false,
			children: [{
				path: "legal-form",
				text: "Организационно-правовые формы",
				leaf: true
			}, {
				path: "faximile",
				text: "Факсимиле печатей и подписей",
				leaf: true
			}]
		}]*/
	}
	
});