'use strict';

const {packet, util} = require('../index.js');
const assert = require('assert');

const req = {
	json: {
		mainnet: true,
		versionMax: 15,
		versionUsing: 10,
		versionMin: 7,
		type: 'confirmReq',
		extensions: 6,
		block: {
			type: 'state',
			account: Buffer.alloc(32, 0).toString('hex'),
			previous: Buffer.alloc(32, 1).toString('hex'),
			representative: Buffer.alloc(32, 2).toString('hex'),
			balance: Buffer.alloc(16, 3).toString('hex'),
			link: Buffer.alloc(32, 4).toString('hex'),
			work: Buffer.alloc(8, 5).toString('hex'),
			hash: '605fbb27b5623808a4631862598eb5b0a2fbeca7a709f4203ce8335a0453cfe8',
			signature: Buffer.alloc(64, 6).toString('hex')
		}
	},
	buffer: Buffer.concat([
		util.createHeader({
			type: 4, // req
			extensions: 6 // state block
		}), // header
		Buffer.concat([
			Buffer.alloc(32, 0), // Account public key
			Buffer.alloc(32, 1), // Previous block hash
			Buffer.alloc(32, 2), // Representative public key
			Buffer.alloc(16, 3), // uint128_t Balance
			Buffer.alloc(32, 4), // Link
			Buffer.alloc(64, 6), // Signature
			Buffer.alloc(8, 5) // uint64_t Work
		])
	])
};

// buffer to json
assert.deepEqual(new packet.Buffer(req.buffer, {skipValidation: true}).toJson().get(), req.json);

// json to buffer
assert.equal(new packet.Json(req.json, {skipValidation: true}).toBuffer().get().equals(req.buffer), true);
