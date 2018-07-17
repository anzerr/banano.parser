'use strict';

const packet = require('./src/packet.js'),
	util = require('./src/util.js');

module.exports = {
	Json: packet.Json,
	Buffer: packet.Buffer,
	util: util
};
