
"use strict";

module.exports = function(fields, prefix, values) {
	let result = [];
	fields = fields.split(",");
	fields.forEach(field => {
		field = field.trim();
		if (prefix + "_" + field in values) {
			result.push(`${field} = $/${prefix}_${field}/`);
		}
	});
	return result.join(", ");
};