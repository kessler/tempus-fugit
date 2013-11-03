var tr = require('./temporalRounding.js');

/*
	interval object fields

	millisecond
	second
	minute
	hour
	day

	(currently does not support month and year intervals)
*/
module.exports.toMillis = function(intervalObject) {

	var total = 0;

	if (intervalObject.millisecond)
		total += intervalObject.millisecond;

	if (intervalObject.second)
		total += 1000 * intervalObject.second;

	if (intervalObject.minute)
		total += 60000 * intervalObject.minute;

	if (intervalObject.hour)
		total += 3600000 * intervalObject.hour;

	if (intervalObject.day)
		total += 86400000 * intervalObject.day;

	return total;
};

/*
	@param interval - an interval object
	@param task		- a function to be executed
	@param options	- {
		executeImmediately: true / false (default false), will execute once BEFORE setting interval
		autoUnref: true / false (default false) setting this to true will issue automatic intervalRef.unref()
	}
*/
module.exports.schedule = function(interval, task, options) {

	var now = new Date();
	var delay = 0;

	if (interval.day === 0) {
		var nextDay = tr.closestDate(now);

		delay = nextDay.getTime() - now.getTime();
	}

	var millis = exports.toMillis(interval);

	var job = new Job(millis, task);

	if (options) {
		tr.
	} else {
		reference = setInterval(task, millis)
	}

	return reference;
};


function Job(task, interval, delay, unref) {
	this._task = task;
	this._interval = interval;
	this._delay = delay;
	this._unref = unref;
	this.executions = 0;
}

Job.prototype.execute = function() {
	var self = this;

	function callback(err) {
		if (!err) {
			self.executions++;
			self.execute();
		} else {
			console.error(err);
		}
	}

	function timeout() {
		self._task(callback);
	}

	var interval = this._interval;

	if (this.executions === 0)
		interval = this._interval + this._delay;

	this.ref = setTimeout(timeout, this._interval);

	if (this._unref)
		this.ref.unref();
};

Job.prototype.cancel = function () {
	clearTimeout(this.ref);
};




