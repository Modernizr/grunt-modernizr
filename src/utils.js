/* jshint node: true */
module.exports = function (grunt, modernizrPath) {
	"use strict";

	// Dependencies
	var fs = require("fs"),
		path = require("path"),
		equal = require("deep-equal");

	return {
		checkCacheValidity : function (currentConfig, modernizrOptions) {
			var jsonPath = path.join(__dirname, "..", "package.json");
			var pkg = grunt.file.readJSON(jsonPath);

			// Check if a previous config exists
			var previous = this.getPreviousOptions();

			if (
				grunt.file.exists(currentConfig.dest) &&
				pkg &&
				previous &&
				previous.version === pkg.version &&
				previous.modernizr === pkg.dependencies.modernizr &&
				equal(previous.options, modernizrOptions)
			) {
				return true;
			}

			return false;
		},

		setDefaults : function (target) {
			var _ = grunt.util._;
			var config = grunt.config("modernizr")[target];
			var _defaults = _.clone(grunt.option("_modernizr.defaults"));

			config = _.extend(_defaults, config);

			grunt.config.set("modernizr." + target, config);
			return config;
		},

		getPreviousOptions : function () {
			var cacheDir = path.join(__dirname, "..", "cache");
			var optionsLocation = path.join(cacheDir, "options.json");

			// Check if cache directory doesn't exist
			if (!grunt.file.exists(optionsLocation)) {
				return false;
			}

			// Otherwise, return the options.
			return grunt.file.readJSON(optionsLocation);
		},

		saveOptions : function (options) {
			// If no options parameter, assume no further action.
			if (typeof options === "undefined") {
				return;
			}

			var cacheDir = path.join(__dirname, "..", "cache");
			var optionsLocation = path.join(cacheDir, "options.json");

			// Check if cache directory doesn't exist
			if (!grunt.file.exists(cacheDir)) {
				grunt.file.mkdir(cacheDir);
			}

			// Remove old options
			if (grunt.file.exists(optionsLocation)) {
				grunt.file.delete(optionsLocation);
			}

			var jsonPath = path.join(__dirname, "..", "package.json");
			var pkg = grunt.file.readJSON(jsonPath);

			// Stash options along with metadata
			var metadata = {
				version: pkg.version,
				modernizr: (pkg.dependencies || {}).modernizr,
				options: options
			};

			// Write new options
			grunt.file.write(optionsLocation, JSON.stringify(metadata, null, 2));
		}
	};
};
