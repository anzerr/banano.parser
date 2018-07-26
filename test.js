'use strict';

const util = require('./src/util.js');
const assert = require('assert');

assert.equal(util.packetType(1), 'invalidType');
assert.equal(util.packetType(Buffer.from([0, 0, 0, 0, 0, 1])), 'invalidType');
assert.equal(util.packetType(1000), null);

assert.equal(util.blockType(1), 'notBlock');
assert.equal(util.blockType(Buffer.from([0, 0, 0, 0, 0, 0, 0, 1])), 'notBlock');
assert.equal(util.blockType('notBlock'), 'notBlock');
assert.equal(util.blockType(1000), null);

let stateSize = 0, state = [
	{name: 'account', size: 32},
	{name: 'previous', size: 32},
	{name: 'representative', size: 32},
	{name: 'balance', size: 16},
	{name: 'link', size: 32},
	{name: 'signature', size: 64},
	{name: 'work', size: 8}
];
state.map((e) => {
	return (stateSize += e.size);
});

assert.deepEqual(util.getBlockSize(6, true), state);
assert.deepEqual(util.getBlockSize(Buffer.from([0, 0, 0, 0, 0, 0, 0, 6]), true), state);
assert.deepEqual(util.getBlockSize('state', true), state);

assert.deepEqual(util.getBlockSize(6), stateSize);
assert.deepEqual(util.getBlockSize(Buffer.from([0, 0, 0, 0, 0, 0, 0, 6])), stateSize);
assert.deepEqual(util.getBlockSize('state'), stateSize);

// 0
// 1
require('./test/keepAlive.js'); // 2
require('./test/publish.js'); // 3
require('./test/confirmReq.js');// 4
require('./test/confirmAck.js'); // 5
require('./test/bulkPull.js'); // 6
// 7 bulkPush
require('./test/frontierReq.js'); // 8
require('./test/bulkPullBlocks.js'); // 9
