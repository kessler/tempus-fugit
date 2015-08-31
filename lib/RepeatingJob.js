var $u = require('util');
var AbstractJob = require('./AbstractJob.js');

module.exports = RepeatingJob;

/*
	a repeating job runs repeatedly with no regards to the state of previous iterations
*/
$u.inherits(RepeatingJob, AbstractJob);
function RepeatingJob(task, options) {
	AbstractJob.call(this, task, options);

	if (!this._options.interval)
		throw new Error('interval in options is missing or set to 0');

	var self = this;
	this.executions = 0
	this._millis = this._options.delay;
	this._timer = setTimeout;

	this._repeatingTaskFunctor = function repeating() {
		self._task(self);
	};

	this._taskFunctor = function functor() {
		self._taskFunctor = self._repeatingTaskFunctor;
		self._timer = setInterval;
		self._millis = self._options.interval;
		self._task(self);
		self.execute();
	};
}

RepeatingJob.prototype._executeImpl = function() {
	return this._timer.call(null, this._taskFunctor, this._millis);
};

RepeatingJob.prototype.cancel = function () {
	// clear if its in first or repeating stage
	clearTimeout(this._ref);
	clearInterval(this._ref);
};
