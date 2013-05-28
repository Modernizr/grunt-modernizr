/*jshint node:true*/
/*global describe, before, it, after*/

"use strict";

var fs = require("fs");
var path = require("path");
var colors = require("colors");
var cwd = process.cwd();

var nexpect = require("nexpect");
var grunt = require("grunt");

describe("grunt-modernizr", function () {
	it("should find all available tests in project", function (done) {
		nexpect.spawn("grunt", ["modernizr"], {
			stripColors: true,
			verbose: true
		})
		.expect('Running "modernizr" task')

		.expect("Enabled Extras")
		.expect(">> shiv, load, cssclasses")

		.expect("Looking for Modernizr references")

		.expect(">> 7 matches in lib/modulizr.js")
		.expect(">> testallprops, prefixed, mq, smil, testbundle, canvas, webgl")

		.expect(">> 51 matches in test/css/vanilla.css")
		.expect(">> canvastext, csstransforms3d, flexbox, cssgradients, opacity, indexedDB, backgroundsize, borderimage, borderradius, boxshadow, cssanimations, csscolumns, cssreflections, csstransitions, testallprops, flexbox-legacy, prefixed, csstransforms, mq, hashchange, draganddrop, generatedcontent, svg, inlinesvg, smil, svgclippaths, input, inputtypes, touch, fontface, testbundle, respond, websockets, applicationcache, audio, canvas, geolocation, history, hsla, indexeddb, localstorage, multiplebgs, postmessage, scriptdefer, sessionstorage, textshadow, rgba, video, webgl, websqldatabase, webworkers")

		.expect(">> 51 matches in test/js/amd.js")
		.expect(">> canvastext, csstransforms3d, flexbox, cssgradients, opacity, indexedDB, backgroundsize, borderimage, borderradius, boxshadow, cssanimations, csscolumns, cssreflections, csstransitions, testallprops, flexbox-legacy, prefixed, csstransforms, mq, hashchange, draganddrop, generatedcontent, svg, inlinesvg, smil, svgclippaths, input, inputtypes, touch, fontface, testbundle, respond, websockets, applicationcache, audio, canvas, geolocation, history, hsla, indexeddb, localstorage, multiplebgs, postmessage, scriptdefer, sessionstorage, textshadow, rgba, video, webgl, websqldatabase, webworkers")

		.expect(">> 51 matches in test/js/vanilla.js")
		.expect(">> canvastext, csstransforms3d, flexbox, cssgradients, opacity, indexedDB, backgroundsize, borderimage, borderradius, boxshadow, cssanimations, csscolumns, cssreflections, csstransitions, testallprops, flexbox-legacy, prefixed, csstransforms, mq, hashchange, draganddrop, generatedcontent, svg, inlinesvg, smil, svgclippaths, input, inputtypes, touch, fontface, testbundle, respond, websockets, applicationcache, audio, canvas, geolocation, history, hsla, indexeddb, localstorage, multiplebgs, postmessage, scriptdefer, sessionstorage, textshadow, rgba, video, webgl, websqldatabase, webworkers")

		.expect("Downloading source files")

		.wait(">> Generating a custom Modernizr build")
		.expect(">> Uglifying")

		.expect("Wrote minified file to build/modernizr-custom.js")
		.expect(">> Wrote source map to build/modernizr-custom.js.map")
		.run(done);
	});
});
