/*jshint node:true*/
/*global describe, beforeEach, it, after*/

"use strict";

var fs = require("fs");
var path = require("path");
var colors = require("colors");
var cwd = process.cwd();

var expect = require("expect.js");
var nexpect = require("nexpect");
var grunt = require("grunt");

describe("grunt-modernizr", function () {
	var tests = "adownload, apng, applicationcache, audio, audiodata, audioloop, audiopreload, backgroundsize, batteryapi, bgpositionshorthand, bgpositionxy, bgrepeatround, bgrepeatspace, bgsizecover, blobconstructor, blobworkers, borderimage, borderradius, boxshadow, boxsizing, canvas, canvastext, capture, checked, classlist, contains, contenteditable, contentsecuritypolicy, contextmenu, cookies, cors, createelement-attrs, createelementattrs, cssanimations, csscalc, csscolumns, cssfilters, cssgradients, csshyphens, cssmask, csspointerevents, csspositionsticky, csspseudoanimations, csspseudotransitions, cssreflections, cssremunit, cssresize, cssscrollbar, csstransforms, csstransforms3d, csstransitions, cssvhunit, cssvmaxunit, cssvminunit, cssvwunit, cubicbezierrange, customprotocolhandler, dart, datalistelem, dataset, datauri, dataview, dataworkers, details, devicemotion, deviceorientation, display-runin, display-table, draganddrop, emoji, es5array, es5date, es5function, es5object, es5string, eventsource, exiforientation, fileinput, filereader, filesystem, flexbox, flexboxlegacy, flexboxtweener, fontface, formattribute, formvalidation, framed, fullscreen, gamepads, generatedcontent, geolocation, getusermedia, hashchange, history, hsla, ie8compat, indexeddb, inlinesvg, input, inputtypes, json, lastchild, localizednumber, localstorage, lowbandwidth, lowbattery, mathml, mediaqueries, meter, microdata, multiplebgs, notification, nthchild, objectfit, olreversed, opacity, outputelem, overflowscrolling, pagevisibility, peerconnection, performance, placeholder, pointerevents, pointerlock, postmessage, progressbar, quotamanagement, regions, requestanimationframe, requestautocomplete, rgba, ruby, sandbox, scriptasync, scriptdefer, seamless, sessionstorage, shapes, sharedworkers, siblinggeneral, smil, softhyphens, softhyphensfind, speechinput, srcdoc, strictmode, stylescoped, subpixelfont, supports, svg, svgasimg, svgclippaths, svgfilters, template, textshadow, texttrackapi, time, todataurljpeg, todataurlpng, todataurlwebp, touchevents, track, typedarrays, unicode, userdata, userselect, vibrate, video, videoautoplay, videoloop, videopreload, webaudio, webgl, webglextensions, webintents, webp, webp-lossless, webplossless, websockets, websocketsbinary, websqldatabase, webworkers, wrapflow, xhr2",
		testsLength = tests.split(", ").length,
		existingBuild = path.join(cwd, "build", "modernizr-custom.js");

	before(function (done) {
		if (fs.existsSync(existingBuild)) {
			fs.unlinkSync(existingBuild);
		}

		done();
	});

	it("should find all available tests in project", function (done) {
		nexpect.spawn("grunt", ["modernizr"], {
			stripColors: true,
			verbose: true
		})
		.expect("Running \"modernizr:dist\" (modernizr) task")
		.expect("Looking for Modernizr references")

		.expect(">> " + testsLength + " matches in")
		.expect(">> " + tests)

		.expect(">> " + testsLength + " matches in")
		.expect(">> " + tests)

		.expect(">> " + testsLength + " matches in")
		.expect(">> " + tests)

		.wait("Building Modernizr").wait("OK")
		.expect("Saved file to build/modernizr-custom.js")

		.run(done);
	});

	describe("should include all tests", function () {
		var testArray = tests.split(", ");
		var contents;

		testArray.forEach(function (test) {
			it(test, function (done) {
				contents = contents || fs.readFileSync(existingBuild, "utf8");
				expect(contents.indexOf(test)).to.not.equal(-1);
				done();
			});
		});
	});
});
