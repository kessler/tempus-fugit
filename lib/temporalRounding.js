/*
	returns a Date object rounded to the next second
*/
module.exports.closestSecond = function(now) {

	return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds() + 1, 0);
};

/*
	returns a Date object rounded to the next minute
*/
module.exports.closestMinute = function(now) {

	return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0);
};

/*
	returns a Date object rounded to the next hour
*/
module.exports.closestHour = function(now) {

	return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
};

/*
	returns a Date object rounded to the next day
*/
module.exports.closestDate = function(now) {

	return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
};


/*
	returns a Date object rounded to the next month
*/
module.exports.closestMonth = function(now) {

	return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
};


/*
	returns a Date object rounded to the next year
*/
module.exports.closestYear = function(now) {

	return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
};