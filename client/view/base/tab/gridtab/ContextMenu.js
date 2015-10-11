
/* global Ext */

Ext.define("CardinalKeeper.view.base.tab.gridtab.ContextMenu", {
	
	extend: "Ext.menu.Menu",
	
	requires: ["CardinalKeeper.view.base.tab.gridtab.ContextMenuController"],
	
	xtype: "gridtabcontextmenu",
	
	listeners: {
		click: "onClick",
		beforeshow: "onBeforeShow"
	},
	
	controller: "gridtabcontextmenu",
	
	items: [{
		itemId: "insert",
		cls: "none single multi",
		text: "Добавить"
	}, {
		itemId: "update",
		cls: "single",
		text: "Редактировать"
	}, {
		itemId: "delete",
		cls: "single multi",
		text: "Удалить"
	}]
	
});