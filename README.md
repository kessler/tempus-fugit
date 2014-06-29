# Tempus Fugit [![Build Status](https://secure.travis-ci.org/kessler/tempus-fugit.png?branch=master)](http://travis-ci.org/kessler/tempus-fugit)

> Tempus fugit is a Latin expression meaning "time flees", more commonly translated as "time flies". It is frequently used as an inscription on clocks.

This module contains high level api for scheduling jobs and also exposes utilities and classes to help build other more custom / complex scheduling code.

Install
-------
```
	npm install tempus-fugit
```

Usage
-----
### Scheduling api

The scheduling api can be used to schedule single time or repeating jobs. Repeating jobs revolve around the interval object (see below).

##### schedule a one time job in the future:
```
var schedule = require('tempus-fugit').schedule;

var futureDate = new Date(....);
var task = function () {};

var job = schedule(futureDate, task);

// can cancel
job.cancel();

job = schedule(1000, task); // schedule in 1 second from now
```

##### schedule a repeating / recurring job:
```
var schedule = require('tempus-fugit').schedule;

var interval = { hour: 1, minute: 5 }; // every hour and 5 minutes

// job.done() is not required when overlappingExecutions is true
var task = function (job) { job.done(); // this.done() also works };

var job = schedule(interval, task /*, {.. options ..} */);

// can cancel
job.cancel();
```
##### scheduling options:

unref: \[boolean\] (default false) setting this to true will issue automatic unref() on timers, which will allow the node process to exit when a task is run.

overlappingExecutions: \[boolean\] (default false) setting this to true will cause tasks to overlap if
they dont finish before interval time elapses.

createOnly: \[boolean\] (default false) if set to true execute() will not be called, this means you will have to call job.execute() after shceduling.schedule(...)

##### the interval object:
```
var interval = {
	millisecond: 1,
	second: 2,
	minute: 3,
	hour: 4,
	day: 5,
	start: Date.now() || new Date() //optional
}
```
_note: the start property is optional, without this property the job will be schedule to the next interval event, calculated since unix epoch time_

##### Creating new job "classes"
```
	var AbstractJob = require('tempus-fugit').AbstractJob;
	var $u = require('util');

	$u.inherits(MyJob, AbstractJob);
	function MyJob(task, options) {
		AbstractJob.call(this, task, options)
	}

	// must implement
	MyJob.prototype._executeImpl = function () {
		return setInterval(this._task, 500);
	};

	// must implement
	MyJob.prototype._cancelImpl = function(token) {
		return clearInterval(token);
	};

	// optionally implement, if so, do no pass task argument in constructor
	MyJob.prototype._task = function () {
		console.log('foo!');
	};

```
- - -
### Interval util

##### tu.intervalObjectToMillis():
```
var tu = require('tempus-fugit').temporalUtil;

var interval = { millisecond: 500, second: 2 };

console.log(tu.intervalObjectToMillis(interval));
```
will print:

> 2500

##### tu.normalizeIntervalObject:
```
var tu = require('tempus-fugit').tu;

var interval = { millisecond: 1502, second: 2 };

console.log(tu.normalizeIntervalObject(interval));
```
will print:

> { millisecond: 502, second: 3 }

_note: this will modify the original interval object_

##### tu.intervalCountSinceEpoch:
```
var tu = require('tempus-fugit').tu;

var interval = { day: 1 };

var n = Date.UTC(2000, 0);

var millis = tu.intervalObjectToMillis(interval);

console.log(tu.intervalCountSinceEpoch(millis, n));

```
will print:

> 10957

which is 30 years * 365 day + 7(.5) days from leap years

_note: the n argument is optional, if omitted the function will use Date.now() internally_

##### tu.nextIntervalEvent:
```
var tu = require('tempus-fugit').tu;

var interval = { day: 1 };

var n = Date.UTC(2000, 0, 1, 0, 30); // Sat Jan 01 2000 00:30:00 GMT

var millis = tu.intervalObjectToMillis(interval);

var nextInterval = tu.nextIntervalEvent(millis, n);

console.log(new Date(nextInterval).toUTCString());

```
will print:

> Sun, 02 Jan 2000 00:00:00 GMT

_note: the n argument is optional, if omitted the function will use Date.now() internally_


### Date related util

tu.nextSecond(date);

tu.nextMinute(date);

tu.nextHour(date);

tu.nextDate(date);

tu.nextMonth(date);

tu.nextYear(date);

##### example
```
	var tf = require('tempus-fugit');

	var now = new Date(2013, 11, 25, 23, 23, 59, 123);
	var actual = tf.tu.nextSecond(now);  // tf.tu === tf.temporalUtil

	console.log('closest second:');
	console.log(now);
	console.log(actual);

```
will print:

> Wed Dec 25 2013 23:23:59 GMT+0200 (Jerusalem Standard Time)

> Wed Dec 25 2013 23:24:00 GMT+0200 (Jerusalem Standard Time)

TODO
----
- support month and year intervals, calculated correctly
- throw exception from jobs if error event is not handled or ignore errors flag is not set
- add more events to job


