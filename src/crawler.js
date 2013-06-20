/* jshint node: true */
module.exports = function (grunt, ModernizrPath) {
	"use strict";

	// Config object
	var _quiet = grunt.option("quiet"),
		_verbose = grunt.option("verbose");

	// Dependencies
	var cp = require("child_process"),
		fs = require("fs"),
		cwd = process.cwd(),
		path = require("path");

	// Deferreds
	var promise = require("promised-io/promise");

	return {
		matchedTestsInFile : {},
		stringMatches : {},

		filterTests : function (tests) {
			var i, j, obj = {},
				filteredTests = [];

			for (i = 0, j = tests.length; i < j; i++) {
				obj[tests[i]] = 0;
			}

			for (var key in obj) {
				filteredTests.push(key);
			}

			return filteredTests;
		},

		findStringMatches : function (type, file, data, testpath) {
			var match, regExp,
				basename = path.basename(file);

			if ((/\.js$/).test(basename) && !(/Modernizr/im).test(data)) {
				return;
			}

			regExp = new RegExp("(?:\\.|\\[(?:\"|'))(?:no-)?(" + type + ")(?:(?:\"|')\\])?", "gm");
			match = (regExp).exec(data);

			this.matchedTestsInFile[file] = this.matchedTestsInFile[file] || [];

			while (match) {
				var test = match[1];

				if (test) {
					this.stringMatches[testpath] = this.stringMatches[testpath] || [];

					if (this.stringMatches[testpath].indexOf(file) === -1) {
						this.stringMatches[testpath].push(file);
					}

					if (this.matchedTestsInFile[file].indexOf(test) === -1) {
						this.matchedTestsInFile[file].push(test);
					}
				}

				match = (regExp).exec(data);
			}
		},

		parseData : function (file, data, metadata) {
			data = data.toString();
			var testpath, test, type, value, i, j;

			for (test in metadata) {
				for (type in metadata[test]) {
					if (type === "name" || type === "path") {
						continue;
					}

					value = metadata[test][type];
					testpath = metadata[test].path;

					if (Array.isArray(value)) {
						for (i = 0, j = value.length; i < j; i++) {
							this.findStringMatches(value[i], file, data, testpath);
						}
					} else {
						this.findStringMatches(value, file, data, testpath);
					}
				}
			}

			var matchedTests = this.matchedTestsInFile[file];

			if (!_quiet && matchedTests && matchedTests.length) {
				grunt.log.writeln();
				grunt.log.ok(matchedTests.length.toString().green + " matches in " + file);
				grunt.log.ok(matchedTests.sort().join(", ").grey);
			}
		},

		readFile : function (file, metadata, encoding, deferred) {
			fs.readFile(file, encoding, function (err, data) {

				if (err) {
					grunt.fail.warn(err);
				}

				this.parseData(file, data, metadata);

				if ((++this.currentFile) === this.totalFiles) {
					return deferred.resolve();
				}
			}.bind(this));
		},

		readFilesAsync : function (files, metadata) {
			var deferred = new promise.Deferred(),
				encoding = "utf8",
				i, j, last;

			this.currentFile = 0;
			this.totalFiles = files.length;

			for (i = 0, j = files.length; i < j; i++) {
				this.readFile(files[i], metadata, encoding, deferred);
			}

			return deferred.promise;
		},

		init : function (metadata) {
			var config = grunt.config("modernizr"),
				_private = grunt.option("_modernizr.private");

			var deferred = new promise.Deferred(),
				buildPath = path.join(ModernizrPath, "build"),
				files;

			var tests = config.tests.map(function (test) {
				var data = metadata.filter(function (data) {
					return data.property === test;
				});

				return data[0] || {};
			}).filter(function (test) {
				return test.path;
			});

			if (!_quiet && tests && tests.length) {
				grunt.log.writeln();
				grunt.log.ok("Implicitly including these tests:");
				grunt.log.ok(tests.map(function (test) {
					return test.property;
				}).sort().join(", ").grey);
			}

			tests = tests.map(function (test) {
				return test.property;
			}).concat(config.customTests.map(function (test) {
				return path.relative(buildPath, fs.realpathSync(test));
			}));

			if (!_quiet) {
				grunt.log.subhead("Looking for Modernizr references");
			}

			// Exclude developer build
			if (config.devFile !== "remote" && config.devFile !== false) {
				if (!fs.existsSync(config.devFile)) {
					grunt.fail.warn([
						"Can't find your Modernizr development build at " + config.devFile,
						"grunt-modernizr needs this path to avoid false positives",
						"",
						"Update your gruntfile via the modernizr.devFile config option",
						"See %s#devfile-string for more details".replace("%s", _private.url.github),
						"",
						""
					].join("\n       ").replace(/\s$/, ""));
				} else {
					config.files.push("!" + config.devFile);
				}
			}

			// Exclude generated file
			config.files.push("!" + config.outputFile);

			// And exclude all files in this current directory
			config.files.push("!" + path.join(__dirname.replace(cwd + path.sep, ""), "**", "*"));

			files = grunt.file.expand({
				filter: "isFile"
			}, config.files);

			this.readFilesAsync(files, metadata).then(function () {
				for (var key in this.stringMatches) {
					tests.push(key);
				}

				tests = this.filterTests(tests);
				return deferred.resolve(tests);
			}.bind(this));

			return deferred.promise;
		}
	};
};
