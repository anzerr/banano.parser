'use strict';

const {packet, util} = require('../index.js');
const assert = require('assert');

const frq = {
	json: {
		mainnet: true,
		versionMax: 15,
		versionUsing: 10,
		versionMin: 7,
		type: 'frontierReq',
		extensions: 0,
		start: Buffer.alloc(32, 0).toString('hex'),
		age: 0xffffffff,
		count: 0xaaaaaaaa
	},
	buffer: Buffer.concat([
		util.createHeader({
			type: 8, // frontier req
		}),
		Buffer.concat([
			Buffer.alloc(32, 0),
			Buffer.from([
				0xff, 0xff, 0xff, 0xff, // age 32 bit
				0xaa, 0xaa, 0xaa, 0xaa, // count 32 bit
			])
		])
	])
};

// json to buffer
assert.equal(new packet.Json(frq.json).toBuffer().get().equals(frq.buffer), true);

// buffer to json
assert.deepEqual(new packet.Buffer(frq.buffer).toJson().get(), frq.json);
