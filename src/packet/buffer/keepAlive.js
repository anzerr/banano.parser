'use strict';

module.exports = (header) => {
	return Buffer.concat([header, Buffer.alloc(144)]);
};
