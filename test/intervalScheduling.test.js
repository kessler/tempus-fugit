var intervalScheduling = require('../lib/intervalScheduling.js');
var assert = require('assert');

describe('intervalScheduling', function () {

	it('compute millis from an interval literal', function () {

		var literal = {
			millisecond: 5,
			second: 2,
			minute: 4,
			hour: 5,
			day: 3
		};

		var actual = intervalScheduling.toMillis(literal);

		assert.strictEqual(actual, 5 + (2 * 1000) + (60000 * 4) + (3600000 * 5) + (86400000 * 3));
	});

	it('')

});