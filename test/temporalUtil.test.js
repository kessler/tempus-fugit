var tu = require('../lib/temporalUtil.js');
var assert = require('assert');

var tropicalYear = tu.millisConstants.TROPICAL_YEAR;

describe('temporalUtil', function () {

	it('compute millis from an interval literal', function () {

		var literal = {
			millisecond: 5,
			second: 2,
			minute: 4,
			hour: 5,
			day: 3
		};

		var actual = tu.intervalObjectToMillis(literal);

		assert.strictEqual(actual, 5 + (2 * 1000) + (60000 * 4) + (3600000 * 5) + (86400000 * 3));
	});


	it('count how many intervals occurred since epoch', function () {
		var now = new Date();

		// roughly how many years since unix epoch
		var actual = tu.intervalCountSinceEpoch(tropicalYear, now.getTime());

		assert.strictEqual(Math.floor(actual), now.getUTCFullYear() - 1970);
	});

	it('find the most recent interval event (calculated since epoch)', function () {

		var now = new Date();

		// day
		var actual = tu.recentIntervalEvent(tu.millisConstants.DAY, now.getTime());
		var expected = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

		assert.strictEqual(actual, expected);


		// hour
		actual = tu.recentIntervalEvent(tu.millisConstants.HOUR, now.getTime());
		expected = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours());

		assert.strictEqual(actual, expected);


		// minute
		actual = tu.recentIntervalEvent(tu.millisConstants.MINUTE, now.getTime());
		expected = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes());

		assert.strictEqual(actual, expected);

		// second
		actual = tu.recentIntervalEvent(tu.millisConstants.SECOND, now.getTime());
		expected = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

		assert.strictEqual(actual, expected);
	});


	it('find the next interval event (calculated since epoch)', function () {

		var now = new Date();

		// day
		var actual = tu.nextIntervalEvent(tu.millisConstants.DAY, now.getTime());
		var expected = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);

		assert.strictEqual(actual, expected);


		// hour
		actual = tu.nextIntervalEvent(tu.millisConstants.HOUR, now.getTime());
		expected = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours() + 1);

		assert.strictEqual(actual, expected);


		// minute
		actual = tu.nextIntervalEvent(tu.millisConstants.MINUTE, now.getTime());
		expected = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes() + 1);

		assert.strictEqual(actual, expected);

		// second
		actual = tu.nextIntervalEvent(tu.millisConstants.SECOND, now.getTime());
		expected = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds() + 1);

		assert.strictEqual(actual, expected);
	});



	/*

		in javascript Date object months are 0 - 11 !!! its stupid but thats life
		(and its probably not stupid but has a complex reason I don't care to find right now)

	*/
	it('rounds from now to next second', function () {
		var now = new Date(2013, 11, 25, 23, 23, 59, 123);

		var actual = tu.nextSecond(now);

		console.log('next second:');
		console.log(now);
		console.log(actual + '\n');

		assert.strictEqual(actual.getMilliseconds(), 0);
		assert.strictEqual(actual.getSeconds(), 0);
		assert.strictEqual(actual.getMinutes(), 24);
		assert.strictEqual(actual.getHours(), 23);
		assert.strictEqual(actual.getDate(), 25);
		assert.strictEqual(actual.getMonth(), 11);
		assert.strictEqual(actual.getFullYear(), 2013);
	});

	it('rounds from now to next minute', function () {
		var now = new Date(2013, 11, 25, 23, 59, 59, 123);

		var actual = tu.nextMinute(now);

		console.log('next minute:');
		console.log(now);
		console.log(actual + '\n');

		assert.strictEqual(actual.getMilliseconds(), 0);
		assert.strictEqual(actual.getSeconds(), 0);
		assert.strictEqual(actual.getMinutes(), 0);
		assert.strictEqual(actual.getHours(), 0);
		assert.strictEqual(actual.getDate(), 26);
		assert.strictEqual(actual.getMonth(), 11);
		assert.strictEqual(actual.getFullYear(), 2013);
	});

	it('rounds from now to next hour', function () {
		var now = new Date(2013, 11, 25, 22, 1, 1, 123);

		var actual = tu.nextHour(now);

		console.log('next hour:');
		console.log(now);
		console.log(actual + '\n');

		assert.strictEqual(actual.getMilliseconds(), 0);
		assert.strictEqual(actual.getSeconds(), 0);
		assert.strictEqual(actual.getMinutes(), 0);
		assert.strictEqual(actual.getHours(), 23);
		assert.strictEqual(actual.getDate(), 25);
		assert.strictEqual(actual.getMonth(), 11);
		assert.strictEqual(actual.getFullYear(), 2013);
	});


	it('rounds from now to next date', function () {
		var now = new Date(2013, 11, 25, 22, 1, 1, 123);

		var actual = tu.nextDate(now);

		console.log('next date:');
		console.log(now);
		console.log(actual + '\n');

		assert.strictEqual(actual.getMilliseconds(), 0);
		assert.strictEqual(actual.getSeconds(), 0);
		assert.strictEqual(actual.getMinutes(), 0);
		assert.strictEqual(actual.getHours(), 0);
		assert.strictEqual(actual.getDate(), 26);
		assert.strictEqual(actual.getMonth(), 11);
		assert.strictEqual(actual.getFullYear(), 2013);
	});

	it('rounds from now to next month', function () {
		var now = new Date(2013, 11, 25, 22, 1, 1, 123);

		var actual = tu.nextMonth(now);

		console.log('next month:');
		console.log(now);
		console.log(actual + '\n');

		assert.strictEqual(actual.getMilliseconds(), 0);
		assert.strictEqual(actual.getSeconds(), 0);
		assert.strictEqual(actual.getMinutes(), 0);
		assert.strictEqual(actual.getHours(), 0);
		assert.strictEqual(actual.getDate(), 1);
		assert.strictEqual(actual.getMonth(), 0);
		assert.strictEqual(actual.getFullYear(), 2014);
	});

	it('rounds from now to next year', function () {
		var now = new Date(2013, 11, 25, 22, 1, 1, 123);

		var actual = tu.nextYear(now);

		console.log('next year:');
		console.log(now);
		console.log(actual + '\n');

		assert.strictEqual(actual.getMilliseconds(), 0);
		assert.strictEqual(actual.getSeconds(), 0);
		assert.strictEqual(actual.getMinutes(), 0);
		assert.strictEqual(actual.getHours(), 0);
		assert.strictEqual(actual.getDate(), 1);
		assert.strictEqual(actual.getMonth(), 0);
		assert.strictEqual(actual.getFullYear(), 2014);
	});


	it('normalizes interval objects', function () {
		var io = {
			millisecond: 1001,
			second: 59,
			minute: 59,
			hour: 23
		}

		var actual = tu.normalizeIntervalObject(io);
		var expected = { millisecond: 1, second: 0, minute: 0, hour: 0, day: 1 };

		for (var f in expected) {
			assert.strictEqual(actual[f], expected[f]);
		}
	});

});