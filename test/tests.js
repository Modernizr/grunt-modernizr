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

var tests = "Intl, adownload, animation, apng, applicationcache, audio, audioloop, audiopreload, backgroundcliptext, backgroundsize, batteryapi, bgpositionshorthand, bgpositionxy, bgrepeatround, bgrepeatspace, bgsizecover, blobconstructor, blobworkers, borderimage, borderradius, boxshadow, boxsizing, canvas, canvastext, capture, checked, classlist, contains, contenteditable, contentsecuritypolicy, contextmenu, cookies, cors, createelement-attrs, createelementattrs, cssanimations, csscalc, csscolumns, cssfilters, cssgradients, csshyphens, cssmask, csspointerevents, csspositionsticky, csspseudoanimations, csspseudotransitions, cssreflections, cssremunit, cssresize, cssscrollbar, csstransforms, csstransforms3d, csstransitions, cssvhunit, cssvmaxunit, cssvminunit, cssvwunit, cubicbezierrange, customprotocolhandler, dart, datalistelem, dataset, datauri, dataview, dataworkers, details, devicemotion, deviceorientation, directory, display-runin, displaytable, documentfragment, draganddrop, ellipsis, emoji, es5array, es5date, es5function, es5object, es5string, eventsource, exiforientation, fileinput, filereader, filesystem, flash, flexbox, flexboxlegacy, flexboxtweener, flexwrap, fontface, formattribute, formvalidation, framed, fullscreen, gamepads, generatedcontent, geolocation, getrandomvalues, getusermedia, hashchange, history, hsla, ie8compat, indexeddb, inlinesvg, input, inputformaction, inputtypes, jpegxr, json, lastchild, localizednumber, localstorage, lowbandwidth, lowbattery, mathml, mediaqueries, meter, microdata, multiplebgs, notification, nthchild, objectfit, olreversed, oninput, opacity, outputelem, overflowscrolling, pagevisibility, peerconnection, performance, placeholder, pointerevents, pointerlock, postmessage, preserve3d, progressbar, quotamanagement, regions, requestanimationframe, requestautocomplete, rgba, ruby, sandbox, scriptasync, scriptdefer, seamless, search, serviceworker, sessionstorage, shapes, sharedworkers, siblinggeneral, smil, softhyphens, softhyphensfind, speechinput, speechrecognition, speechsynthesis, srcdoc, srcset, strictmode, stylescoped, subpixelfont, supports, svg, svgasimg, svgclippaths, svgfilters, target, template, textareamaxlength, textshadow, texttrackapi, time, todataurljpeg, todataurlpng, todataurlwebp, touchevents, track, typedarrays, unicode, userdata, userselect, vibrate, video, videoautoplay, videoloop, videopreload, vml, webaudio, webgl, webglextensions, webintents, webp, webp-lossless, webpalpha, webpanimation, webplossless, websockets, websocketsbinary, websqldatabase, webworkers, wrapflow, xhr2, xhrresponsetype, xhrresponsetypearraybuffer, xhrresponsetypeblob, xhrresponsetypedocument, xhrresponsetypejson, xhrresponsetypetext";
var testArray = tests.split(", ");

describe("grunt-modernizr", function () {
	var testsLength = testArray.length,
		existingBuild = path.join(cwd, "build", "modernizr-custom.js");

	before(function (done) {
		if (fs.existsSync(existingBuild)) {
			fs.unlinkSync(existingBuild);
		}

		done();
	});

	it("should find all available tests in project", function (done) {
		process.stdout.write("\n\n");

		nexpect.spawn("grunt", ["modernizr"], {
			stripColors: true,
			verbose: true
		})
		.expect("Running \"modernizr:dist\" (modernizr) task")
		.expect("Looking for Modernizr references")

		.wait(">> " + testsLength + " matches in")
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

	it("should avoid re-building a cached Modernizr build", function (done) {
		process.stdout.write("\n\n");

		nexpect.spawn("grunt", ["modernizr"], {
			stripColors: true,
			verbose: true
		})
		.expect("Running \"modernizr:dist\" (modernizr) task")
		.expect("Looking for Modernizr references")

		.wait(">> " + testsLength + " matches in")
		.expect(">> " + tests)

		.expect(">> " + testsLength + " matches in")
		.expect(">> " + tests)

		.expect(">> " + testsLength + " matches in")
		.expect(">> " + tests)

		.expect("No config or test changes detected")
		.expect(">> grunt-modernizr has bypassed the build step. Run `grunt modernizr --force` to override.")
		.expect(">> Your current file can be found in build/modernizr-custom.js")

		.run(done);
	});

	it("should force re-building a cached Modernizr build", function (done) {
		process.stdout.write("\n\n");

		nexpect.spawn("grunt", ["modernizr", "--force"], {
			stripColors: true,
			verbose: true
		})
		.expect("Running \"modernizr:dist\" (modernizr) task")
		.expect("Looking for Modernizr references")

		.wait(">> " + testsLength + " matches in")
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

	describe("declared tests", function () {

		before(function (done) {
			nexpect.spawn("grunt", ["clean"])
			.run(function () {
				var override = fs.readFileSync(path.join(gruntfiles, "Gruntfile.select.js"));
				fs.writeFileSync(Gruntfile, override);

				done();
			});
		});

		it("should only build declared tests", function (done) {
			process.stdout.write("\n\n");

			nexpect.spawn("grunt", ["modernizr"], {
				stripColors: true,
				verbose: true
			})
			.expect("Running \"modernizr:dist\" (modernizr) task")

			.expect(">> Explicitly including these tests:")
			.expect(">> siblinggeneral, svg, webintents")

			.expect("Skipping file traversal")

			.wait("Building your customized Modernizr").wait("OK")
			.expect(">> Success! Saved file to build/modernizr-select.js")

			.run(done);
		});

		describe("should only contain references to bundled tests", function () {

			var includedTestArray = [
				"webintents",
				"siblinggeneral",
				"svg"
			];

			var testsLength = includedTestArray.length;
			var includedTests = includedTestArray.join(" ");

			var contents;

			includedTestArray.forEach(function (test) {
				it(test, function (done) {
					contents = contents || fs.readFileSync(path.join(cwd, "build", "modernizr-select.js"), "utf8");
					expect(contents.indexOf(test)).to.not.equal(-1);
					done();
				});
			});

			describe("should not contain these references", function (done) {
				var excludedTestArray = testArray.filter(function (test) {
					return includedTestArray.indexOf(test) === -1;
				});

				excludedTestArray.forEach(function (test) {
					it(test, function (done) {
						contents = contents || fs.readFileSync(path.join(cwd, "build", "modernizr-select.js"), "utf8");

						var testPattern = "addTest('" + test.toLowerCase();
						expect(contents.indexOf(testPattern)).to.equal(-1);
						done();
					});
				});
			});
		});

		after(function () {
			fs.writeFileSync(Gruntfile, pristine);
		});

	});

	describe("excluded tests", function () {

		before(function (done) {
			nexpect.spawn("grunt", ["clean"])
			.run(function () {
				var override = fs.readFileSync(path.join(gruntfiles, "Gruntfile.exclude.js"));
				fs.writeFileSync(Gruntfile, override);

				done();
			});
		});

		it("should build without excluded tests", function (done) {
			process.stdout.write("\n\n");

			nexpect.spawn("grunt", ["modernizr"], {
				stripColors: true,
				verbose: true
			})
			.expect("Running \"modernizr:dist\" (modernizr) task")

			.expect(">> Explicitly excluding these tests:")
			.expect(">> applicationcache, emoji, notification")

			.wait("Building your customized Modernizr").wait("OK")
			.expect(">> Success! Saved file to build/modernizr-exclude.js")

			.run(done);
		});

		describe("should not contain references to excluded tests", function () {

			var excludedTestArray = [
				"applicationcache",
				"emoji",
				"notification"
			];

			var testsLength = excludedTestArray.length;
			var excludedTests = excludedTestArray.join(" ");

			var contents;

			excludedTestArray.forEach(function (test) {
				it(test, function (done) {
					contents = contents || fs.readFileSync(path.join(cwd, "build", "modernizr-exclude.js"), "utf8");
					expect(contents.indexOf(test)).to.equal(-1);
					done();
				});
			});
		});

		after(function () {
			fs.writeFileSync(Gruntfile, pristine);
		});

	});

	describe("prefix test", function () {

		before(function (done) {
			nexpect.spawn("grunt", ["clean"])
			.run(function () {
				var override = fs.readFileSync(path.join(gruntfiles, "Gruntfile.prefixed.js"));
				fs.writeFileSync(Gruntfile, override);

				done();
			});
		});

		it("should honor the specified prefix", function (done) {
			process.stdout.write("\n\n");

			nexpect.spawn("grunt", ["modernizr"], {
				stripColors: true,
				verbose: true
			})
			.expect("Running \"modernizr:dist\" (modernizr) task")

			.expect("Looking for Modernizr references")

			.expect(">> 3 matches in test/css/vanilla.css")
			.expect(">> cors, input, smil")

			.wait("Building your customized Modernizr").wait("OK")
			.expect(">> Success! Saved file to build/modernizr-prefixed.js")

			.run(done);
		});

		describe("should only contain references to bundled tests", function () {

			var includedTestArray = [
				"cors",
				"input",
				"smil"
			];

			var testsLength = includedTestArray.length;
			var includedTests = includedTestArray.join(" ");

			var contents;

			includedTestArray.forEach(function (test) {
				it(test, function (done) {
					contents = contents || fs.readFileSync(path.join(cwd, "build", "modernizr-prefixed.js"), "utf8");
					expect(contents.indexOf(test)).to.not.equal(-1);
					done();
				});
			});

			describe("should not contain these references", function (done) {
				var excludedTestArray = testArray.filter(function (test) {
					return includedTestArray.indexOf(test) === -1;
				});

				excludedTestArray.forEach(function (test) {
					it(test, function (done) {
						contents = contents || fs.readFileSync(path.join(cwd, "build", "modernizr-prefixed.js"), "utf8");

						var testPattern = "addTest('" + test.toLowerCase();
						expect(contents.indexOf(testPattern)).to.equal(-1);
						done();
					});
				});
			});
		});

		after(function () {
			fs.writeFileSync(Gruntfile, pristine);
		});

	});
});
