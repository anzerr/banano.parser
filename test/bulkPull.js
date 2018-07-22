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
		account: '0000000000000000000000000000000000000000000000000000000000000000',
		end: '0000000000000000000000000000000000000000000000000000000000000000'
	},
	buffer: Buffer.concat([
		util.createHeader({
			type: 6, // bulk pull
		}),
		Buffer.concat([
			Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex'),
			Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex')
		])
	])
};

// json to buffer
assert.equal(new packet.Json(bup.json).toBuffer().get().equals(bup.buffer), true);

// buffer to json
assert.deepEqual(new packet.Buffer(bup.buffer).toJson().get(), bup.json);
