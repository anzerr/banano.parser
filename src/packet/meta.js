'use strict';

module.exports = {
	header: {
		magic: 0x42, // coin
		network: {
			main: 0x58,
			test: 0xff
		}, // network
		version: {
			max: 15,
			current: 10,
			min: 7
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
		frontierReq: 8,
		bulkPullBlocks: 9
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
		'bulkPullBlocks'
	],

	block: {
		type: {
			invalid: 0x00,
			notBlock: 0x01,
			send: 0x02,
			receive: 0x03,
			open: 0x04,
			change: 0x05,
			state: 0x06
		},

		typeMap: [
			'invalid',
			'notBlock',
			'send',
			'receive',
			'open',
			'change',
			'state'
		],

		endian: {
			invalid: 1,
			notBlock: 1,
			send: 1,
			receive: 1,
			open: 1,
			change: 1,
			state: 0
		},

		order: {
			invalid: [],
			notBlock: [],
			send: [
				'previous',
				'destination',
				'balance'
			],
			receive: [
				'previous',
				'source'
			],
			open: [
				'source',
				'representative',
				'account'
			],
			change: [
				'previous',
				'representative'
			],
			state: [
				'account',
				'previous',
				'representative',
				'balance',
				'link'
			]
		},

		struct: {
			invalid: {},
			notBlock: {},
			send: {
				previous: 32,
				destination: 32,
				balance: 16
			},
			receive: {
				previous: 32,
				source: 32
			},
			open: {
				source: 32,
				representative: 32,
				account: 32
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
