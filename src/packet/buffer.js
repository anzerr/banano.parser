'use strict';

const bulkPull = require('./buffer/bulkPull.js'),
	def = require('./buffer/default.js'),
	frontierReq = require('./buffer/frontierReq.js'),
	keepAlive = require('./buffer/keepAlive.js'),
	publish = require('./buffer/publish.js');

module.exports = {
	invalid: def,
	invalidType: def,
	keepAlive: keepAlive,
	publish: publish,
	confirmReq: publish,
	confirmAck: def,
	bulkPull: bulkPull,
	bulkPush: def,
	frontierReq: frontierReq
};
