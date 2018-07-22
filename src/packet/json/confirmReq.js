'use strict';

const u = require('../util.js'),
	block = require('./block.js');

module.exports = (json, d, flag) => {
	json.block = block(u.copy(json), d, flag).block;
	return json;
};
