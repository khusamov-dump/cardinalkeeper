
/* global Ext */

Ext.define("CardinalKeeper.view.base.tab.gridtab.Grid", {
	
	extend: "Ext.grid.Panel",
	
	requires: [
		"CardinalKeeper.view.base.tab.gridtab.GridController",
		"CardinalKeeper.view.base.tab.gridtab.GridModel",
		"CardinalKeeper.view.base.tab.gridtab.ContextMenu",
		"CardinalKeeper.view.base.tab.gridtab.Dialog"
	],
	
	controller: "gridtab",
	
	viewModel: {
		type: "gridtab"
	},
	
	subViews: {
		form: null,
		dialog: null,
		contextMenu: null
	},
	
	selModel: {
		mode: "multi"
	},
	
	bind: {
		title: "{title}",
		store: "{gridStore}"
	},
	
	listeners: {
		itemcontextmenu: "onItemContextMenu",
		containercontextmenu: "onContainerContextMenu",
		containerclick: "onContainerClick"
	},
	
	bbar: {
		xtype: "pagingtoolbar",
		displayInfo: true,
		bind: {
			store: "{gridStore}"
		}
	}
	
});