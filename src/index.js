/* jshint node: true */
module.exports = function (grunt, target, done) {
	"use strict";

	// Dependencies
	var fs = require("fs"),
		path = require("path");

	// Deferreds
	var promise = require("promised-io/promise");

	// Modernizr
	var ModernizrPath = path.join(__dirname, "..", "node_modules", "Modernizr");

	var Customizr = function () {
		this.target = target;
		return this.init();
	};

	Customizr.prototype = {
		init : function () {

			// Set default options
			this.utils.setDefaults(this.target);

			// Sequentially return promises
			promise.seq([

				// Use Modernizr to fetch metadata from each feature detect
				this.metadata.init.bind(this),

				// Look in the current project for references to tests
				this.crawler.init.bind(this),

				// Construct a list with matching positives, tell Modernizr to build a custom suite
				this.builder.init.bind(this),

				// Send done callback
				this.finalize.bind(this)

			]);
		},

		finalize : function (options) {
			// Store the current options.
			// If a subsequent build matches the options,
			// we can assume the cached version will do fine.
			this.utils.saveOptions(options);

			// All done.
			return done();
		}
	};

	// Import modules
	fs.readdirSync(__dirname).filter(function (file) {
		return file !== path.basename(__filename);
	}).forEach(function (file) {
		var _import = path.basename(file, ".js");
		Customizr.prototype[_import] = require(path.join(__dirname, _import))(grunt, ModernizrPath);
	});

	return new Customizr();
};
