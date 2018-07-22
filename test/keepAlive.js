'use strict';

const {packet, util} = require('../index.js');
const assert = require('assert');

const kpa = {
	json: {
		mainnet: true,
		versionMax: 15,
		versionUsing: 10,
		versionMin: 7,
		type: 'keepAlive',
		extensions: 0,
		peer: [
			'174.138.55.224:7071',
			'159.65.244.45:7071',
			'185.243.8.61:7075',
			'104.152.191.121:7071',
			'37.17.230.147:7071',
			'178.128.46.252:7071',
			'52.232.108.13:2901',
			'167.99.194.145:7071'
		]
	},
	buffer: Buffer.concat([
		util.createHeader({
			type: 2, // keep alive
		}),
		Buffer.concat([
			Buffer.from('00000000000000000000ffffae8a37e09f1b', 'hex'),
			Buffer.from('00000000000000000000ffff9f41f42d9f1b', 'hex'),
			Buffer.from('00000000000000000000ffffb9f3083da31b', 'hex'),
			Buffer.from('00000000000000000000ffff6898bf799f1b', 'hex'),
			Buffer.from('00000000000000000000ffff2511e6939f1b', 'hex'),
			Buffer.from('00000000000000000000ffffb2802efc9f1b', 'hex'),
			Buffer.from('00000000000000000000ffff34e86c0d550b', 'hex'),
			Buffer.from('00000000000000000000ffffa763c2919f1b', 'hex')
		])
	])
};

// json to buffer
assert.equal(new packet.Json(kpa.json).toBuffer().get().equals(kpa.buffer), true);

// buffer to json
assert.deepEqual(new packet.Buffer(kpa.buffer).toJson().get(), kpa.json);
