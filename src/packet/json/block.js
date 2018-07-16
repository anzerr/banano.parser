'use strict';

const meta = require('../meta.js'),
	u = require('../util.js');

module.exports = (json, d) => {
	const block = {type: meta.block.typeMap[json.extensions]};
	if (!block.type) {
		throw new Error('invalid block type');
	}

	let pos = 8, fields = meta.block.struct[block.type], order = meta.block.order[block.type];
	for (let x in order) {
		let i = order[x];
		block[i] = d.slice(pos, pos + fields[i]).toString('hex');
		pos += fields[i];
	}

	if (d.length !== pos + 72) {
		throw new Error('invalid block length');
	}

	let work = d.slice(pos + 64, pos + 72);
	if (meta.block.endian[block.type]) {
		work = work.reverse();
	}
	block.work = work.toString('hex');

	if (!u.block.validWork(block.previous, block.work)) {
		throw new Error('invalid block work');
	}

	block.hash = u.block.hash(block);
	block.signature = d.slice(pos, pos + 64).toString('hex');

	if (!u.block.verify(block.hash, block.signature, block.account)) {
		throw new Error('invalid block signature');
	}

	json.body = block;
	return json;
};
