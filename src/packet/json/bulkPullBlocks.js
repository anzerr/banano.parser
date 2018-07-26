'use strict';

const error = require('../../error.js');

module.exports = (json, d) => {
	if (d.length !== (32 + 32 + 1 + 4 + 8)) {
		throw new error.Packet('invalid length');
	}
	json.min = d.slice(8, 40).toString('hex'); // 32 min
	json.max = d.slice(40, 72).toString('hex'); // 32 max
	json.mode = d.readUIntLE(72, 1); // 1
	json.count = d.readUIntLE(73, 4); // 4
	return json;
};
