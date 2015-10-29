
"use strict";

/* global CardinalKeeper */

/**
 * @class CardinalKeeper.module.contractor.resource.individual.Update
 */

module.exports = class extends CardinalKeeper.module.resource.Action {
	
	constructor(resource) {
		super(resource, "update");
	}
	
	action(request, response) {
		let me = this;
		
		let sql = {
			selectOneDocument: `
				select * from document 
				where document_id = $/document_id/
			`,
			selectOneContractor: `
				select * from contractor 
				where document_id = $/document_id/
			`,
			selectOneIndividual: `
				select * from individual 
				where contractor_id = $/contractor_id/
			`
		};
		
		me.database.oneOrNone(sql.selectOneDocument, request.body)
			.then(function(document) {
				let promise = me.database.oneOrNone(sql.selectOneContractor, document)
					.then(function(contractor) {
						return {
							document: document,
							contractor: contractor
						};
					});
				return promise;
			})
			.then(function(individualEntity) {
				let promise = me.database.oneOrNone(sql.selectOneIndividual, individualEntity.contractor)
					.then(function(individual) {
						individualEntity.individual = individual;
						return individualEntity;
					});
				return promise;
			})
			.then(function(individualEntity) {
				request.body.individual_id = individualEntity.individual.individual_id;
				let promise = me.database.tx(function(t) {
					
					let batch = [], list;
					
					let fieldlist = me.resource.getHelper("FieldList");

					list = fieldlist("first_name, surname, patronymic", "individual", request.body);
					if (list) batch.push(t.none(`update individual set ${list} where individual_id = $/individual_id/`, request.body));
					
					list = fieldlist("notes, date_start, number", "document", request.body);
					if (list) batch.push(t.none(`update document set ${list} where document_id = $/document_id/`, request.body));
					
					return t.batch(batch);
				});
				return promise;
			})
			.then(function(individual) {
				response.send({
					success: true
				});
			})
			.catch(function(error) {
				console.log("Произошла ошибка при обновлении физического лица:", error);
				response.send({
					success: false
				});
			});
	}
	
};