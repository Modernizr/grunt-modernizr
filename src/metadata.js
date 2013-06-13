/* jshint node: true */
module.exports = function (grunt, ModernizrPath) {
	"use strict";

	// Dependencies
	var cp = require("child_process"),
		fs = require("fs"),
		path = require("path");

	// Deferreds
	var promise = require("promised-io/promise");

	return {
		init : function (tests) {
			var deferred = new promise.Deferred();
			var modernizr = require("modernizr");

			// module.exports ftw?
			(function () {
				var mappings = modernizr.metadata;
				var modRegExp = new RegExp(ModernizrPath + "/?");

				mappings = mappings.map(function (map) {
					var cleanname = map.name.replace(modRegExp, ""),
						testpath = map.path.replace(modRegExp, "").replace("feature-detects", "test");

					return {
						"path": testpath.replace(".js", ""),
						"name": cleanname,
						"property": map.property,
						"cssclass": map.cssclass
					};
				});

				return deferred.resolve(mappings);
			}());

			return deferred.promise;
		}
	};
};
