'use strict';
/* eslint max-len: 0*/

const packet = require('./index.js');

let compare = (a, b) => {
	return JSON.stringify(a) === JSON.stringify(b);
};

let p1 = new packet.Json({type: 'keepAlive'}).toBuffer();

const alivePacket = '42580f0a07020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
const pBuffer = p1.get().toString('hex');
if (pBuffer !== alivePacket) {
	throw new Error('packet malformed');
} else {
	console.log(pBuffer, p1.toJson().get());
}

const parsePacket = '42580a0a0702000000000000000000000000ffffae8a37e09f1b00000000000000000000ffff9f41f42d9f1b00000000000000000000ffffb9f3083da31b00000000000000000000ffff6898bf799f1b00000000000000000000ffff2511e6939f1b00000000000000000000ffffb2802efc9f1b00000000000000000000ffff34e86c0d550b00000000000000000000ffffa763c2919f1b';
let p = new packet.Buffer(Buffer.from(parsePacket, 'hex')).toJson();
let pJson = {
	mainnet: true,
	versionMax: 10,
	versionUsing: 10,
	versionMin: 7,
	type: 'keepAlive',
	extensions: 0,
	body: [
		'174.138.55.224:7071',
		'159.65.244.45:7071',
		'185.243.8.61:7075',
		'104.152.191.121:7071',
		'37.17.230.147:7071',
		'178.128.46.252:7071',
		'52.232.108.13:2901',
		'167.99.194.145:7071'
	]
};

if (!compare(p.get(), pJson)) {
	throw new Error('failed to parse packet into json');
}

if (p.toBuffer().get().toString('hex').substr(12) !== parsePacket.substr(12)) {
	throw new Error('packet is malformed going back into buffer format');
}
