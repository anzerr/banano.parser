'use strict';

const u = require('../util.js');

module.exports = (header, d) => {
	const buf = Buffer.alloc(8);
	buf.writeUIntLE(d.age || 0, 0, 4);
	buf.writeUIntLE(d.count || 0, 4, 4);
	return Buffer.concat([
		header,
		u.transform.buffer(d.start, 32),
		buf
	]);
};
