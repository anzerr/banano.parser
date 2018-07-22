'use strict';

const u = require('../util.js');

module.exports = (header, d) => {
	return Buffer.concat([
		header,
		u.transform.buffer(d.account, 32),
		u.transform.buffer(d.end, 32)
	]);
};
