'use strict';

const u = require('../util.js'),
	block = require('./block.js');

module.exports = (header, d, flag) => {
	return Buffer.concat([
		header,
		u.transform.buffer(d.account, 32),
		u.transform.buffer(d.signature, 64),
		u.transform.buffer(d.sequence, 8),
		block(header, d, flag)
	]);
};
