/*jshint node:true, newcap:false*/

var Gruntifier = function (grunt, done, bust) {

	// Config object
	var config = grunt.config("modernizr"),
		_defaults = grunt.option("_modernizr.defaults"),
		_private = grunt.option("_modernizr.private"),
		_quiet = grunt.option("quiet"),
		_verbose = grunt.option("verbose");

	// Dependencies
	var cp = require("child_process"),
		fs = require("fs"),
		cwd = process.cwd(),
		path = require("path"),
		colors = require("colors"),
		uglifier = require("uglify-js");

	// Deferreds
	var promise = require("promised-io/promise");

	// Modernizr
	var ModernizrPath = path.join(__dirname, "..", "node_modules", "Modernizr");

	var _Gruntifier = function () {
		return this.init();
	};

	_Gruntifier.prototype = {
		init : function () {

			// Use defaults for any options left undefined
			this.utils.setDefaults(config, _defaults);

			// Sequentially return promises
			promise.seq([

				// Use Modernizr to fetch metadata from each feature detect
				this.metadata.init.bind(this.metadata),

				// Look in the current project for references to tests
				this.crawler.init.bind(this.crawler),

				// Construct a list with matching positives, tell Modernizr to build a custom suite
				this.builder.init.bind(this.builder),

				// Clean up, UglifyJS, send done callback
				this.finalize.bind(this.finalize)

			]);
		},

		finalize : function () {
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

			done();
		}
	};

	_Gruntifier.prototype.utils = {
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

	_Gruntifier.prototype.metadata = {
		init : function (tests) {
			var deferred = new promise.Deferred();
			var genPath = path.join(ModernizrPath, "lib", "generate-meta.js");

			if (!fs.existsSync(genPath)) {
				grunt.fail.warn("Sorry, I can't find Modernizr in " + genPath.replace(__dirname, ""));
			}

			// module.exports ftw?
			// var generator = require(genPath);

			var chunks = [];

			var generator = cp.spawn("node", [genPath], {
				cwd: ModernizrPath,
				stdio: "pipe"
			});

			generator.stdout.on("data", function (data) {
				chunks.push(data.toString().trim());
			});

			generator.on("exit", function (code) {
				if (!chunks.length) {
					grunt.fail.fatal(code);
				}

				var mappings = JSON.parse(chunks.join(""));
				var modRegExp = new RegExp(ModernizrPath + "/?");

				mappings = mappings.map(function (map) {
					var cleanname = map.name.replace(modRegExp, ""),
						testpath = map.path.replace(modRegExp, "").replace("feature-detects", "test");

					return {
						"path": testpath.replace(".js", ""),
						"name": cleanname,
						"property": map.property || cleanname.replace("test/", ""),
						"cssclass": map.cssclass
					};
				});

				return deferred.resolve(mappings);
			});

			return deferred.promise;
		}
	};

	_Gruntifier.prototype.crawler = {
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
			var deferred = new promise.Deferred(),
				tests = config.tests.concat(config.customTests),
				files;

			if (!_quiet) {
				grunt.log.subhead("Looking for Modernizr references");
			}

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
					config.files.push("!" + config.devFile);
				}
			}

			// Exclude generated file
			config.files.push("!" + config.outputFile);

			// And exclude this current file
			config.files.push("!" + __filename.replace(cwd + path.sep, ""));

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

	_Gruntifier.prototype.builder = {
		writeConfig : function (tests) {
			var configPath = path.join(ModernizrPath, "lib", "config-all.json");

			if (!fs.existsSync(configPath)) {
				grunt.fail.warn("Sorry, I can't find Modernizr in " + configPath.replace(__dirname, ""));
			}

			var config = grunt.file.readJSON(configPath);
			config["feature-detects"] = tests;

			grunt.file.write(configPath, JSON.stringify(config));
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

	return new _Gruntifier();
};

module.exports = Gruntifier;
