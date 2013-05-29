/* jshint node: true */
module.exports = function (grunt, ModernizrPath) {
	"use strict";

	// Config object
	var _quiet = grunt.option("quiet"),
		_verbose = grunt.option("verbose");

	// Dependencies
	var path = require("path"),
		uglifier = require("uglify-js");

	// Deferreds
	var promise = require("promised-io/promise");

	return {
		init : function () {
			var deferred = new promise.Deferred();
			var config = grunt.config("modernizr");

			var sourceMapName, buildOptions, build, code;
			var buildPath = path.join(ModernizrPath, "dist", "modernizr-build.js");

			if (config.uglify) {
				// Uglify
				sourceMapName = config.outputFile + ".map";

				if (!_quiet) {
					grunt.log.subhead("Minifying with UglifyJS");
				}

				buildOptions = {};

				if (config.generateSourceMap) {
					buildOptions.outSourceMap = sourceMapName;
				}

				build = uglifier.minify(buildPath, buildOptions);
				code = build.code;
			} else if (!_quiet) {
				grunt.log.subhead("Skipping UglifyJS");
				code = grunt.file.read(buildPath);
			}

			// Write!
			grunt.file.write(config.outputFile, code);

			// All set.
			if (!_quiet) {
				grunt.log.ok("Wrote minified file to ".grey + config.outputFile.grey);
			}

			if (config.generateSourceMap && sourceMapName && build.map) {
				grunt.file.write(sourceMapName, build.map);

				if (!_quiet) {
					grunt.log.ok("Wrote source map to ".grey + sourceMapName.grey);
				}
			}

			return deferred.resolve();
		}
	};
};
