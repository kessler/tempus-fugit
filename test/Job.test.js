var Job 	= require('../lib/Job.js');
var assert 	= require('assert');

describe('Job', function () {

	it('executes a task repeatedly', function (done) {

		var taskCalled = 0;
		function task(callback) {
			taskCalled++;
			callback();
		}

		var job = new Job(task, 100, 10, true);

		job.execute();

		setTimeout(function () {
			assert.strictEqual(job.executions, 2);
			assert.strictEqual(taskCalled, 2);
			done();
		}, 220);
	});

	it('executes the task exactly once if interval is not defined', function () {

	});
});

