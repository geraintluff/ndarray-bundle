var fs = require('fs');

var moduleMap = module.exports.modules = require('./module-map.json');

function indent(code) {
	return "\t" + code.replace(/\n/g, "\n\t");
}

function generateExpression(map, conditions) {
	if (typeof map === 'string') {
		return 'require(' + JSON.stringify(map) + ')';
	}
	if (typeof conditions === 'object') {
		var result = '{';
		var entries = [];
		for (var key in conditions) {
			if (map[key]) {
				var entry = generateExpression(map[key], conditions[key]);
				entries.push(JSON.stringify(key) + ": " + entry);
			} else {
				throw new Error('Unrecognised module in map: ' + key);
			}
		}
		if (entries.length > 1) {
			return '{\n' + entries.map(indent).join(',\n') + '\n}';
		} else {
			return '{' + entries.join('') + '}';
		}
	} else {
		var newConditions = {};
		for (var key in map) {
			newConditions[key] = true;
		}
		return generateExpression(map, newConditions);
	}
}

var generateString = module.exports.generateString = function (conditions) {
	var expression = generateExpression(moduleMap, conditions || true);
	
	var code = 'var result = module.exports = require("ndarray");\n\n';
	code += "var modules = " + expression + ';\n\n';
	code += "for (var key in modules) {\n\tresult[key] = modules[key];\n}\n";
	return code;
};

var generateFile = module.exports.generateFile = function (outputFile, conditions) {
	var string = generateString(conditions);
	fs.writeFileSync(outputFile, string);
};