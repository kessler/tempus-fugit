var constants = {
	SECOND: 1000,
	MINUTE: 1000 * 60,
	HOUR: 1000 * 60 * 60,
	DAY: 1000 * 60 * 60 * 24
};

constants.TROPICAL_YEAR = constants.DAY * 365 + (constants.HOUR * 5) + (constants.MINUTE * 48) + (constants.SECOND * 46);

module.exports.millisConstants = constants;

/*
	interval object fields

	millisecond
	second
	minute
	hour
	day

	(currently does not support month and year intervals)
*/
module.exports.intervalObjectToMillis = function(intervalObject) {

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

module.exports.intervalCountSinceEpoch = function (interval, millisSinceEpoch) {
	return (millisSinceEpoch || Date.now()) / interval;
};

module.exports.nextIntervalEvent = function(interval, millisSinceEpoch) {

	var count = Math.floor(exports.intervalCountSinceEpoch(interval, millisSinceEpoch));

	return (count + 1) * interval;
};

/*
	this is not precise when trying to find big intervals like years.
*/
module.exports.recentIntervalEvent = function(interval, millisSinceEpoch) {

	var count = Math.floor(exports.intervalCountSinceEpoch(interval, millisSinceEpoch));

	return count * interval;
};


/*
	returns a Date object rounded to the next second
*/
module.exports.nextSecond = function(now) {

	return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds() + 1, 0);
};

/*
	returns a Date object rounded to the next minute
*/
module.exports.nextMinute = function(now) {

	return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0);
};

/*
	returns a Date object rounded to the next hour
*/
module.exports.nextHour = function(now) {

	return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
};

/*
	returns a Date object rounded to the next day
*/
module.exports.nextDate = function(now) {

	return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
};


/*
	returns a Date object rounded to the next month
*/
module.exports.nextMonth = function(now) {

	return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
};


/*
	returns a Date object rounded to the next year
*/
module.exports.nextYear = function(now) {

	return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
};

/*

*/
module.exports.normalizeIntervalObject = function(intervalObject) {
	if (intervalObject.millisecond >= 1000) {
		var extraSeconds = Math.floor(intervalObject.millisecond / 1000);
		intervalObject.millisecond = intervalObject.millisecond % 1000;

		if (!intervalObject.second)
			intervalObject.second = 0;

		intervalObject.second += extraSeconds;
	}

	if (intervalObject.second >= 60) {

		var extraMinutes = Math.floor( intervalObject.second / 60 );
		intervalObject.second = intervalObject.second % 60;

		if (!intervalObject.minute)
			intervalObject.minute = 0;

		intervalObject.minute += extraMinutes;
	}

	if (intervalObject.minute >= 60) {

		var extraHours = Math.floor( intervalObject.minute / 60 );
		intervalObject.minute = intervalObject.minute % 60;

		if (!intervalObject.hour)
			intervalObject.hour = 0;

		intervalObject.hour += extraHours;
	}

	if (intervalObject.hour >= 24) {

		var extraDays = Math.floor( intervalObject.hour / 24 );
		intervalObject.hour = intervalObject.hour % 24;

		if (!intervalObject.day)
			intervalObject.day = 0;

		intervalObject.day += extraDays;
	}

	return intervalObject;
};
