/* jshint node: true */
module.exports = function (grunt, ModernizrPath) {
	"use strict";

	// Config object
	var _quiet = grunt.option("quiet"),
		_force = grunt.option("force"),
		_verbose = grunt.option("verbose");

	// Dependencies
	var cp = require("child_process"),
		fs = require("fs"),
		path = require("path"),
		colors = require("colors"),
		cwd = process.cwd();

	// Deferreds
	var promise = require("promised-io/promise");

	return {
		writeCodeToFile : function (result, config) {
			var code = config.uglify ? result.min : result.code;

			grunt.log.ok(("Success! Saved file to " + config.dest).grey);
			return grunt.file.write(config.dest, code);
		},

		init : function (tests) {
			var deferred = new promise.Deferred(),
				_interval;

			// Cache config 'cause grunt's weird context is going to overwrite it
			var config = grunt.util._.clone(grunt.config("modernizr"));

			// Store the current config
			var currentConfig = config[this.target];

			// Check if we are minifying this build
			var minify = currentConfig.uglify;

			// Store options
			var options = currentConfig.options;

			var modernizrOptions = {
				"feature-detects": tests,
				"options": options,
				"minify": minify,
				"dest": currentConfig.dest
			};

			// Perform a series of checks to validify cache
			var useCachedVersion = false;

			if (!_force) {
				useCachedVersion = this.utils.checkCacheValidity(currentConfig, modernizrOptions);
			}

			if (useCachedVersion) {
				grunt.log.writeln();

				grunt.log.writeln("No config or test changes detected".bold.white);
				grunt.log.ok("grunt-modernizr has bypassed the build step. Run `grunt modernizr --force` to override.".grey);
				grunt.log.ok(("Your current file can be found in " + currentConfig.dest).grey);

				return deferred.resolve();
			}

			// Set verbosity
			modernizrOptions.verbose = (_verbose || false);

			// Echo settings
			grunt.log.writeln();
			grunt.log.ok("Ready to build using these settings:");
			grunt.log.ok(options.join(", ").grey);

			if (minify) {
				grunt.log.ok("Your file will be minified with UglifyJS".grey);
			}

			grunt.log.writeln();
			grunt.log.write("Building your customized Modernizr".bold.white);

			if (!_verbose) {
				_interval = setInterval(function () {
					grunt.log.write(".".grey);
				}, 200);
			}

			var Modernizr = require("Modernizr");

			Modernizr.build(modernizrOptions, function (result) {
				grunt.log.ok();
				clearInterval(_interval);

				// Reset config
				grunt.config("modernizr", config);

				// Write code to file
				this.builder.writeCodeToFile(result, currentConfig);
				return deferred.resolve(modernizrOptions);
			}.bind(this));

			return deferred.promise;
		}
	};
};
