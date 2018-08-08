'use strict';

const {packet, util} = require('../index.js');
const assert = require('assert');

const bpb = {
	json: {
		mainnet: true,
		versionMax: 15,
		versionUsing: 10,
		versionMin: 7,
		type: 'bulkPullBlocks',
		extensions: 0,
		min: Buffer.alloc(32, 0).toString('hex'),
		max: Buffer.alloc(32, 1).toString('hex'),
		mode: 0xff,
		count: 0xaaaaaaaa
	},
	buffer: Buffer.concat([
		util.createHeader({
			type: 9, // bulk pull blocks
		}),
		Buffer.concat([
			Buffer.alloc(32, 0), // min
			Buffer.alloc(32, 1), // max
			Buffer.from([
				0xff, // mode 8 bit
				0xaa, 0xaa, 0xaa, 0xaa, // count 32 bit
			])
		])
	])
};

// json to buffer
assert.equal(new packet.Json(bpb.json).toBuffer().get().equals(bpb.buffer), true);

// buffer to json
assert.deepEqual(new packet.Buffer(bpb.buffer).toJson().get(), bpb.json);
