var result = module.exports = require("ndarray");

var modules = {
	"complex": require("ndarray-complex"),
	"fill": require("ndarray-fill"),
	"ops": require("ndarray-ops"),
	"zeros": require("zeros")
};

for (var key in modules) {
	result[key] = modules[key];
}
