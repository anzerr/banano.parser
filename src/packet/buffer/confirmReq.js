'use strict';

const block = require('./block.js');

module.exports = (header, d, flag) => {
	return Buffer.concat([
		header,
		block(header, d, flag)
	]);
};
