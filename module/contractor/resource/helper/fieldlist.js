
"use strict";

/**
 * @param {String} fields Список полей через запятую.
 * @param {String} prefix Префикс полей в массиве значений values.
 * @param {Object} values Массив значений { fieldname: value, ... }.
 */
module.exports = function(fields, prefix, values) {
	let result = [];
	fields = fields.split(",");
	fields.forEach(field => {
		field = field.trim();
		if (prefix + "_" + field in values) {
			result.push(`${field} = $/${prefix}_${field}/`);
		}
	});
	return result.length ? result.join(", ") : null;
};