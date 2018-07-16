'use strict';

module.exports = (header, d) => {
	const buf = Buffer.alloc(8);
	buf.writeInt32BE(d.age, 0);
	buf.writeInt32BE(d.account, 0);
	return Buffer.concat([Buffer.from(d.start, 'hex'), buf]);
};
