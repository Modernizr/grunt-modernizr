/*
 * grunt-modernizr
 * https://github.com/doctyper/grunt-modernizr
 *
 * Copyright (c) 2012 Richard Herrera
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

	// ==========================================================================
	// DEFAULT CONFIG
	// ==========================================================================

	grunt.config.set("modernizr._defaults", {

		// Path to the build you're using for development.
		"devFile" : "lib/modernizr-dev.js",

		// Path to save out the built file
		"outputFile" : "build/modernizr-custom.js",

		// Based on default settings on http://modernizr.com/download/
		"extra" : {
			"shiv" : true,
			"printshiv" : false,
			"load" : true,
			"mq" : false,
			"cssclasses" : true
		},

		// Based on default settings on http://modernizr.com/download/
		"extensibility" : {
			"addtest" : false,
			"prefixed" : false,
			"teststyles" : false,
			"testprops" : false,
			"testallprops" : false,
			"hasevents" : false,
			"prefixes" : false,
			"domprefixes" : false
		},

		// By default, source is uglified before saving
		"uglify" : true,

		// Define any tests you want to impliticly include
		"tests" : [],

		// By default, will crawl your project for references to Modernizr tests
		// Set to false to disable
		"parseFiles" : true,

		// By default, this task will crawl all *.js, *.css files.
		"files" : [
			"**/*.{js,css,scss}"
		],

		// Have custom Modernizr tests? Add them here.
		"customTests" : [],

		// Files added here will be excluded when parsing files
		"excludeFiles" : [
			"**/node_modules/**/*"
		]
	});

	// ==========================================================================
	// TASKS
	// ==========================================================================

	grunt.registerTask("modernizr", "Build out a lean, mean Modernizr machine.", function () {

		// Require a config object
		this.requiresConfig(this.name, this.name + ".devFile", this.name + ".outputFile");

		// Config object
		var config = grunt.config.get(this.name);

		// Async
		var done = this.async();

		// Dependencies
		var fs = require("fs"),
			url = require("url"),
			path = require("path"),
			uglify = require("uglify-js");

		// Deferreds
		var promise = require("promised-io/promise"),
			Deferred = promise.Deferred,
			when = promise.when,
			all = promise.all;

		// Modulizr
		var Modulizr = require("../lib/modulizr").Modulizr;

		// Default fallbacks
		var _defaults = config._defaults;

		// Private variables
		var _private = config._private,
			com = url.parse(_private.domain),
			paths = _private.paths,
			stringMatches = {};

		function _setupTests() {
			var allTests = config.tests;
			var key, value, extraTitle, extensibilityTitle;

			for (key in config.extra) {
				value = config.extra[key];

				if (value) {
					if (!extraTitle) {
						grunt.log.subhead("Enabled Extras");
						extraTitle = true;
					}

					grunt.log.ok(key);
				}

				allTests[key] = value;
			}

			// If tests found, force extensibility.addtest to be true
			if (config.customTests.length) {
				config.extensibility.addtest = true;
			}

			for (key in config.extensibility) {
				value = config.extensibility[key];

				if (value) {
					if (!extensibilityTitle) {
						grunt.log.subhead("Enabled Extensibility Options");
						extensibilityTitle = true;
					}

					grunt.log.ok(key);
				}

				allTests[key] = value;
			}

			if (config.parseFiles) {
				allTests = _crawlFilesForTests(allTests);
			}

			return allTests;
		}

		function _filterTests(tests) {
			var i, j;
			var obj = {};
			var filteredTests = [];

			for (i = 0, j = tests.length; i < j; i++) {
				obj[tests[i]] = 0;
			}

			for (var key in obj) {
				filteredTests.push(key);
			}

			return filteredTests;
		}

		function _parseData(file, data) {
			data = data.toString();

			var deps = Modulizr._dependencies;
			var match, key, test;
			var showFileName, regExp;

			for (key in deps) {
				regExp = new RegExp("\\.(?:no-)?(" + key + ")", "gm");
				match = (regExp).exec(data);

				while (match) {
					test = match[1];

					if (test && !stringMatches[test]) {
						stringMatches[test] = 1;

						if (!showFileName) {
							grunt.log.subhead("in " + file);
							showFileName = true;
						}

						grunt.log.ok(test);
					}

					match = (regExp).exec(data);
				}
			}
		}

		function _crawlFilesForTests(tests) {
			var deferred = new Deferred();

			grunt.log.subhead("Looking for Modernizr references...");

			var files = grunt.file.expandFiles(config.files);
			var exclude = _defaults.excludeFiles.concat(config.excludeFiles);

			// Exclude developer build
			exclude.push(config.devFile);

			// Also exclude generated file
			exclude.push(config.outputFile);

			files = files.filter(function (file) {
				return !grunt.file.isMatch(exclude, file);
			});

			var i, j, key, file;

			for (i = 0, j = files.length; i < j; i++) {
				file = files[i];

				var data = grunt.file.read(file);
				_parseData(file, data);
			}

			for (key in stringMatches) {
				tests.push(key);
			}

			return _filterTests(tests);
		}

		function _xhr(pathname) {
			pathname = typeof pathname === typeof [] ? pathname : [pathname];

			var http = require(com.protocol.replace(":", ""));
			var deferred = new Deferred();

			var i, j, x = 0;
			var allData = [];

			var _handleResponse = function (res) {
				var data = [];

				if (res.statusCode === 200 || res.statusCode === 304) {
					res.on("data", function (chunk) {
						data.push(chunk);
					});
				}

				res.on("end", function () {
					allData.push(data.join(""));

					if (++x === j) {
						return deferred.resolve(allData.join(""));
					}
				});

				res.on("error", function (err) {
					grunt.log.error(err.message);
				});
			};

			if (pathname.length) {
				for (i = 0, j = pathname.length; i < j; i++) {
					http.get({
						protocol : com.protocol,
						host : com.host,
						path : (com.pathname || "") + pathname[i]
					}, _handleResponse);
				}
			} else {
				setTimeout(function () {
					return deferred.resolve(allData.join(""));
				});
			}

			return deferred.promise;
		}

		function _setupRequests(tests) {
			var requests = [paths.modernizr];

			if (config.extra.printshiv) {
				requests.push(paths.printshiv);
			}

			if (config.extra.load) {
				requests.push(paths.load);
			}

			return requests;
		}

		function _getRequests(tests) {
			return tests.filter(function (dep) {
				return _private.core.indexOf(dep) !== -1;
			});
		}

		function _getCommunityRequests(tests) {
			return tests.filter(function (dep) {
				return _private.core.indexOf(dep) === -1;
			});
		}

		function _setupCommunityRequests(tests) {
			return _getCommunityRequests(tests).map(function (dep) {
				return paths.community.replace("%s", dep);
			});
		}

		function _loadCustomTests(files) {
			var i, j, file;
			var customTests = [];

			for (i = 0, j = files.length; i < j; i++) {
				file = files[i];

				if (fs.existsSync(file)) {
					customTests.push(grunt.file.read(file));
				}
			}

			return customTests.join("\n");
		}

		function _makeRequests(tests) {
			var i, j;
			var requests = _setupRequests(tests);
			var communityRequests = _setupCommunityRequests(tests);

			grunt.log.writeln();
			grunt.log.ok("Generating a custom Modernizr build...");
			grunt.log.ok("Downloading source files...");

			when(_xhr(requests)).then(function (data) {

				if (communityRequests.length) {
					grunt.log.ok("Downloading community files...");
				}
				when(_xhr(communityRequests)).then(function (community) {
					var customTests = grunt.file.expandFiles(config.customTests);

					if (customTests.length) {
						grunt.log.ok("Adding custom tests...");
					}
					var custom = _loadCustomTests(customTests);

					_finalize(data + community + custom, tests, customTests);
				});
			});
		}

		function _addPrefix(build, tests, customTests) {
			var prefix = "\/* Modernizr (Custom Build) | MIT & BSD" +
			"\n * Build: http://modernizr.com/download/#-" + tests.join("-") +
			(customTests.length ? "\n * Custom Tests: " + customTests.map(function (test) {
				return path.basename(test);
			}).join(", ") : "") +
			"\n */\n";

			return prefix + build;
		}

		function _finalize(data, tests, customTests) {

			// We have the data, time to build
			var build = Modulizr.ize(data, _getRequests(tests));

			// Uglify
			grunt.log.ok("Uglifying...");
			var uglified = uglify(build, ["--extra", "--unsafe"]);

			// Prefix with Modernizr licence
			uglified = _addPrefix(uglified, tests, customTests);

			// Write!
			grunt.file.write(config.outputFile, uglified);

			// All set.
			grunt.log.writeln();
			grunt.log.ok("Saved file to " + config.outputFile);
			done();
		}

		function _setDefaults(config, _defaults) {
			var key, x, c, d;

			for (key in _defaults) {
				d = _defaults[key];
				c = config[key];

				if (!(key in config)) {
					config[key] = d;
				} else if (key === "extra" || key === "extensibility") {
					for (x in d) {
						if (!(x in c)) {
							c[x] = d[x];
						}
					}
				}
			}
		}

		// Initial setup
		(function () {

			// Use defaults for any options left undefined
			_setDefaults(config, _defaults);

			var tests = _setupTests();
			_makeRequests(tests);
		}());
	});

	// ==========================================================================
	// PRIVATE CONFIG
	// ==========================================================================

	grunt.config.set("modernizr._private", {
		"github" : "https://github.com/doctyper/grunt-modernizr",
		"domain" : "https://raw.github.com/Modernizr/modernizr.com/gh-pages",

		"core" : [
			"canvastext",
			"csstransforms3d",
			"flexbox",
			"cssgradients",
			"opacity",
			"indexedDB",
			"backgroundsize",
			"borderimage",
			"borderradius",
			"boxshadow",
			"cssanimations",
			"csscolumns",
			"cssreflections",
			"csstransitions",
			"testallprops",
			"flexbox-legacy",
			"prefixed",
			"csstransforms",
			"mq",
			"hashchange",
			"draganddrop",
			"generatedcontent",
			"svg",
			"inlinesvg",
			"smil",
			"svgclippaths",
			"input",
			"inputtypes",
			"touch",
			"fontface",
			"testbundle",
			"respond",
			"websockets"
		],

		"paths" : {
			"modernizr" : "/downloads/modernizr-latest.js",
			"printshiv" : "/i/js/html5shiv-printshiv-3.6.js",
			"load" : "/i/js/modernizr.load.1.5.4.js",
			"community" : "/i/js/modernizr-git/feature-detects/%s.js"
		}
	});

};
