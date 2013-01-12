var Gruntifier = function (grunt, done, bust) {

	// Config object
	var config = grunt.config.get("modernizr"),
		_defaults = grunt.config.get("_modernizr.defaults"),
		_private = grunt.config.get("_modernizr.private");

	// Dependencies
	var fs = require("fs"),
		url = require("url"),
		path = require("path"),
		colors = require("colors"),
		uglify = require("uglify-js");

	// Deferreds
	var promise = require("promised-io/promise");

	// Modulizr
	var Modulizr = require("./modulizr").Modulizr;

	// Custom Tests CSS Map
	var Mappr = require("./customappr"),
		_classes = Mappr._classes;

	var _Gruntifier = function () {
		this.stringMatches = {};
		this.downloadErrors = [];
		this.showFileName = false;

		return this.init();
	};

	_Gruntifier.prototype = {
		init : function () {
			var tests;

			// Use defaults for any options left undefined
			this.setDefaults(config, _defaults);

			tests = this.setupTests();
			this.makeRequests(tests);

		},

		setupTests : function () {
			var allTests = config.tests, key, value,
				extraTitle, extensibilityTitle;

			for (key in config.extra) {
				value = config.extra[key];

				if (value) {
					if (!extraTitle) {
						grunt.log.subhead("Enabled Extras");
						extraTitle = true;
					}

					grunt.log.ok(key);
					allTests.push(key);
				}
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
					allTests.push(key);
				}
			}

			if (config.parseFiles) {
				allTests = this.crawlFilesForTests(allTests);
			}

			return allTests;
		},

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

		findStringMatches : function (_class, key, file, data) {
			var match, test, regExp,
				basename = path.basename(file);

			if ((/\.js$/).test(basename) && !(/Modernizr/im).test(data)) {
				return;
			}

			regExp = new RegExp("\\.(?:no-)?(" + _class + ")", "gm");
			match = (regExp).exec(data);

			while (match) {
				test = match[1];

				if (test && !this.stringMatches[key]) {
					this.stringMatches[key] = 1;

					if (!this.showFileName) {
						grunt.log.subhead("in " + file);
						this.showFileName = true;
					}

					grunt.log.ok(test);
				}

				match = (regExp).exec(data);
			}
		},

		mapClass : function (key) {
			var matchTests = config.matchCommunityTests,
				isCore = (_private.core.indexOf(key) !== -1),
				isTest = (config.tests.indexOf(key) !== -1),
				isCommunityTest = !isCore && (matchTests || isTest);

			return isCommunityTest ? _classes[key] : key;
		},

		parseData : function (file, data) {
			data = data.toString();
			this.showFileName = false;

			var deps = Modulizr._dependencies,
				_class, key, i, j;

			for (key in deps) {
				_class = this.mapClass(key);

				if (typeof _class === typeof []) {
					for (i = 0, j = _class.length; i < j; i++) {
						this.findStringMatches(_class[i], key, file, data);
					}
				} else {
					this.findStringMatches(_class, key, file, data);
				}
			}
		},

		crawlFilesForTests : function (tests) {
			var deferred = new promise.Deferred(),
				files, exclude, i, j, key,
				file, data;

			grunt.log.subhead("Looking for Modernizr references");

			files = grunt.file.expand({filter: 'isFile'}, config.files);
			exclude = _defaults.excludeFiles.concat(config.excludeFiles);

			// Exclude developer build
			if (config.devFile !== "remote") {
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
					exclude.push(config.devFile);
				}
			}

			// Also exclude generated file
			exclude.push(config.outputFile);

			files = files.filter(function (file) {
				return !grunt.file.isMatch(exclude, file);
			});

			for (i = 0, j = files.length; i < j; i++) {
				file = files[i];

				data = grunt.file.read(file);
				this.parseData(file, data);
			}

			for (key in this.stringMatches) {
				tests.push(key);
			}

			return this.filterTests(tests);
		},

		xhr : function (pathname) {
			pathname = typeof pathname === typeof [] ? pathname : [pathname];

			var com = url.parse(_private.url.domain),
				http = require(com.protocol.replace(":", "")),
				deferred = new promise.Deferred(), i, j,
				x = 0, data = [], allData = [], code, cachePath,
				basename, stats, lastModified, timeBuffer;

			function _resolve() {
				return deferred.resolve(allData.join(""));
			}

			function _getCachePath(basename) {
				return path.join(__dirname, "cache", basename);
			}

			function _handleResponse(res) {
				data = [];

				if (res.statusCode === 200 || res.statusCode === 304) {
					res.on("data", function (chunk) {
						data.push(chunk);
					});
				}

				res.on("end", function () {
					if (typeof data === typeof []) {
						data = data.join("");
					}

					basename = path.basename(res.req.path);

					switch (res.statusCode) {
					case 200:
					case 304:
						code = res.statusCode.toString().green;
						grunt.file.write(_getCachePath(basename), data);
						break;

					default:
						code = res.statusCode.toString().red;
						this.downloadErrors.push(res.req);
						break;
					}

					code = code + " ";

					grunt.log.writeln(code + basename);
					allData.push(data);

					if (++x === j) {
						return _resolve();
					}
				}.bind(this));

				res.on("error", function (err) {
					grunt.log.error(err.message);
				});
			}

			function _getURL(pathname) {
				http.get(url.format({
					protocol : com.protocol,
					host : com.host,
					pathname : (com.pathname || "") + pathname
				}), _handleResponse.bind(this));
			}

			if (pathname.length) {
				for (i = 0, j = pathname.length; i < j; i++) {

					basename = path.basename(pathname[i]);
					cachePath = _getCachePath(basename);

					if (!bust && fs.existsSync(cachePath)) {
						stats = fs.statSync(cachePath);
						lastModified = new Date(stats.mtime);
						timeBuffer = new Date();

						// Cache for a week.
						timeBuffer.setDate(timeBuffer.getDate() - 7);

						if (lastModified < timeBuffer) {
							_getURL.call(this, pathname[i]);
						} else {
							data = grunt.file.read(cachePath);

							grunt.log.writeln("cache ".green + basename);
							allData.push(data);

							if (++x === j) {
								setTimeout(_resolve);
							}
						}
					} else {
						_getURL.call(this, pathname[i]);
					}

				}
			} else {
				setTimeout(_resolve);
			}

			return deferred.promise;
		},

		isExtra : function (test) {
			return !!(config.extra[test] || config.extensibility[test]);
		},

		getRequests : function (tests) {
			return tests.filter(function (dep) {
				return (_private.core.indexOf(dep) !== -1) || this.isExtra(dep);
			}.bind(this));
		},

		getCommunityRequests : function (tests) {
			var matchTests = config.matchCommunityTests,
				isCore, isImplicit;

			return tests.filter(function (dep) {
				isCore = (_private.core.indexOf(dep) !== -1);
				isImplicit = matchTests || (config.tests.indexOf(dep) !== -1);

				return isImplicit && !isCore && !this.isExtra(dep);
			}.bind(this));
		},

		setupCommunityRequests : function (tests) {
			return this.getCommunityRequests(tests).map(function (dep) {
				dep = dep.replace(/_/g, "-");
				return _private.paths.community.replace("%s", dep);
			});
		},

		loadCustomTests : function (files) {
			var i, j, file, customTests = [];

			for (i = 0, j = files.length; i < j; i++) {
				file = files[i];

				if (fs.existsSync(file)) {
					grunt.log.ok(file);
					customTests.push(grunt.file.read(file));
				}
			}

			return customTests.join("\n");
		},

		makeRequests : function (tests) {
			var communityRequests = this.setupCommunityRequests(tests),
				i, j, main, customTests, custom;

			grunt.log.subhead("Downloading source files");
			promise.all(
				this.xhr(_private.paths.modernizr),

				// Check for special case flags, load conditionally
				(config.extra.printshiv) ? this.xhr(_private.paths.printshiv) : null,
				(config.extra.load) ? this.xhr(_private.paths.load) : null
			).then(function (data) {
				main = data.join("");

				if (communityRequests.length) {
					grunt.log.subhead("Downloading community files");
				}

				promise.when(this.xhr(communityRequests)).then(function (community) {
					customTests = grunt.file.expand({filter: 'isFile'}, config.customTests);

					if (customTests.length) {
						grunt.log.subhead("Adding custom tests");
					}

					custom = this.loadCustomTests(customTests);

					grunt.log.writeln();
					grunt.log.ok("Generating a custom Modernizr build");
					this.finalize(main + community + custom, tests, customTests);
				}.bind(this));
			}.bind(this));
		},

		addPrefix : function (build, tests, customTests) {
			build = ";" + build + ";";

			var prefix = "\/* Modernizr (Custom Build) | MIT & BSD" +
			"\n * Build: http://modernizr.com/download/#-" + tests.join("-") +
			(customTests.length ? "\n * Custom Tests: " + customTests.map(function (test) {
				return path.basename(test);
			}).join(", ") : "") +
			"\n */\n";

			return prefix + build;
		},

		finalize : function (data, tests, customTests) {
			// We have the data, time to build
			var build = Modulizr.ize(data, this.getRequests(tests)),
				downloadErrors = this.downloadErrors,
				errorText, i, j;

			if (config.uglify) {
				// Uglify
				grunt.log.ok("Uglifying");
				build = uglify(build, ["--extra", "--unsafe"]);
			} else {
				grunt.log.ok("Skipping uglify");
			}

			// Prefix with Modernizr licence
			build = this.addPrefix(build, tests, customTests);

			// Write!
			grunt.file.write(config.outputFile, build);

			// All set.
			grunt.log.writeln();
			grunt.log.ok("Wrote file to " + config.outputFile);

			if (downloadErrors.length) {
				errorText = ["The following tests were not found"];

				errorText.push("");

				for (i = 0, j = downloadErrors.length; i < j; i++) {
					errorText.push(_private.url.domain + downloadErrors[i].path);
				}

				errorText.push("");

				errorText.push("Check the Modulizr API for more info:");
				errorText.push(_private.url.modulizr);

				errorText.push("");
				errorText.push("");

				grunt.fail.warn(errorText.join("\n       ").replace(/\s$/, ""));
			}

			done();
		},

		processTemplates : function (obj) {
			var key, item, i, j, k;

			for (key in obj) {
				item = obj[key];

				if (typeof item === "string") {
					obj[key] = grunt.template.process(item);
				} else if (item.length) {
					for (i = 0, j = item.length; i < j; i++) {
						if (typeof item[i] === "string") {
							obj[key][i] = grunt.template.process(item[i]);
						}
					}
				}
			}
		},

		setDefaults : function (config, _defaults) {
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

			this.processTemplates(config);
		}
	};

	return new _Gruntifier();
};

module.exports = Gruntifier;
