var result = module.exports = require("ndarray");

var modules = {
	"complex": require("ndarray-complex"),
	"fill": require("ndarray-fill"),
	"ops": require("ndarray-ops"),
	"zeros": require("zeros"),
	"signal": {
		"convolve": require("ndarray-convolve"),
		"fft": require("ndarray-fft"),
		"phaseUnwrap": require("phase-unwrap"),
		"translate": require("ndarray-translate"),
		"filters": {"gaussian": require("ndarray-gaussian-filter")}
	}
};

for (var key in modules) {
	result[key] = modules[key];
}
