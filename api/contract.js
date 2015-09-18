
exports.index = function(req, res) {
	res.send({
		title: "Список договоров",
		items: [{
			id: 1,
			name: "Договор № 1"
		}]
	});
};