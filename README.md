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
### Rounding api

temporalRounding.closestSecond(date);

temporalRounding.closestMinute(date);

temporalRounding.closestHour(date);

temporalRounding.closestDate(date);

temporalRounding.closestMonth(date);

temporalRounding.closestYear(date);

##### example
```
	var tf = require('tempus-fugit');

	var now = new Date(2013, 11, 25, 23, 23, 59, 123);
	var actual = tf.tr.closestSecond(now);  // tf.tr === tf.temporalRounding

	console.log('closest second:');
	console.log(now);
	console.log(actual);

```
will print:

> Wed Dec 25 2013 23:23:59 GMT+0200 (Jerusalem Standard Time)
> Wed Dec 25 2013 23:24:00 GMT+0200 (Jerusalem Standard Time)

### Scheduling api

TODO
----
support month and year intervals, calculated correctly


