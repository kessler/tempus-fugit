var $u = require('util');
var Job = require('./Job.js');
var RepeatingJob = require('./RepeatingJob.js');
var SeriallyRepeatingJob = require('./SeriallyRepeatingJob.js');
var tu = require('./temporalUtil.js');

module.exports.AbstractJob = require('./AbstractJob.js');
module.exports.Job = Job;
module.exports.RepeatingJob = RepeatingJob;
module.exports.SeriallyRepeatingJob = SeriallyRepeatingJob;

var EMPTY = {};

/*
	@param intervalOrDate 	- an interval object or date
	@param task				- a function to be executed
	@param options			- {
		unref: [boolean] (default false) setting this to true will issue automatic unref() on timers,
		overlappingExecutions: [boolean] (default false) setting this to true will cause tasks to overlap if
		they dont finish before interval time elapses,
		createOnly: [boolean] (default false) if set to true execute() will not be called
	}
*/
module.exports.schedule = function(intervalOrDate, task, options) {

	// warning: DO NOT pass this directly to a job, I suspect it will prevent it from being garbage collected
	options = options || EMPTY;

	var Implementation, delay, job, start, now;

	var opts = { unref: options.unref };

	if ($u.isDate(intervalOrDate)) {

		now = Date.now();
		start = intervalOrDate.getTime();
		Implementation = Job;

	} else if (typeof(intervalOrDate) === 'number') {

		now = Date.now();
		start = now + intervalOrDate;
		Implementation = Job;

	} else if (typeof(intervalOrDate) === 'object')){

		now = intervalOrDate.now || Date.now();

		opts.interval = tu.intervalObjectToMillis(intervalOrDate);

		// 0 is an ok value for delay, it means the interval starts from exactly now
		// no delay means we want to start from the next "round" interval
		//
		if (intervalOrDate.start) {
			start = intervalOrDate.start;
		} else if ($u.isDate(intervalOrDate.start)) {
			start = intervalOrDate.start.getTime();
		} else {
			start = tu.nextIntervalEvent(opts.interval, now);
		}

		if (options.overlappingExecutions) {
		 	Implementation = RepeatingJob;
		} else {
		 	Implementation = SeriallyRepeatingJob;
		}
	} else {
		throw new TypeError('invalid interval arguments, must be Date or Interval Object');
	}

	if (start <= now)
		throw new Error('job start is in the past');

	opts.delay = start - now;

	job = new Implementation(task, opts);

	if(!options.createOnly)
		job.execute();

	return job;
};