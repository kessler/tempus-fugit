var MAX = Math.pow(2, 53);

module.exports = Job;

function Job(task, options) {
	this._task = task;
	this._options = options;

	this.executions = 0;
}

Job.prototype.execute = function() {
	var self = this;
	var options = this._options;

	function callback(err) {
		if (!err) {

			if (self.executions === MAX) {
				console.log('resetting executions counter cuz I reached max integer');
				self.executions = 0;
			}

			self.executions++;
			self.execute();
		} else {
			console.error(err);
		}
	}

	function timeout() {
		self._task(callback);
	}

	var interval = options.interval;

	if (this.executions === 0)
		interval = options.interval + options.delay;

	this.ref = setTimeout(timeout, interval);

	if (this._unref)
		this.ref.unref();
};

Job.prototype.cancel = function () {
	clearTimeout(this.ref);
};
