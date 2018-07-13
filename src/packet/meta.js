'use strict';

module.exports = {
	header: {
		magic: 0x42, // coin
		network: {
			main: 0x58,
			test: 0xff
		}, // network
		version: {
			max: 0x0f,
			current: 0x0a,
			min: 0x07
		}
	},

	type: {
		invalid: 0,
		invalidType: 1,
		keepAlive: 2,
		publish: 3,
		confirmReq: 4,
		confirmAck: 5,
		bulkPull: 6,
		bulkPush: 7,
		frontierReq: 8
	},

	typeMap: [
		'invalid',
		'invalidType',
		'keepAlive',
		'publish',
		'confirmReq',
		'confirmAck',
		'bulkPull',
		'bulkPush',
		'frontierReq',
	],

	block: {
		type: {
			invalid: 0x00,
			invalidBlock: 0x01,
			send: 0x02,
			receive: 0x03,
			open: 0x04,
			change: 0x05,
			state: 0x06
		},

		typeMap: [
			'invalid',
			'invalidBlock',
			'send',
			'receive',
			'open',
			'change',
			'state'
		],

		endian: {
			send: 1,
			receive: 1,
			change: 1,
			state: 0
		},

		order: {
			state: [
				'account',
				'previous',
				'representative',
				'balance',
				'link'
			]
		},

		struct: {
			send: {
				previous: 32,
				destination: 32,
				balance: 16
			},
			receive: {
				previous: 32,
				source: 32
			},
			change: {
				previous: 32,
				representative: 32
			},
			state: {
				previous: 32,
				balance: 16,
				representative: 32,
				account: 32,
				link: 32
			}
		}
	}
};
