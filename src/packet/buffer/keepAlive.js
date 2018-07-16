'use strict';

const u = require('../util.js');

module.exports = (header, d) => {
	let body = [];

	for (let i in d.body) {
		let peer = u.ip.json.parse(d.body[i]);
		body.push(peer);
	}

	while (body.length < 8) {
		body.push(Buffer.alloc(18));
	}

	return Buffer.concat([header, Buffer.concat(body)]);
};
