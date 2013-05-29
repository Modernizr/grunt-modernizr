/* jshint node: true */
module.exports = function (grunt, ModernizrPath) {
	"use strict";

	return {
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

			return obj;
		},

		setDefaults : function () {
			var config = grunt.config("modernizr");
			var _defaults = grunt.option("_modernizr.defaults");

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

			grunt.config.set("modernizr", this.processTemplates(config));
			return grunt.config("modernizr");
		}
	};
};
