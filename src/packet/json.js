'use strict';

const confirmAck = require('./json/confirmAck.js'),
	block = require('./json/block.js'),
	def = require('./json/default.js'),
	keepAlive = require('./json/keepalive.js');

module.exports = {
	invalid: def,
	invalidType: def,
	keepAlive: keepAlive,
	publish: block,
	confirmReq: block,
	confirmAck: confirmAck,
	bulkPull: def,
	bulkPush: def,
	frontierReq: def
};
