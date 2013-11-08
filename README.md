Tempus Fugit
============

> Tempus fugit is a Latin expression meaning "time flees", more commonly translated as "time flies". It is frequently used as an inscription on clocks.

Install
-------
```
	npm install tempus-fugit
```

Usage
-----
### Scheduling api

##### schedule a one time job in the future example:
```
var scheduling = require('tempus-fugit').scheduling;

var futureDate = new Date(....);
var task = function () {};

var job = scheduling.schedule(futureDate, task);

// can cancel
job.cancel();
```

##### schedule a repeating / recurring job example:
```
var scheduling = require('tempus-fugit').scheduling;

var interval = { hour: 1, minute: 5 }; // every hour and 5 minutes
var task = function () {};

var job = scheduling.schedule(interval, task);

// can cancel
job.cancel();
```

### Interval util

##### tu.intervalObjectToMillis() example:
```
var tu = require('tempus-fugit').tu;

var interval = { millisecond: 500, second: 2 };

console.log(tu.intervalObjectToMillis(interval));
```
will print:

> 2500

##### tu.normalizeIntervalObject example:
```
var tu = require('tempus-fugit').tu;

var interval = { millisecond: 1502, second: 2 };

console.log(tu.normalizeIntervalObject(interval));
```
will print:

> { millisecond: 502, second: 3 }

note: this will modify the original interval object

##### tu.intervalCountSinceEpoch example:
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
support month and year intervals, calculated correctly


