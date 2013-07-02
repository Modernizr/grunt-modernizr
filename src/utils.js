/* jshint node: true */
module.exports = function (grunt, ModernizrPath) {
	"use strict";

	return {
		setDefaults : function (target) {
			var _ = grunt.util._;
			var config = grunt.config("modernizr")[target];
			var _defaults = _.clone(grunt.option("_modernizr.defaults"));

			config = _.extend(_defaults, config);

			grunt.config.set("modernizr." + target, config);
			return config;
		}
	};
};
