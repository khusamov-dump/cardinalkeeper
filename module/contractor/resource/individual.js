
"use strict";

/* global CardinalKeeper */

module.exports = class extends CardinalKeeper.module.Resource {
	
	constructor(module) {
		super(module, "individual");
	}
	
	index(request, response) { // GET
		var me = this;
		me.database.query("select * from individual_view")
			.then(function(data) {
				response.send({
					title: "Список физических лиц",
					success: true,
					total: data.length,
					start: 0,
					page: 1,
					data: data
				});
			})
			.catch(function(error) {
				console.error("Ошибка при запросе списка физических лиц:", error);
			});
	}
	
	create(request, response) { // POST
		var me = this;
		var sql = {
			insertIndividual: `
				insert into 
				individual(first_name, surname, patronymic) 
				values($/individual_first_name/, $/individual_surname/, $/individual_patronymic/) 
				returning *
			`,
			selectOneContractor: `
				select * from contractor 
				where contractor_id = $/contractor_id/
			`,
			selectOneDocument: `
				select * from document 
				where document_id = $/document_id/
			`,
			updateOneDocument: `
				update document set 
					notes = $/notes/, 
					date_start = $/date_start/, 
					number = $/number/ 
				where document_id = $/document_id/
			`
		};
		
		me.database.oneOrNone(sql.insertIndividual, request.body)
			.then(function(individual) {
				return me.database.oneOrNone(sql.selectOneContractor, individual)
					.then(function(contractor) {
						return {
							main: individual,
							contractor: contractor
						};
					});
			})
			.then(function(individual) {
				return me.database.oneOrNone(sql.selectOneDocument, individual.contractor)
					.then(function(document) {
						individual.document = document;
						return individual;
					});
			})
			.then(function(individual) {
				
				individual.document["notes"] = request.body["document_notes"];
				individual.document["date_start"] = request.body["document_date_start"];
				individual.document["number"] = request.body["document_notes"];
				
				return me.database.none(sql.updateOneDocument, individual.document).then(function() { return individual });
				
				
			})
			.then(function(individual) {
				response.send({
					success: true,
					data: request.body,
					individual: individual
				});
			})
			.catch(function(error) {
				console.log("Произошла ошибка при вставке нового физического лица:", error);
			});
			
		
	}
	
	update(request, response) { // PUT
		
	}
	
	destroy(request, response) { // DELETE
		
	}
	
};