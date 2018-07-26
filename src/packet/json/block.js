'use strict';

const meta = require('../meta.js'),
	u = require('../util.js'),
	error = require('../../error.js');

module.exports = (json, d, flag) => {
	const block = {type: meta.block.typeMap[json.extensions]};
	if (!block.type) {
		throw new error.Block('invalid block type');
	}

	let pos = 8, fields = meta.block.struct[block.type], order = meta.block.order[block.type];
	for (let x in order) {
		let i = order[x];
		block[i] = d.slice(pos, pos + fields[i]).toString('hex');
		pos += fields[i];
	}

	if (d.length !== pos + 72) {
		throw new error.Block('invalid block length');
	}

	let work = d.slice(pos + 64, pos + 72);
	if (meta.block.endian[block.type]) {
		work = work.reverse();
	}
	block.work = work.toString('hex');

	if (!flag.skipValidation && !u.block.validWork(block.previous, block.work)) {
		throw new error.Block('invalid block work');
	}

	block.hash = u.block.hash(block);
	block.signature = d.slice(pos, pos + 64).toString('hex');

	if (!flag.skipValidation && !u.block.verify(block.hash, block.signature, block.account)) {
		throw new error.Block('invalid block signature');
	}

	json.block = block;
	return json;
};
