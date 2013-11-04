var $u = require('util');

/*

*/
module.exports.deltaFromNow = function(eventObject) {

	if ($u.isDate(eventObject)) {

		return Date.now() - eventObject.getTime();

	} else {

		eventObject
	}

}