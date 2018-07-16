'use strict';

const header = require('./packet/header.js'),
	meta = require('./packet/meta.js'),
	toBuffer = require('./packet/buffer.js'),
	toJson = require('./packet/json.js');

class PacketBuffer {

	constructor(d) {
		this._source = d;
		this._data = d;
	}

	format() {
		let d = this._source;
		if (!meta.type[d.type] || !toBuffer[d.type]) {
			throw new Error('data is not a buffer');
		}
		const head = header(meta.type[d.type]);

		if (d.extensions) {
			// payload.writeInt16BE(d.extensions, 6);
		}
		if (d.body instanceof Buffer) {
			this._data = Buffer.concat([head, d.body]);
		} else {
			this._data = toBuffer[d.type](head, d);
		}
		return this;
	}

	get() {
		return this._data;
	}

	toJson() {
		/* eslint no-use-before-define: 0*/
		return new PacketJson(this._data).format();
	}

}

class PacketJson {

	constructor(d) {
		this._source = d;
		this._data = d;
	}

	format() {
		let d = this._source;
		if (!(d instanceof Buffer)) {
			throw new Error('data is not a buffer');
		}
		if (d[0] !== meta.header.magic) {
			throw new Error('wrong magic number');
		}
		const json = {
			mainnet: d[1] === meta.header.network.main,
			versionMax: d[2],
			versionUsing: d[3],
			versionMin: d[4],
			type: meta.typeMap[d[5]] || d[5],
			extensions: d.readUInt16BE(6),
		};
		if (toJson[json.type]) {
			this._data = toJson[json.type](json, d);
		}
		return this;
	}

	get() {
		return this._data;
	}

	toBuffer() {
		return new PacketBuffer(this._data).format();
	}

}

module.exports = {Json: PacketJson, Buffer: PacketBuffer};
