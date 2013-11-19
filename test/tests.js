/*jshint node:true*/
/*global describe, before, it, after*/

"use strict";

var fs = require("fs");
var path = require("path");
var colors = require("colors");
var cwd = process.cwd();

var expect = require("expect.js");
var nexpect = require("nexpect");
var grunt = require("grunt");

describe("grunt-modernizr", function () {
	var tests = "adownload, apng, applicationcache, audio, audioloop, audiopreload, backgroundcliptext, backgroundsize, batteryapi, bgpositionshorthand, bgpositionxy, bgrepeatround, bgrepeatspace, bgsizecover, blobconstructor, blobworkers, borderimage, borderradius, boxshadow, boxsizing, canvas, canvastext, capture, checked, classlist, contains, contenteditable, contentsecuritypolicy, contextmenu, cookies, cors, createelement-attrs, createelementattrs, cssanimations, csscalc, csscolumns, cssfilters, cssgradients, csshyphens, cssmask, csspointerevents, csspositionsticky, csspseudoanimations, csspseudotransitions, cssreflections, cssremunit, cssresize, cssscrollbar, csstransforms, csstransforms3d, csstransitions, cssvhunit, cssvmaxunit, cssvminunit, cssvwunit, cubicbezierrange, customprotocolhandler, dart, datalistelem, dataset, datauri, dataview, dataworkers, details, devicemotion, deviceorientation, directory, display-runin, displaytable, documentfragment, draganddrop, ellipsis, emoji, es5array, es5date, es5function, es5object, es5string, eventsource, exiforientation, fileinput, filereader, filesystem, flexbox, flexboxlegacy, flexboxtweener, fontface, formattribute, formvalidation, framed, fullscreen, gamepads, generatedcontent, geolocation, getrandomvalues, getusermedia, hashchange, history, hsla, ie8compat, indexeddb, inlinesvg, input, inputtypes, json, lastchild, localizednumber, localstorage, lowbandwidth, lowbattery, mathml, mediaqueries, meter, microdata, multiplebgs, notification, nthchild, objectfit, olreversed, oninput, opacity, outputelem, overflowscrolling, pagevisibility, peerconnection, performance, placeholder, pointerevents, pointerlock, postmessage, preserve3d, progressbar, quotamanagement, regions, requestanimationframe, requestautocomplete, rgba, ruby, sandbox, scriptasync, scriptdefer, seamless, sessionstorage, shapes, sharedworkers, siblinggeneral, smil, softhyphens, softhyphensfind, speechinput, speechrecognition, speechsynthesis, srcdoc, strictmode, stylescoped, subpixelfont, supports, svg, svgasimg, svgclippaths, svgfilters, template, textshadow, texttrackapi, time, todataurljpeg, todataurlpng, todataurlwebp, touchevents, track, typedarrays, unicode, userdata, userselect, vibrate, video, videoautoplay, videoloop, videopreload, vml, webaudio, webgl, webglextensions, webintents, webp, webp-lossless, webplossless, websockets, websocketsbinary, websqldatabase, webworkers, wrapflow, xhr2, xhrresponsetype, xhrresponsetypearraybuffer, xhrresponsetypeblob, xhrresponsetypedocument, xhrresponsetypejson, xhrresponsetypetext",
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

		.expect(">> Ready to build using these settings:")

		.wait("Building your customized Modernizr").wait("OK")
		.expect(">> Success! Saved file to build/modernizr-custom.js")

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

describe("custom builds", function () {
	var Gruntfile = path.join(cwd, "Gruntfile.js");

	var pristine = fs.readFileSync(Gruntfile);
	var gruntfiles = path.join(cwd, "test", "gruntfiles");

	it("should only build declared tests", function (done) {
		var override = fs.readFileSync(path.join(gruntfiles, "Gruntfile.select.js"));
		fs.writeFileSync(Gruntfile, override);

		nexpect.spawn("grunt", ["modernizr"], {
			stripColors: true,
			verbose: true
		})
		.expect("Running \"modernizr:dist\" (modernizr) task")

		.expect(">> Implicitly including these tests:")
		.expect(">> siblinggeneral, svgclippaths, webintents")

		.expect("Skipping file traversal")

		.wait("Building your customized Modernizr").wait("OK")
		.expect(">> Success! Saved file to build/modernizr-select.js")

		.run(done);
	});

	describe("should only contain references to bundled tests", function () {

		var testArray = [
			"webintents",
			"siblinggeneral",
			"svgclippaths"
		];

		var testsLength = testArray.length;
		var tests = testArray.join(" ");

		var contents;

		testArray.forEach(function (test) {
			it(test, function (done) {
				contents = contents || fs.readFileSync(path.join(cwd, "build", "modernizr-select.js"), "utf8");
				expect(contents.indexOf(test)).to.not.equal(-1);
				done();
			});
		});

		describe("should not contain these references", function (done) {
			var testArray = [
				"videoloop",
				"cssremunit",
				"customprotocolhandler",
				"boxshadow",
				"webgl"
			];

			testArray.forEach(function (test) {
				it(test, function (done) {
					contents = contents || fs.readFileSync(path.join(cwd, "build", "modernizr-select.js"), "utf8");
					expect(contents.indexOf(test)).to.equal(-1);
					done();
				});
			});
		});
	});

	after(function () {
		fs.writeFileSync(Gruntfile, pristine);
	});
});
