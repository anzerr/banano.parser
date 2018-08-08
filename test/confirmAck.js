'use strict';

const {packet, util} = require('../index.js');
const assert = require('assert');

const ack = {
	json: {
		mainnet: true,
		versionMax: 15,
		versionUsing: 10,
		versionMin: 7,
		type: 'confirmAck',
		extensions: 6,
		account: Buffer.alloc(32, 0).toString('hex'),
		signature: Buffer.alloc(64, 1).toString('hex'),
		sequence: Buffer.alloc(8, 3).toString('hex'),
		block: {
			type: 'state',
			account: Buffer.alloc(32, 4).toString('hex'),
			previous: Buffer.alloc(32, 5).toString('hex'),
			representative: Buffer.alloc(32, 6).toString('hex'),
			balance: Buffer.alloc(16, 7).toString('hex'),
			link: Buffer.alloc(32, 8).toString('hex'),
			work: Buffer.alloc(8, 9).toString('hex'),
			hash: 'd7f3c2ddabbad18d62d13c06f30e7793a858140d10779e9692b572d2e0fb5441',
			signature: Buffer.alloc(64, 2).toString('hex')
		}
	},
	buffer: Buffer.concat([
		util.createHeader({
			type: 5, // ack
			extensions: 6 // state block
		}), // header
		Buffer.alloc(32, 0), // account
		Buffer.alloc(64, 1), // signature
		Buffer.alloc(8, 3), // sequence
		Buffer.concat([
			Buffer.alloc(32, 4), // Account public key
			Buffer.alloc(32, 5), // Previous block hash
			Buffer.alloc(32, 6), // Representative public key
			Buffer.alloc(16, 7), // uint128_t Balance
			Buffer.alloc(32, 8), // Link
			Buffer.alloc(64, 2), // Signature
			Buffer.alloc(8, 9) // uint64_t Work
		])
	])
};

// buffer to json
assert.deepEqual(new packet.Buffer(ack.buffer, {skipValidation: true}).toJson().get(), ack.json);

// json to buffer
assert.equal(new packet.Json(ack.json, {skipValidation: true}).toBuffer().get().equals(ack.buffer), true);
