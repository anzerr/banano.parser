'use strict';

const blake2b = require('blake2b'),
	nacl = require('nacl'),
	BigNumber = require('BigNumber'),
	pow = require('banano.pow');

const IPV4MASK = Buffer.from('00000000000000000000ffff', 'hex');
const STATE_BLOCK_PREAMBLE = '0000000000000000000000000000000000000000000000000000000000000006';

module.exports = {
	array: {
		key: (a, k) => {
			return a.indexOf(k);
		}
	},

	copy: (d) => {
		let o = {};
		for (let i in d) {
			o[i] = d[i];
		}
		return o;
	},

	blake: blake2b,

	ip: {
		parseBuffer: (buf, offset) => {
			if (buf instanceof Buffer) {
				const result = [];
				if (buf.slice(offset, offset + 12).equals(IPV4MASK)) {
					// IPv4
					for (let i = offset + 12; i < offset + 16; i++) {
						result.push(buf[i]);
					}
					return result.join('.') + ':' + buf.readUInt16LE(offset + 16);
				}
				// IPv6
				for (let i = offset; i < offset + 16; i += 2) {
					result.push(buf.readUInt16BE(i).toString(16));
				}
				return '[' + result.join(':').replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3').replace(/:{3,4}/, '::') + ']:' + buf.readUInt16LE(offset + 16);
			}
			return null;
		},

		match: (str) => {
			if ($.is.string(str)) {
				let m = str.match(/(.+?):(\d*)/);
				if ($.is.array(m) && m[1] && m[2]) {
					return {address: m[1], port: Number(m[2])};
				}
			}
			return null;
		}
	},

	block: {
		hash: (block) => {
			let balancePadded = null;
			if (typeof block === 'number') {
				let balance = new BigNumber(666300000000000000000000000000000);
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
			return nacl.sign.detached.verify(hash, signature, account);
		},

		sign: (hash, k) => {
			let key = k instanceof Buffer ? k : Buffer.from(k, 'hex');
			if (key.length !== 32) {
				throw new Error('length_mismatch_private_key');
			}
			return Buffer.from(nacl.sign.detached(hash, key));
		},

		validWork: (hex, work) => {
			return pow.isValid(hex, work);
		}
	}
};
