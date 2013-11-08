var SeriallyRepeatingJob 	= require('../lib/SeriallyRepeatingJob.js');
var assert 					= require('assert');

describe('SeriallyRepeatingJob', function () {

	it('executes the task repeatedly, first after a certain delay and then in constant intervals, job execution will not overlap - meaning delays can occur', function (done) {
		var taskCalled = 0;

		function task(job) {
			taskCalled++;

			assert.strictEqual(job, this);

			if (taskCalled == 1) {
				setTimeout(function () {
					job.done();
				}, 500);
			} else {
				job.done();
			}
		}

		var job = new SeriallyRepeatingJob(task, { delay: 200, interval: 100, unref: true });

		job.execute();

		setTimeout(function () {
			assert.strictEqual(taskCalled, 1);

			setTimeout(function () {
				assert.strictEqual(taskCalled, 2);
				setTimeout(function () {
						assert.strictEqual(taskCalled, 3);
					done();
				}, 105);
			}, 600);

		}, 210);
	});

	it('will not continue if task implementation doesnt call done', function (done) {
		var taskCalled = 0;

		function task(job) {
			taskCalled++;
			assert.strictEqual(job, this);
		}

		var job = new SeriallyRepeatingJob(task, { delay: 20, interval: 100, unref: true });

		job.execute();

		setTimeout(function () {
			assert.strictEqual(taskCalled, 1);
			done();
		}, 200);
	});

	it('can be cancelled', function (done) {
		var taskCalled = 0;

		function task(job) {
			taskCalled++;
			assert.strictEqual(job, this);
			job.done();
		}

		var job = new SeriallyRepeatingJob(task, { delay: 100, interval: 100, unref: true });

		job.execute();

		setTimeout(function () {
			assert.strictEqual(taskCalled, 1);
			job.cancel();

			setTimeout(function () {
				assert.strictEqual(taskCalled, 1);
				done();
			}, 200);
		}, 110);
	});
});

