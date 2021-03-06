'use strict';

const error = require('../../error.js');

module.exports = (json, d) => {
	if (d.length !== (32 + 32 + 8)) {
		throw new error.Packet('invalid length');
	}
	json.account = d.slice(8, 40).toString('hex'); // 32 account
	json.end = d.slice(40, 72).toString('hex'); // 32 end block hash
	return json;
};
