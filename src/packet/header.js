'use strict';

const meta = require('./meta.js');

module.exports = (type) => {
	return Buffer.from([
		meta.header.magic, // coin
		meta.header.network.main, // network
		meta.header.version.max, // max version
		meta.header.version.current, // current version
		meta.header.version.min, // min version
		type, // type
		0x00, // extensions 16-bits
		0x00 // extensions 16-bits
	]);
};
