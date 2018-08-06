'use strict';

class PacketError extends Error {

	constructor() {
		super(...arguments);
	}

}

module.exports = PacketError;
