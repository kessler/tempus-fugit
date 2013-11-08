var AbstractJob = require('./AbstractJob.js');
var $u = require('util');

module.exports = Job;

/*
	@param task 	- optional, a function that will be executed
	@param options 	- { delay: [number], unref: [boolean] }
*/
$u.inherits(Job, AbstractJob);
function Job(task, options) {
	AbstractJob.call(this, task, options);

	var self = this;
	this._taskFunctor = function functor() {
		self._task(self);
	};
}

Job.prototype._executeImpl = function () {
	return setTimeout(this._taskFunctor, this._options.delay);
};

Job.prototype.cancel = function () {
	clearTimeout(this._ref);
	delete this._ref;
};
