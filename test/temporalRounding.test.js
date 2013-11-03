var temporalRounding = require('../lib/temporalRounding.js');

var assert = require('assert');

describe('temporal rounding', function () {

	/*

		in javascript Date object months are 0 - 11 !!! its stupid but thats life
		(and its probably not stupid but has a complex reason I don't care to find right now)

	*/

	it('rounds from now to closest second', function () {
		var now = new Date(2013, 11, 25, 23, 23, 59, 123);

		var actual = temporalRounding.closestSecond(now);

		console.log('closest second:');
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

	it('rounds from now to closest minute', function () {
		var now = new Date(2013, 11, 25, 23, 59, 59, 123);

		var actual = temporalRounding.closestMinute(now);

		console.log('closest minute:');
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

	it('rounds from now to closest hour', function () {
		var now = new Date(2013, 11, 25, 22, 1, 1, 123);

		var actual = temporalRounding.closestHour(now);

		console.log('closest hour:');
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


	it('rounds from now to closest date', function () {
		var now = new Date(2013, 11, 25, 22, 1, 1, 123);

		var actual = temporalRounding.closestDate(now);

		console.log('closest date:');
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

	it('rounds from now to closest month', function () {
		var now = new Date(2013, 11, 25, 22, 1, 1, 123);

		var actual = temporalRounding.closestMonth(now);

		console.log('closest month:');
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

	it('rounds from now to closest year', function () {
		var now = new Date(2013, 11, 25, 22, 1, 1, 123);

		var actual = temporalRounding.closestYear(now);

		console.log('closest year:');
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

});