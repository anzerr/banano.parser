'use strict';

module.exports = (json, d) => {
	json.body = d.slice(8, d.length);
	console.log('frontierReq', d.length);
	return json;
};
