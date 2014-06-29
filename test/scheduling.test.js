var schedule = require('../lib/scheduling.js');
var assert = require('assert');
var Constants = require('../lib/temporalUtil.js').millisConstants;

describe('scheduling', function () {


	it('schedules a one time job for a date in the future', function (done) {
		var now = new Date();

		var jobTime = new Date(now.getTime() + 100);

		var taskFired = 0;

		function task(job) {
			taskFired++;
		}

		var job = schedule(jobTime, task);

		setTimeout(function () {
			assert.strictEqual(taskFired, 1);

			setTimeout(function () {
				assert.strictEqual(taskFired, 1);
				done();
			}, 100)
		}, 120)
	});


	describe('schedules a repeating job', function () {

		it('starts in the next interval event', function () {

			var taskFired = 0;

			function task(job) {
				taskFired++;
				job.done();
			}

			var sampleDate = new Date(2013, 11, 25, 0, 30);

			var interval = {
				hour: 1,
				minute: 60,
				now: sampleDate.getTime()
			};

			var job = schedule(interval, task, { createOnly: true });

			assert.strictEqual(job._options.delay, Constants.HOUR + (Constants.MINUTE * 30));

			assert.strictEqual(job._options.interval, Constants.HOUR * 2);
		});

		it('starts whenever we tell it to start', function () {

			var taskFired = 0;

			function task(job) {
				taskFired++;
				job.done();
			}

			var sampleNow = new Date(2013, 11, 25, 0, 10);
			var sampleDate = new Date(2013, 11, 25, 0, 30);

			var interval = {
				hour: 1,
				minute: 60,
				now: sampleNow.getTime(),
				start: sampleDate
			};

			var job = schedule(interval, task, { createOnly: true });

			assert.strictEqual(job._options.delay, Constants.MINUTE * 20);

			assert.strictEqual(job._options.interval, Constants.HOUR * 2);
		});

		it('executes on time (second resolution)', function (done) {

			this.timeout(7500);

			var now = Date.now();

			var taskFired = 0;
			var fireTime = 0;
			function task(job) {
				fireTime = Date.now();
				taskFired++;
				job.done();
			}

			var interval = {
				second: 5,
				start: now + 1000
			};

			var job = schedule(interval, task);

			setTimeout(function () {
				assert.strictEqual(taskFired, 2);
				assert.strictEqual(Math.round(fireTime / 1000), Math.round( (now + 6000) / 1000));
				done();
			}, 7000);


		});
	});

});