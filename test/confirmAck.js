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
		account: '0000000000000000000000000000000000000000000000000000000000000000',
		signature: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
		sequence: '0000000000000000',
		block: {
			type: 'state',
			account: '0000000000000000000000000000000000000000000000000000000000000000',
			previous: '0000000000000000000000000000000000000000000000000000000000000000',
			representative: '0000000000000000000000000000000000000000000000000000000000000000',
			balance: '00000000000000000000000000000000',
			link: '0000000000000000000000000000000000000000000000000000000000000000',
			work: '0000000000000000',
			hash: '262fe88523691984386d53b022c52d5a8e414570d8a3ce941475760184465b18',
			signature: '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
		}
	},
	buffer: Buffer.concat([
		util.createHeader({
			type: 5, // ack
			extensions: 6 // state block
		}), // header
		Buffer.alloc(32), // account
		Buffer.alloc(64), // signature
		Buffer.alloc(8), // sequence
		Buffer.concat([
			Buffer.alloc(32), // Account public key
			Buffer.alloc(32), // Previous block hash
			Buffer.alloc(32), // Representative public key
			Buffer.alloc(16), // uint128_t Balance
			Buffer.alloc(32), // Link
			Buffer.alloc(64), // Signature
			Buffer.alloc(8) // uint64_t Work
		])
	])
};

// buffer to json
assert.deepEqual(new packet.Buffer(ack.buffer, {skipValidation: true}).toJson().get(), ack.json);

// json to buffer
assert.equal(new packet.Json(ack.json, {skipValidation: true}).toBuffer().get().equals(ack.buffer), true);
