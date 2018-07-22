'use strict';

const packet = require('./src/packet.js'),
	util = require('./src/util.js');

module.exports = {
	packet: {Json: packet.Json, Buffer: packet.Buffer},
	util: util
};
