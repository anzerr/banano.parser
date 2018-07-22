'use strict';

const u = require('../util.js'),
	block = require('./block.js');

module.exports = (json, d, flag) => {
	const account = d.slice(8, 40), // 32
		signature = d.slice(40, 104), // 64
		sequence = d.slice(104, 112); // 8

	json.account = account.toString('hex');
	json.signature = signature.toString('hex');
	json.sequence = sequence.toString('hex');

	json.block = block(u.copy(json), Buffer.concat([
		d.slice(0, 8),
		d.slice(112, d.length)
	]), flag).block;

	return json;
};
