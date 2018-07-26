'use strict';

module.exports = (json, d) => {
	if (d.length !== (32 + 4 + 4 + 8)) {
		throw new Error('invalid length');
	}
	json.start = d.slice(8, 40).toString('hex'); // 32 account to start from
	json.age = d.readUIntLE(40, 4); // 4 age in seconds sinse last modified
	json.count = d.readUIntLE(44, 4); // 4 how many to send back (not working?)
	return json;
};
