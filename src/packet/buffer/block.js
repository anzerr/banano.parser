'use strict';

const meta = require('../meta.js'),
	u = require('../util.js'),
	error = require('../../error.js');

module.exports = (header, d, flag) => {
	const block = d.block;
	if (!block || !block.type || meta.block.type[block.type] === undefined) {
		throw new error.Block('invalid block type');
	}
	header.writeInt16BE(meta.block.type[block.type], 6);

	const payload = [], fields = meta.block.struct[block.type];
	for (let i in fields) {
		if (!block[i]) {
			throw new error.Block('missing field ' + i);
		}
		let value = Buffer.from(block[i], 'hex');
		if (value.length !== fields[i]) {
			throw new error.Block('length mismatch ' + i + ' not valid length ' + fields[i]);
		}
		payload.push(value);
	}

	let signature = Buffer.from(block.signature, 'hex');
	if (!signature) {
		let hash = u.block.hash(payload);
		if (!flag.privateKey) {
			throw new error.Block('can\'t sign without a private key');
		}
		signature = u.block.sign(hash, flag.privateKey);
	}

	let work = Buffer.from(block.work, 'hex');
	if (meta.block.endian[block.task]) {
		work = work.reverse();
	}

	if (work.length !== 8) {
		throw new error.Block('length mismatch work');
	}

	return Buffer.concat([
		Buffer.concat(payload),
		signature,
		work
	]);
};
