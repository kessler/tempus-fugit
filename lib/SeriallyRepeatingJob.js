var RepeatingJob = require('./RepeatingJob.js');
var $u = require('util');
var MAX = Math.pow(2, 53);

module.exports = SeriallyRepeatingJob;

/*
	@param options - { delay: [number], interval:[number], continueOnError: [boolean], unref: [boolean] }
*/
$u.inherits(SeriallyRepeatingJob, RepeatingJob);
function SeriallyRepeatingJob(task, options) {
	RepeatingJob.call(this, task, options);

	var self = this;

	this._timer = setTimeout;

	this._taskFunctor = function functor() {
		self._taskFunctor = self._repeatingTaskFunctor;
		self._millis = self._options.interval;
		self._task(self);
	};
}

SeriallyRepeatingJob.prototype.done = function(err) {
	if (err) {
		console.error(err);
	} else {
		if (this.executions === MAX) {
			console.log('resetting executions counter cuz I reached max integer');
			this.executions = 0;
		}

		this.executions++;
	}

	if (!err || this._options.continueOnError) {
		this.execute();
	}
};

SeriallyRepeatingJob.prototype.cancel = function () {
	clearTimeout(this._ref);
};
