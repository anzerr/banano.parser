'use strict';

module.exports = (json, d) => {
	if (d.length !== (32 + 4 + 4 + 8)) {
		throw new Error('invalid length');
	}
	json.account = d.slice(8, 40).toString('hex'); // 32 account
	json.age = d.readUIntLE(40, 4); // 4
	json.count = d.readUIntLE(44, 4); // 4
	return json;
};
