'use strict';

const {packet, util} = require('../index.js');
const assert = require('assert');

const bup = {
	json: {
		mainnet: true,
		versionMax: 15,
		versionUsing: 10,
		versionMin: 7,
		type: 'bulkPull',
		extensions: 0,
		account: Buffer.alloc(32, 0).toString('hex'),
		end: Buffer.alloc(32, 1).toString('hex')
	},
	buffer: Buffer.concat([
		util.createHeader({
			type: 6, // bulk pull
		}),
		Buffer.concat([
			Buffer.alloc(32, 0),
			Buffer.alloc(32, 1)
		])
	])
};

// json to buffer
assert.equal(new packet.Json(bup.json).toBuffer().get().equals(bup.buffer), true);

// buffer to json
assert.deepEqual(new packet.Buffer(bup.buffer).toJson().get(), bup.json);
