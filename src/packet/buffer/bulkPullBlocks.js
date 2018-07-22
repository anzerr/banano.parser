'use strict';

const u = require('../util.js');

module.exports = (header, d) => {
	const buf = Buffer.alloc(5);
	buf.writeUIntLE(d.mode || 0, 0, 1);
	buf.writeUIntLE(d.count || 0, 1, 4);
	return Buffer.concat([
		header,
		u.transform.buffer(d.min, 32),
		u.transform.buffer(d.max, 32),
		buf
	]);
};
