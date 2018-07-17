'use strict';

const meta = require('./packet/meta.js');

const util = {};

util.packetType = (a) => {
	if (a instanceof Buffer) {
		return meta.typeMap[a[5]];
	}
	if (Number.isInteger(a)) {
		return meta.typeMap[a];
	}
	return null;
};

module.exports = util;
