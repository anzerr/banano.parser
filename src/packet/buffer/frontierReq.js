'use strict';

module.exports = () => {
	return Buffer.concat([Buffer.alloc(32), Buffer.from('ffffffff', 'hex')]);
};
