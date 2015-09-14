(function () {
	"use strict";

	// ==========================================================================
	// PRIVATE CONFIG
	// ==========================================================================
	module.exports = {
		"url" : {
			"github" : "https://github.com/doctyper/grunt-modernizr",
			"domain" : "http://modernizr.com",
			"raw" : "https://raw.github.com",
			"modulizr" : "https://github.com/Modernizr/modernizr.com/blob/gh-pages/i/js/modulizr.js#L15-157"
		},

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
			"flexboxlegacy",
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
			"websockets",

			/* missing core tests */
			"applicationcache",
			"audio",
			"canvas",
			"geolocation",
			"history",
			"hsla",
			"indexeddb",
			"input",
			"inputtypes",
			"localstorage",
			"multiplebgs",
			"postmessage",
			"scriptdefer",
			"sessionstorage",
			"textshadow",
			"rgba",
			"video",
			"webgl",
			"websqldatabase",
			"webworkers"
		],

		"paths" : {
			"modernizr" : "Modernizr/modernizr.com/gh-pages/downloads/modernizr-latest.js",
			"printshiv" : "Modernizr/modernizr.com/gh-pages/i/js/html5shiv-printshiv-3.7.1.js",
			"load" : "Modernizr/modernizr.com/gh-pages/i/js/modernizr.load.1.5.4.js",
			"community" : "Modernizr/Modernizr/87c723720a48254ae37ffd56829e32a96f5c5496/feature-detects/%s.js"
		}
	};
}());
