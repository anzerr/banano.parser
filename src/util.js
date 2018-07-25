'use strict';

const meta = require('./packet/meta.js'),
 	header = require('./packet/header.js');

const util = {};

util.packetType = (a) => {
	if (a instanceof Buffer) {
		return meta.typeMap[a[5]];
	}
	if (Number.isInteger(a)) {
		return meta.typeMap[a];
	}
	return null;
};

util.blockType = (a) => {
	if (a instanceof Buffer) {
		return meta.block.typeMap[a.readInt16BE(6)]; // make this better read buffer 16 bit interger
	}
	if (Number.isInteger(a)) {
		return meta.block.typeMap[a];
	}
	return a;
};

util.createHeader = (data) => {
	return header(data);
};

util.getBlockSize = (a, detail) => {
	let id = util.blockType(a);
	if (!meta.block.struct[id]) {
		throw new Error('id is not a valid block type');
	}
	let out = detail ? [] : 0;
	for (let i in meta.block.order[id]) {
		let n = meta.block.order[id][i];
		if (detail) {
			out.push({
				name: n,
				size: meta.block.struct[id][n]
			});
		} else {
			out += meta.block.struct[id][n];
		}
	}
	return out;
};

module.exports = util;
