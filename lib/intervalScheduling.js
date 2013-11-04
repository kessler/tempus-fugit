/*
	interval object fields

	delay
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



	var delay = next.getTime() - now.getTime();

	var millis = exports.toMillis(interval);

	var job = new Job(millis, task);

	if (options) {
		//tr.
	} else {
		reference = setInterval(task, millis)
	}

	return reference;
};