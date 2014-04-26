module.exports = function (grunt) {
	'use strict';
	
	var codeGen = require('./generate.js');

	grunt.registerTask('build', function () {
		codeGen.generateFile('./bundle.js', true);
	});
	grunt.registerTask('default', ['build']);
};