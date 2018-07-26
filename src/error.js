'use strict';

const BlockError = require('./error/block.js'),
	PacketError = require('./error/packet.js');

module.exports = {
	block: BlockError,
	packet: PacketError
};
