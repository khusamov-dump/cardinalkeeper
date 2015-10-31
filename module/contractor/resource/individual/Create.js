
"use strict";

/* global CardinalKeeper */

/**
 * @class CardinalKeeper.module.contractor.resource.individual.Create
 */

module.exports = class extends CardinalKeeper.module.resource.Action {
	
	constructor(resource) {
		super(resource, "create");
	}
	
	action(request, response) {
		let me = this;
		
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
				request.body.client_id = request.body.document_id;
				request.body.document_id = individual.document.document_id;
				response.send({
					success: true,
					data: request.body
				});
			})
			.catch(function(error) {
				console.log("Произошла ошибка при вставке нового физического лица:", error);
				response.send({
					success: false
				});
			});
	}
	
};