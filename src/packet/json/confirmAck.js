'use strict';

const u = require('../util.js'),
	block = require('./block.js');

module.exports = (json, d) => {
	const account = d.slice(8, 40),
		signature = d.slice(40, 104),
		sequence = d.slice(104, 112);

	json.account = account.toString('hex');
	json.signature = signature.toString('hex');
	json.sequence = sequence.toString('hex');

	json.block = block(u.copy(json), Buffer.concat([
		d.slice(0, 8), // header
		d.slice(112, d.length) // block contents
	])).body;

	/* let h = u.blake.createHash('blake2b', {digestLength: 32});
            h.update(Buffer.from(json.block.hash, 'hex'));
            h.update(sequence);
            let hash = h.digest();
            if (u.block.verify(hash, signature, account)) {
                return json;
            }*/
	// return $.promise().reject(new Error('signature_invalid'));
	return json;
};
