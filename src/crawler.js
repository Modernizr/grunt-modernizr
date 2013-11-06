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
			var match, regExp, prefix,
				config = grunt.task.current.data,
				basename = path.basename(file);

			// JS files
			if ((/\.js$/).test(basename)) {
				// Don't bother if we don't find a reference to Modernizr in the file...
				if (!(/Modernizr/im).test(data)) {
					return;
				}
				// Match usage such as: Modernizr.classname --or-- Modernizr['classname']
				regExp = new RegExp("(?:\\.|\\[(?:\"|'))(" + type + ")(?![\\w-])(?:(?:\"|')\\])?", "gm");
			}
			// If it's not JS, assume it's CSS (or similar, e.g.: LESS, SCSS) files
			else {
				prefix = config.cssprefix || '';
				// When no prefix, match usage such as: .classname --or-- .no-classname
				// When prefix set, match usage such as: .<prefix>classname --or-- .<prefix>no-classname
				regExp = new RegExp("(?:\\." + prefix + ")(?:no-)?(" + type + ")(?![\\w-])", "gm");
			}
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

				var testCount = matchedTests.length;
				var testText = " match" + (testCount > 1 ? "es" : "") + " in ";

				grunt.log.ok(testCount.toString().green + testText + file);
				grunt.log.ok(matchedTests.sort().join(", ").grey);
			}
		},

		readFile : function (file, metadata, encoding, deferred) {
			var stream = fs.createReadStream(file);

			stream.on("data", function (data) {
				this.parseData(file, data, metadata);
			}.bind(this));

			stream.on("end", function () {
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
			var config = grunt.config("modernizr")[this.target],
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
				return test.path;
			}).concat(config.customTests.map(function (test) {
				return path.relative(buildPath, fs.realpathSync(test));
			}));

			if (config.crawl !== true) {
				tests = this.crawler.filterTests(tests);

				if (!_quiet) {
					grunt.log.subhead("Skipping file traversal");
				}

				setTimeout(function () {
					return deferred.resolve(tests);
				}, 0);

				return deferred.promise;
			}

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
			config.files.push("!" + config.dest);

			// And exclude all files in this current directory
			config.files.push("!" + path.join(__dirname.replace(cwd + path.sep, ""), "**", "*"));

			files = grunt.file.expand({
				filter: "isFile"
			}, config.files);

			this.crawler.readFilesAsync(files, metadata).then(function () {
				for (var key in this.crawler.stringMatches) {
					tests.push(key);
				}

				tests = this.crawler.filterTests(tests);
				return deferred.resolve(tests);
			}.bind(this));

			return deferred.promise;
		}
	};
};
