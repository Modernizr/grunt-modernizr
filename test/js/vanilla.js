/* jshint sub: true */

var Modernizr = window.Modernizr;

var tests = {
	"standalone": {
		"applicationcache": Modernizr.applicationcache,
		"audio": Modernizr.audio,
		"battery": Modernizr.batteryapi,
		"blob": Modernizr.blobconstructor,
		"canvas": Modernizr.canvas,
		"canvastext": Modernizr.canvastext,
		"contenteditable": Modernizr.contenteditable,
		"contentsecuritypolicy": Modernizr.contentsecuritypolicy,
		"contextmenu": Modernizr.contextmenu,
		"cookies": Modernizr.cookies,
		"cors": Modernizr.cors,
		"custom-protocol-handler": Modernizr.customprotocolhandler,
		"dart": Modernizr.dart,
		"dataview-api": Modernizr.dataview,
		"draganddrop": Modernizr.draganddrop,
		"emoji": Modernizr.emoji,
		"exif-orientation": Modernizr.exiforientation,
		"fullscreen-api": Modernizr.fullscreen,
		"gamepad": Modernizr.gamepads,
		"geolocation": Modernizr.geolocation,
		"hashchange": Modernizr.hashchange,
		"history": Modernizr.history,
		"ie8compat": Modernizr.ie8compat,
		"indexedDB": Modernizr.indexeddb,
		"input": Modernizr.input,
		"inputtypes": Modernizr.inputtypes,
		"json": Modernizr.json,
		"lists-reversed": Modernizr.olreversed,
		"mathml": Modernizr.mathml,
		"notification": Modernizr.notification,
		"pagevisibility-api": Modernizr.pagevisibility,
		"performance": Modernizr.performance,
		"pointerevents": Modernizr.pointerevents,
		"pointerlock-api": Modernizr.pointerlock,
		"postmessage": Modernizr.postmessage,
		"quota-management-api": Modernizr.quotamanagement,
		"requestanimationframe": Modernizr.requestanimationframe,
		"svg": Modernizr.svg,
		"touchevents": Modernizr.touchevents,
		"typed-arrays": Modernizr.typedarrays,
		"unicode": Modernizr.unicode,
		"userdata": Modernizr.userdata,
		"vibration": Modernizr.vibrate,
		"video": Modernizr.video,
		"web-intents": Modernizr.webintents,
		"webgl": Modernizr.webgl,
		"websockets": Modernizr.websockets
	},
	"a": {
		"download": Modernizr.adownload
	},
	"audio": {
		"audiodata": Modernizr.audiodata,
		"loop": Modernizr.audioloop,
		"preload": Modernizr.audiopreload,
		"webaudio": Modernizr.webaudio
	},
	"battery": {
		"lowbattery": Modernizr.lowbattery
	},
	"canvas": {
		"todataurl": [
			Modernizr["todataurljpeg"],
			Modernizr["todataurlpng"],
			Modernizr["todataurlwebp"]
		]
	},
	"css": {
		"animations": Modernizr.cssanimations,
		"backgroundposition-shorthand": Modernizr.bgpositionshorthand,
		"backgroundposition-xy": Modernizr.bgpositionxy,
		"backgroundrepeat": [
			Modernizr["bgrepeatspace"],
			Modernizr["bgrepeatround"]
		],
		"backgroundsize": Modernizr.backgroundsize,
		"backgroundsizecover": Modernizr.bgsizecover,
		"borderimage": Modernizr.borderimage,
		"borderradius": Modernizr.borderradius,
		"boxshadow": Modernizr.boxshadow,
		"boxsizing": Modernizr.boxsizing,
		"calc": Modernizr.csscalc,
		"checked": Modernizr.checked,
		"columns": Modernizr.csscolumns,
		"cubicbezierrange": Modernizr.cubicbezierrange,
		"displayrunin": Modernizr["display-runin"],
		"displaytable": Modernizr["display-table"],
		"filters": Modernizr.cssfilters,
		"flexbox": Modernizr.flexbox,
		"flexboxlegacy": Modernizr.flexboxlegacy,
		"flexboxtweener": Modernizr.flexboxtweener,
		"fontface": Modernizr.fontface,
		"generatedcontent": Modernizr.generatedcontent,
		"gradients": Modernizr.cssgradients,
		"hsla": Modernizr.hsla,
		"hyphens": [
			Modernizr["csshyphens"],
			Modernizr["softhyphens"],
			Modernizr["softhyphensfind"]
		],
		"lastchild": Modernizr.lastchild,
		"mask": Modernizr.cssmask,
		"mediaqueries": Modernizr.mediaqueries,
		"multiplebgs": Modernizr.multiplebgs,
		"nthchild": Modernizr.nthchild,
		"objectfit": Modernizr.objectfit,
		"opacity": Modernizr.opacity,
		"overflow-scrolling": Modernizr.overflowscrolling,
		"pointerevents": Modernizr.csspointerevents,
		"positionsticky": Modernizr.csspositionsticky,
		"pseudoanimations": Modernizr.csspseudoanimations,
		"pseudotransitions": Modernizr.csspseudotransitions,
		"reflections": Modernizr.cssreflections,
		"regions": Modernizr.regions,
		"remunit": Modernizr.cssremunit,
		"resize": Modernizr.cssresize,
		"rgba": Modernizr.rgba,
		"scrollbars": Modernizr.cssscrollbar,
		"shapes": Modernizr.shapes,
		"siblinggeneral": Modernizr.siblinggeneral,
		"subpixelfont": Modernizr.subpixelfont,
		"supports": Modernizr.supports,
		"textshadow": Modernizr.textshadow,
		"transforms": Modernizr.csstransforms,
		"transforms3d": Modernizr.csstransforms3d,
		"transitions": Modernizr.csstransitions,
		"userselect": Modernizr.userselect,
		"vhunit": Modernizr.cssvhunit,
		"vmaxunit": Modernizr.cssvmaxunit,
		"vminunit": Modernizr.cssvminunit,
		"vwunit": Modernizr.cssvwunit,
		"wrapflow": Modernizr.wrapflow
	},
	"dom": {
		"classlist": Modernizr.classlist,
		"createElement-attrs": [
			Modernizr["createelementattrs"],
			Modernizr["createelement-attrs"]
		],
		"dataset": Modernizr.dataset,
		"microdata": Modernizr.microdata
	},
	"elem": {
		"datalist": Modernizr.datalistelem,
		"details": Modernizr.details,
		"output": Modernizr.outputelem,
		"progress-meter": [
			Modernizr["progressbar"],
			Modernizr["meter"]
		],
		"ruby": Modernizr.ruby,
		"template": Modernizr.template,
		"time": Modernizr.time,
		"track": [
			Modernizr["texttrackapi"],
			Modernizr["track"]
		]
	},
	"es5": {
		"array": Modernizr.es5array,
		"date": Modernizr.es5date,
		"function": Modernizr.es5function,
		"object": Modernizr.es5object,
		"strictmode": Modernizr.strictmode,
		"string": Modernizr.es5string
	},
	"es6": {
		"contains": Modernizr.contains
	},
	"event": {
		"deviceorientation-motion": [
			Modernizr["devicemotion"],
			Modernizr["deviceorientation"]
		]
	},
	"file": {
		"api": Modernizr.filereader,
		"filesystem": Modernizr.filesystem
	},
	"forms": {
		"capture": Modernizr.capture,
		"fileinput": Modernizr.fileinput,
		"formattribute": Modernizr.formattribute,
		"inputnumber-l10n": Modernizr.localizednumber,
		"placeholder": Modernizr.placeholder,
		"requestautocomplete": Modernizr.requestautocomplete,
		"speechinput": Modernizr.speechinput,
		"validation": Modernizr.formvalidation
	},
	"iframe": {
		"sandbox": Modernizr.sandbox,
		"seamless": Modernizr.seamless,
		"srcdoc": Modernizr.srcdoc
	},
	"img": {
		"apng": Modernizr.apng,
		"webp-lossless": [
			Modernizr["webplossless"],
			Modernizr["webp-lossless"]
		],
		"webp": Modernizr.webp
	},
	"network": {
		"connection": Modernizr.lowbandwidth,
		"eventsource": Modernizr.eventsource,
		"xhr2": Modernizr.xhr2
	},
	"script": {
		"async": Modernizr.scriptasync,
		"defer": Modernizr.scriptdefer
	},
	"storage": {
		"localstorage": Modernizr.localstorage,
		"sessionstorage": Modernizr.sessionstorage,
		"websqldatabase": Modernizr.websqldatabase
	},
	"style": {
		"scoped": Modernizr.stylescoped
	},
	"svg": {
		"asimg": Modernizr.svgasimg,
		"clippaths": Modernizr.svgclippaths,
		"filters": Modernizr.svgfilters,
		"inline": Modernizr.inlinesvg,
		"smil": Modernizr.smil
	},
	"url": {
		"data-uri": Modernizr.datauri
	},
	"video": {
		"autoplay": Modernizr.videoautoplay,
		"loop": Modernizr.videoloop,
		"preload": Modernizr.videopreload
	},
	"webgl": {
		"extensions": Modernizr.webglextensions
	},
	"webrtc": {
		"getusermedia": Modernizr.getusermedia,
		"peerconnection": Modernizr.peerconnection
	},
	"websockets": {
		"binary": Modernizr.websocketsbinary
	},
	"window": {
		"framed": Modernizr.framed
	},
	"workers": {
		"blobworkers": Modernizr.blobworkers,
		"dataworkers": Modernizr.dataworkers,
		"sharedworkers": Modernizr.sharedworkers,
		"webworkers": Modernizr.webworkers
	}
};