/* jshint node: true */
module.exports = function (grunt, ModernizrPath) {
	"use strict";

	// Config object
	var _quiet = grunt.option("quiet"),
		_verbose = grunt.option("verbose");

	// Dependencies
	var cp = require("child_process"),
		fs = require("fs"),
		path = require("path");

	// Deferreds
	var promise = require("promised-io/promise");

	return {
		writeConfig : function (tests) {
			var configPath = path.join(ModernizrPath, "lib", "config-all.json");

			if (!fs.existsSync(configPath)) {
				grunt.fail.warn("Sorry, I can't find Modernizr in " + configPath.replace(__dirname, ""));
			}

			var modernizrConfig = grunt.file.readJSON(configPath);
			var config = grunt.config("modernizr");

			// Overwrite default tests
			modernizrConfig["feature-detects"] = tests;

			// Overwrite default options
			modernizrConfig.options = config.options;

			grunt.file.write(configPath, JSON.stringify(modernizrConfig));
		},

		init : function (tests) {
			var deferred = new promise.Deferred();

			grunt.log.writeln();
			grunt.log.write("Building Modernizr".bold.white);

			// Write to Modernizr config
			this.writeConfig(tests);

			var builder = cp.spawn("grunt", ["build"], {
				stdio: _verbose ? "inherit" : [0, "pipe", 2],
				cwd: ModernizrPath
			});

			if (!_verbose) {
				builder.stdout.on("data", function (data) {
					grunt.log.write(".".grey);
				});
			}

			builder.on("exit", function () {
				grunt.log.ok();

				return deferred.resolve();
			});

			return deferred.promise;
		}
	};
};
