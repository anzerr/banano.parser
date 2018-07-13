'use strict';

const meta = require('../meta.js'),
	u = require('../util.js');

module.exports = (header, d) => {
	const body = d.body, key = d.privateKey;
	if (body && body.type && meta.block.type[body.type]) {
		throw Error('invalid_block_type');
	}

	header.writeInt16BE(meta.block.type[body.type], 6);

	const payload = {}, fields = meta.block.struct[body.type];
	for (let i in fields) {
		if (!body[i]) {
			throw new Error('missing_field_' + fields[i]);
		}
		let value = Buffer.from(body[i], 'hex');
		if (value.length !== fields[i]) {
			throw new Error('length_mismatch_' + fields[i]);
		}
		payload.push(value);
	}

	let hash = u.block.hash(payload);
	let signature = body.signature ? Buffer.from(body.signature, 'hex') : key ? u.block.sign(hash, key) : null;

	let work = Buffer.from(body.work, 'hex');
	if (meta.block.endian[body.task]) {
		work = work.reverse();
	}

	if (work.length !== 8) {
		throw new Error('length_mismatch_work');
	}

	return Buffer.concat([header]).concat(payload).concat([signature, work]);
};
