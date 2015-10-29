
"use strict";

/* global CardinalKeeper */

//let merge = require("merge");
let fieldlist = require("./helper/fieldlist.js");

module.exports = class extends CardinalKeeper.module.Resource {
	
	constructor(module) {
		super(module, "individual");
	}
	
	index(request, response) { // GET
		let me = this;
		
		let offset = Number(request.query.start || 0);
		let limit = Number(request.query.limit || 25);
		
		let sql = {
			count: `select count(*) as total from individual_view`,
			select: `select * from individual_view offset ${offset} limit ${limit}`
		};
		
		me.database
			.one(sql.count)
			.then(function(data) {
				let total = Number(data.total);
				let promise = me.database
					.query(sql.select)
					.then(function(data) {
						response.send({
							success: true,
							start: offset,
							limit: limit,
							total: total,
							data: data
						});
					});
				return promise;
			})
			.catch(function(error) {
				console.error("Ошибка при запросе списка физических лиц:", error);
				response.send({
					success: false,
					message: "Ошибка при запросе списка физических лиц",
					error: error
				});
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
				response.send({
					success: false
				});
			});
	}
	
	update(request, response) { // PUT
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
	
	destroy(request, response) { // DELETE
		response.send({
			success: false,
			message: "Метод не реализован"
		});
	}
	
};