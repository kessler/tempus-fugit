var Job 	= require('../lib/Job.js');
var assert 	= require('assert');

describe('Job', function () {

	it('executes the task exactly once using a given delay', function (done) {
		var taskCalled = 0;

		function task() {
			console.log(taskCalled++);

			assert.strictEqual(job, this);
		}

		var job = new Job(task, { delay: 10, unref: true });

		job.execute();

		setTimeout(function () {
			assert.strictEqual(taskCalled, 1);
			done();
		}, 30);
	});

	it ('can be cancelled', function (done) {
		var taskCalled = 0;

		function task() {
			console.log(taskCalled++);

			assert.strictEqual(job, this);
		}

		var job = new Job(task, { delay: 100, unref: true });

		job.execute();

		setTimeout(function () {
			job.cancel();

			setTimeout(function () {
				assert.strictEqual(taskCalled, 0);
				done();
			}, 100);
		}, 30);
	});

	it('unrefs the time if specified in the options', function () {
		var job = new Job(function () {}, { delay: 10, unref: true });

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
});

