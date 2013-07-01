/* jshint sub: true */
/* global define */

define(["Modernizr"], function (M) {

	var tests = {
		"standalone": {
			"applicationcache": M.applicationcache,
			"audio": M.audio,
			"battery": M.batteryapi,
			"blob": M.blobconstructor,
			"canvas": M.canvas,
			"canvastext": M.canvastext,
			"contenteditable": M.contenteditable,
			"contentsecuritypolicy": M.contentsecuritypolicy,
			"contextmenu": M.contextmenu,
			"cookies": M.cookies,
			"cors": M.cors,
			"custom-protocol-handler": M.customprotocolhandler,
			"dart": M.dart,
			"dataview-api": M.dataview,
			"draganddrop": M.draganddrop,
			"emoji": M.emoji,
			"exif-orientation": M.exiforientation,
			"fullscreen-api": M.fullscreen,
			"gamepad": M.gamepads,
			"geolocation": M.geolocation,
			"hashchange": M.hashchange,
			"history": M.history,
			"ie8compat": M.ie8compat,
			"indexedDB": M.indexeddb,
			"input": M.input,
			"inputtypes": M.inputtypes,
			"json": M.json,
			"lists-reversed": M.olreversed,
			"mathml": M.mathml,
			"notification": M.notification,
			"pagevisibility-api": M.pagevisibility,
			"performance": M.performance,
			"pointerevents": M.pointerevents,
			"pointerlock-api": M.pointerlock,
			"postmessage": M.postmessage,
			"quota-management-api": M.quotamanagement,
			"requestanimationframe": M.requestanimationframe,
			"svg": M.svg,
			"touchevents": M.touchevents,
			"typed-arrays": M.typedarrays,
			"unicode": M.unicode,
			"userdata": M.userdata,
			"vibration": M.vibrate,
			"video": M.video,
			"web-intents": M.webintents,
			"webgl": M.webgl,
			"websockets": M.websockets
		},
		"a": {
			"download": M.adownload
		},
		"audio": {
			"audiodata": M.audiodata,
			"loop": M.audioloop,
			"preload": M.audiopreload,
			"webaudio": M.webaudio
		},
		"battery": {
			"lowbattery": M.lowbattery
		},
		"canvas": {
			"todataurl": [
				M["todataurljpeg"],
				M["todataurlpng"],
				M["todataurlwebp"]
			]
		},
		"css": {
			"animations": M.cssanimations,
			"backgroundposition-shorthand": M.bgpositionshorthand,
			"backgroundposition-xy": M.bgpositionxy,
			"backgroundrepeat": [
				M["bgrepeatspace"],
				M["bgrepeatround"]
			],
			"backgroundsize": M.backgroundsize,
			"backgroundsizecover": M.bgsizecover,
			"borderimage": M.borderimage,
			"borderradius": M.borderradius,
			"boxshadow": M.boxshadow,
			"boxsizing": M.boxsizing,
			"calc": M.csscalc,
			"checked": M.checked,
			"columns": M.csscolumns,
			"cubicbezierrange": M.cubicbezierrange,
			"displayrunin": M["display-runin"],
			"displaytable": M["display-table"],
			"filters": M.cssfilters,
			"flexbox": M.flexbox,
			"flexboxlegacy": M.flexboxlegacy,
			"fontface": M.fontface,
			"generatedcontent": M.generatedcontent,
			"gradients": M.cssgradients,
			"hsla": M.hsla,
			"hyphens": [
				M["csshyphens"],
				M["softhyphens"],
				M["softhyphensfind"]
			],
			"lastchild": M.lastchild,
			"mask": M.cssmask,
			"mediaqueries": M.mediaqueries,
			"multiplebgs": M.multiplebgs,
			"nthchild": M.nthchild,
			"objectfit": M.objectfit,
			"opacity": M.opacity,
			"overflow-scrolling": M.overflowscrolling,
			"pointerevents": M.csspointerevents,
			"positionsticky": M.csspositionsticky,
			"pseudoanimations": M.csspseudoanimations,
			"pseudotransitions": M.csspseudotransitions,
			"reflections": M.cssreflections,
			"regions": M.regions,
			"remunit": M.cssremunit,
			"resize": M.cssresize,
			"rgba": M.rgba,
			"scrollbars": M.cssscrollbar,
			"shapes": M.shapes,
			"siblinggeneral": M.siblinggeneral,
			"subpixelfont": M.subpixelfont,
			"supports": M.supports,
			"textshadow": M.textshadow,
			"transforms": M.csstransforms,
			"transforms3d": M.csstransforms3d,
			"transitions": M.csstransitions,
			"userselect": M.userselect,
			"vhunit": M.cssvhunit,
			"vmaxunit": M.cssvmaxunit,
			"vminunit": M.cssvminunit,
			"vwunit": M.cssvwunit,
			"wrapflow": M.wrapflow
		},
		"dom": {
			"classlist": M.classlist,
			"createElement-attrs": [
				M["createelementattrs"],
				M["createelement-attrs"]
			],
			"dataset": M.dataset,
			"microdata": M.microdata
		},
		"elem": {
			"datalist": M.datalistelem,
			"details": M.details,
			"output": M.outputelem,
			"progress-meter": [
				M["progressbar"],
				M["meter"]
			],
			"ruby": M.ruby,
			"template": M.template,
			"time": M.time,
			"track": [
				M["texttrackapi"],
				M["track"]
			]
		},
		"es5": {
			"array": M.es5array,
			"date": M.es5date,
			"function": M.es5function,
			"object": M.es5object,
			"strictmode": M.strictmode,
			"string": M.es5string
		},
		"es6": {
			"contains": M.contains
		},
		"event": {
			"deviceorientation-motion": [
				M["devicemotion"],
				M["deviceorientation"]
			]
		},
		"file": {
			"api": M.filereader,
			"filesystem": M.filesystem
		},
		"forms": {
			"capture": M.capture,
			"fileinput": M.fileinput,
			"formattribute": M.formattribute,
			"inputnumber-l10n": M.localizednumber,
			"placeholder": M.placeholder,
			"requestautocomplete": M.requestautocomplete,
			"speechinput": M.speechinput,
			"validation": M.formvalidation
		},
		"iframe": {
			"sandbox": M.sandbox,
			"seamless": M.seamless,
			"srcdoc": M.srcdoc
		},
		"img": {
			"apng": M.apng,
			"webp-lossless": [
				M["webplossless"],
				M["webp-lossless"]
			],
			"webp": M.webp
		},
		"network": {
			"connection": M.lowbandwidth,
			"eventsource": M.eventsource,
			"xhr2": M.xhr2
		},
		"script": {
			"async": M.scriptasync,
			"defer": M.scriptdefer
		},
		"storage": {
			"localstorage": M.localstorage,
			"sessionstorage": M.sessionstorage,
			"websqldatabase": M.websqldatabase
		},
		"style": {
			"scoped": M.stylescoped
		},
		"svg": {
			"asimg": M.svgasimg,
			"clippaths": M.svgclippaths,
			"filters": M.svgfilters,
			"inline": M.inlinesvg,
			"smil": M.smil
		},
		"url": {
			"data-uri": M.datauri
		},
		"video": {
			"autoplay": M.videoautoplay,
			"loop": M.videoloop,
			"preload": M.videopreload
		},
		"webgl": {
			"extensions": M.webglextensions
		},
		"webrtc": {
			"getusermedia": M.getusermedia,
			"peerconnection": M.peerconnection
		},
		"websockets": {
			"binary": M.websocketsbinary
		},
		"window": {
			"framed": M.framed
		},
		"workers": {
			"blobworkers": M.blobworkers,
			"dataworkers": M.dataworkers,
			"sharedworkers": M.sharedworkers,
			"webworkers": M.webworkers
		}
	};

	return M;

});