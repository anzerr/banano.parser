'use strict';

const u = require('../util.js'),
	block = require('./block.js');

module.exports = (json, d) => {
	json.block = block(u.copy(json), Buffer.concat([
		d.slice(0, 8),
		d.slice(8, d.length)
	])).block;

	return json;
};
