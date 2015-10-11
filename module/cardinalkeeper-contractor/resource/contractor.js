
"use strict";

/* global CardinalKeeper */

module.exports = class extends CardinalKeeper.module.Resource {
	
	constructor(module) {
		super(module, "contractor");
	}
	
	index(request, response) { // GET
		var me = this;
		me.database.query("select * from contractor_view")
			.then(function(data) {
				response.send({
					title: "Список контрагентов",
					success: true,
					total: data.length,
					start: 0,
					page: 1,
					data: data
				});
			})
			.catch(function(error) {
				console.error("Ошибка при запросе списка контрагентов:", error);
			});
	}
	
	create(request, response) { // POST
		//var me = this;
		
	}
	
	update(request, response) { // PUT
		
	}
	
	destroy(request, response) { // DELETE
		
	}
	
};