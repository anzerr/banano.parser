'use strict';

const meta = require('./meta.js');

module.exports = (head) => {
	let payload = Buffer.from([
		meta.header.magic, // coin
		meta.header.network.main, // network
		head.versionMax || meta.header.version.max, // max version
		head.versionUsing || meta.header.version.current, // current version
		head.versionMin || meta.header.version.min, // min version
		head.type, // type
		0x00, // extensions 16-bits
		0x00 // extensions 16-bits
	]);
	if (head.extensions) {
		payload.writeInt16BE(head.extensions, 6);
	}
	return payload;
};
