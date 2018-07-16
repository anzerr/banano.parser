'use strict';

module.exports = (header, d) => {
	const buf = Buffer.alloc(8);
	buf.writeInt32BE(d.age || 0, 0);
	buf.writeInt32BE(d.count || 0, 0);
	return Buffer.concat([
		d.start instanceof Buffer ? d.start : Buffer.from(d.start, 'hex'),
		buf
	]);
};
