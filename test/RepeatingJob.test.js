var RepeatingJob 	= require('../lib/RepeatingJob.js');
var assert 			= require('assert');

describe('RepeatingJob', function (done) {

	it('executes the task repeatedly, first after a certain delay and then in constant intervals with no regard to overlapping executions', function () {
		var taskCalled = 0;

		function task() {
			taskCalled++;
			assert.strictEqual(job, this);
		}

		var job = new RepeatingJob(task, { delay: 1000, interval: 1000, unref: true });

		job.execute();

		setTimeout(function () {
			assert.strictEqual(taskCalled, 1);

			setTimeout(function () {
				assert.strictEqual(taskCalled, 4);
			}, 3300);
		}, 1100);
	});

	it('can be cancelled', function (done) {
		var taskCalled = 0;

		function task() {
			console.log(taskCalled++);
			assert.strictEqual(job, this);
		}

		var job = new RepeatingJob(task, { delay: 100, interval: 100, unref: true });

		job.execute();

		setTimeout(function () {
			job.cancel();

			setTimeout(function () {
				assert.strictEqual(taskCalled, 1);
				done();
			}, 100);
		}, 110);
	});

	it('unrefs the time if specified in the options', function () {
		var job = new RepeatingJob(function () {}, { delay: 10, interval: 100, unref: true });

		var unrefCalled = false;
		job._executeImpl = function () {
			return {
				unref: function () {
					unrefCalled = true;
				}
			}
		};

		job.execute();

		assert.ok(unrefCalled);
	});

	// it('bench', function () {

	// 	function task() {
	// 	}

	// 	var size = 10000;
	// 	var time = process.hrtime();

	// 	for (var i = 0; i < size; i++) {
	// 	var job = new RepeatingJob(task, { delay: 1, interval: 100, unref: true });

	// 	}
	// 	var diff = process.hrtime(time);

 //  		console.log('benchmark took %d nanoseconds', (diff[0] * 1e9 + diff[1]) / size);

	// });
});

