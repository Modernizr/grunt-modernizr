/* jshint sub: true */

var Modernizr = window.Modernizr;

var tests = {
	"standalone": {
		"audio": Modernizr.audio,
		"touchevents": Modernizr.touchevents,
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
		"mask": Modernizr.lastchild,
		"mediaqueries": Modernizr.mediaqueries,
		"multiplebgs": Modernizr.multiplebgs,
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
	"svg": {
		"asimg": Modernizr.svgasimg
	},
	"video": {
		"autoplay": Modernizr.videoautoplay,
		"loop": Modernizr.videoloop,
		"preload": Modernizr.videopreload
	}
};