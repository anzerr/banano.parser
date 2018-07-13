'use strict';

const HEX64CHAR_PATTERN = /^[A-F-a-f0-9]{64}$/;

module.exports = (header, d) => {
	let start = '', end = '';
	if (typeof d.body === 'string' && HEX64CHAR_PATTERN.test(d.body)) {
		start = d.body;
		end = d.body;
	} else {
		throw new Error('invalid_account');
	}
	return Buffer.concat([
		header,
		Buffer.from(start, 'hex'),
		Buffer.from(end, 'hex')
	]);
};
