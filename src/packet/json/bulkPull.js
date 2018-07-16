'use strict';

module.exports = (json, d) => {
	return json.body = d.slice(8, d.length);
};
