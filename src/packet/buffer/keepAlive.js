'use strict';

const u = require('../util.js');

module.exports = (header, d) => {
	let peer = [];

	for (let i in d.peer) {
		peer.push(u.ip.json.parse(d.peer[i]));
	}

	while (peer.length < 8) {
		peer.push(Buffer.alloc(18));
	}

	return Buffer.concat([header, Buffer.concat(peer)]);
};
