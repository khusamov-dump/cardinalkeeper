
/* global Ext */

Ext.define("CardinalKeeper.controller.Root", {
	
	extend: "Ext.app.Controller",
	
	refs: [{
		ref: "desktopTabPanel",
		selector: "tabpanel#desktop"
	}],
	
	control: {
		"treepanel#mainmenu": {
			itemclick: "onTreePanelItemClick"
		}
	},
	
	onTreePanelItemClick: function(treePanel, record) {
		var path = this.clearRootPath(record.getPath("path"));
		this.redirectTo(path);
	},
	
	clearRootPath: function(path) {
		var separator = "/";
		path = path.substring(1).split(separator);
		path.shift();
		return separator + path.join(separator) + separator;
	}
	
});