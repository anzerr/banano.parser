'use strict';

const blake2b = require('blake2b'),
	nacl = require('nacl'),
	pow = require('banano.pow');

const STATE_BLOCK_PREAMBLE = '0000000000000000000000000000000000000000000000000000000000000006';

const transform = {
	uint8: function(a) {
		return Uint8Array.from(this.buffer(a));
	},

	buffer: function(data, n) {
		let isBuf = data instanceof Buffer, isString = typeof data === 'string';
		if (!n) {
			return isBuf ? data : Buffer.from(data, 'hex');
		}

		if (!isBuf && !isString) {
			throw new Error('wrong type has to be string or buffer');
		}
		if (isBuf && data.length === n) {
			return data;
		}
		if (isString && data.match(/^[A-F-a-f0-9]+$/) && data.length === n * 2) {
			return Buffer.from(data, 'hex');
		}
		throw new Error('wrong length for data needs to be ' + n);
	}
};

module.exports = {
	array: {
		key: (a, k) => {
			return a.indexOf(k);
		}
	},

	transform: transform,

	copy: (d) => {
		let o = {};
		for (let i in d) {
			o[i] = d[i];
		}
		return o;
	},

	blake: blake2b,

	ip: {
		buffer: {
			IPV4MASK: Buffer.from('00000000000000000000ffff', 'hex'),
			isIPv4: function(buf) {
				return buf.slice(0, 12).equals(this.IPV4MASK);
			},

			parserIPv4: function(buf) {
				let result = [];
				for (let i = 12; i < 16; i++) {
					result.push(buf[i]);
				}
				return result.join('.') + ':' + buf.readUInt16LE(16);
			},

			parseIPv6: function(buf) {
				let result = [];
				for (let i = 0; i < 16; i += 2) {
					result.push(buf.readUInt16BE(i).toString(16));
				}
				return '[' + result.join(':').replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3').replace(/:{3,4}/, '::') + ']:' + buf.readUInt16LE(16);
			},

			parse: function(buf) {
				if (buf instanceof Buffer) {
					if (this.isIPv4(buf)) {
						return this.parserIPv4(buf);
					}
					return this.parseIPv6(buf);
				}
				return null;
			}
		},
		json: {
			parse: function(str) {
				let x = str.split(':'), ip = x[0].split('.');
				let buf = Buffer.alloc(18);
				buf[10] = 0xff;
				buf[11] = 0xff;
				for (let i = 0; i < 4; i++) {
					buf[12 + i] = Number(ip[i]);
				}
				buf.writeUInt16LE(Number(x[1]), 16);
				return buf;
			}
		}
	},

	block: {
		hash: (block) => {
			let balancePadded = null;
			if (typeof block === 'number') {
				let balance = BigInt(666300000000000000000000000000000);
				balancePadded = balance.toString(16);
				while (balancePadded.length < 32) {
					balancePadded = '0' + balancePadded;
				}
			}
			let h = blake2b.createHash({digestLength: 32});
			h.update(Buffer.from(STATE_BLOCK_PREAMBLE, 'hex'));
			h.update(Buffer.from(block.account, 'hex'));
			h.update(Buffer.from(block.previous, 'hex'));
			h.update(Buffer.from(block.representative, 'hex'));
			h.update(Buffer.from(balancePadded || block.balance, 'hex'));
			h.update(Buffer.from(block.link, 'hex'));
			return Buffer.from(h.digest()).toString('hex');
		},

		verify: (hash, signature, account) => {
			return nacl.sign.detached.verify(transform.uint8(hash), transform.uint8(signature), transform.uint8(account));
		},

		sign: (hash, k) => {
			let key = transform.buffer(k);
			if (key.length !== 32) {
				throw new Error('length mismatch private key');
			}
			return Buffer.from(nacl.sign.detached(transform.uint8(hash), transform.uint8(key)));
		},

		validWork: (hex, work) => {
			return pow.isValid(hex, work);
		},

		// this is async
		createWork: (hex) => {
			return pow.findPow(hex);
		}
	}
};
