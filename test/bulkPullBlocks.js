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
		min: '0000000000000000000000000000000000000000000000000000000000000000',
		max: '0000000000000000000000000000000000000000000000000000000000000000',
		mode: 0xff,
		count: 0xffffffff
	},
	buffer: Buffer.concat([
		util.createHeader({
			type: 9, // bulk pull blocks
		}),
		Buffer.concat([
			Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex'), // min
			Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex'), // max
			Buffer.from([
				0xff, // mode 8 bit
				0xff, 0xff, 0xff, 0xff, // count 32 bit
			])
		])
	])
};

// json to buffer
assert.equal(new packet.Json(bpb.json).toBuffer().get().equals(bpb.buffer), true);

// buffer to json
assert.deepEqual(new packet.Buffer(bpb.buffer).toJson().get(), bpb.json);
