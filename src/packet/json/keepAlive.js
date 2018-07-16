'use strict';

const u = require('../util.js');

module.exports = (json, d) => {
	const peers = [];
	if (d.length !== 152) {
		throw new Error('invalid_block_length');
	}
	for (let i = 8; i < 152; i += 18) {
		let peer = u.ip.buffer.parse(d.slice(i, i + 18));
		if (peer && peer !== '[::]:0') {
			peers.push(peer);
		}
	}
	json.body = peers;
	return json;
};
