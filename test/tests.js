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
		.expect("Running \"modernizr\" task")
		.expect("Looking for Modernizr references")

		.expect(">> 35 matches in test/css/vanilla.css")
		.expect(">> applicationcache, audio, backgroundsize, borderimage, borderradius, boxshadow, canvas, canvastext, cssanimations, csscolumns, cssgradients, cssreflections, csstransforms, csstransforms3d, csstransitions, draganddrop, flexbox, fontface, generatedcontent, geolocation, hashchange, history, hsla, indexedDB, input, inputtypes, multiplebgs, opacity, postmessage, rgba, svg, textshadow, video, webgl, websockets")

		.expect(">> 35 matches in test/js/amd.js")
		.expect(">> applicationcache, audio, backgroundsize, borderimage, borderradius, boxshadow, canvas, canvastext, cssanimations, csscolumns, cssgradients, cssreflections, csstransforms, csstransforms3d, csstransitions, draganddrop, flexbox, fontface, generatedcontent, geolocation, hashchange, history, hsla, indexedDB, input, inputtypes, multiplebgs, opacity, postmessage, rgba, svg, textshadow, video, webgl, websockets")

		.expect(">> 35 matches in test/js/vanilla.js")
		.expect(">> applicationcache, audio, backgroundsize, borderimage, borderradius, boxshadow, canvas, canvastext, cssanimations, csscolumns, cssgradients, cssreflections, csstransforms, csstransforms3d, csstransitions, draganddrop, flexbox, fontface, generatedcontent, geolocation, hashchange, history, hsla, indexedDB, input, inputtypes, multiplebgs, opacity, postmessage, rgba, svg, textshadow, video, webgl, websockets")

		.wait("Building Modernizr").wait("OK")
		.expect("Saved file to build/modernizr-custom.js")

		.run(done);
	});
});
