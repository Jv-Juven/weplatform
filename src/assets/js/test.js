var Test = function () {
	this.cach = [];
}
Test.prototype.add = function (value) {
	this.cach.push(function () {
		console.warn("value", value);
	});
}
Test.prototype.start = function () {
	for (var i = 0, length = this.cach.length; i < length; i++) {
		var fn = this.cach[i];
		fn();
	}
}

export default Test;
