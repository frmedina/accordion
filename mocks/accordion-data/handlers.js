'use strict';

const BASE_PATH = '/rest/api/accordion',
	fixtures = require('./fixtures');

module.exports = (app) => {
	const url = `${BASE_PATH}/data-1`;
	app.get(url, (req, res) => res.status(200).json(fixtures['accordion-data-1']));
	return url;
};
