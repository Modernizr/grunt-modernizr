# grunt-modernizr

[![Build Status](https://travis-ci.org/Modernizr/grunt-modernizr.png?branch=master,develop)](https://travis-ci.org/Modernizr/grunt-modernizr)

##### *tl;dr:* `grunt-modernizr` crawls through your project files, gathers up your references to Modernizr tests and outputs a lean, mean Modernizr machine.

`grunt-modernizr` is a Modernizr builder for your project. It is based on the Modernizr team's [Modulizr](https://github.com/Modernizr/modernizr.com/blob/gh-pages/i/js/modulizr.js) tool.

This highly configurable task allows you to configure and export a custom Modernizr build. Use Modernizr's [annotated source](http://modernizr.com/downloads/modernizr-latest.js) for development, and let this tool worry about optimization.

When you're ready to build, `grunt-modernizr` will crawl your project for Modernizr test references and save out a minified, uglified, customized version using only the tests you've used in your JavaScript or (S)CSS.

## Getting Started
Install this grunt plugin next to your project's [Gruntfile.js][getting_started] with: `npm install grunt-modernizr`

Then add this line to your project's `Gruntfile.js`:

```javascript
grunt.loadNpmTasks("grunt-modernizr");
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

### Command Line

Run the task with `grunt modernizr`.

### Config Options

Add a `modernizr` config object to your Gruntfile.js file. The task supports multiple targets:

```javascript
modernizr: {

	dist: {
		// Path to the build you're using for development.
		"devFile" : "lib/modernizr-dev.js",

		// Path to save out the built file
		"dest" : "build/modernizr-custom.js",

		// Based on default settings on http://modernizr.com/download/
		"options" : [
			"setClasses",
			"addTest",
			"html5printshiv",
			"load",
			"testProp",
			"fnBind"
		],

		// By default, source is uglified before saving
		"uglify" : true,

		// Define any tests you want to explicitly include
		"tests" : [],

		// Useful for excluding any tests that grunt-modernizr will match
		// e.g. you use .notification class for notification elements,
		// but don’t want the test for Notification API
		"excludeTests": [],

		// By default, will crawl your project for references to Modernizr tests
		// Set to false to disable
		"crawl" : true,

		// By default, this task will crawl all *.js, *.css, *.scss files.
		"files" : [
			"**/*.{js,css,scss}",
			"!node_modules/**/*",
			"!{Gruntfile,grunt}.js"
		],

		// Have custom Modernizr tests? Add them here.
		"customTests" : []
	}

}
```

#### Required

###### **`devFile`** (String)
Path to the local build file you're using for development. This parameter is needed so `grunt-modernizr` can skip your dev file when traversing your project to avoid triggering false positives. If you're using a remote file for development, set this option to `remote`. If you do not have a local devFile, set this option to `false`.

#### Optional

###### **`dest`** (String)
Path to save the customized Modernizr build. It defaults to `lib/modernizr-custom.js`.

###### **`options`** (Object)
An object of extra configuration options. Check the extra section on [modernizr.com/download](http://modernizr.com/download/) for complete options. Defaults are as they appear on the official site.

###### **`uglify`** (Boolean)
By default, the source is uglified before save. Set to false to disable.

###### **`tests`** (Array)
Define any tests you want to explicitly include. Check out the full set of test options [here](#ADD_LINK_LATER).

###### **`excludeTests`**
Useful for excluding any tests that `grunt-modernizr` will match. (e.g. you use .notification class for notification elements, but don’t want the test for Notification API).

###### **`crawl`** (Boolean)
By default, this task will crawl your project for references to Modernizr tests. Set to false to disable.

###### **`files`** (Array)
When `crawl` = `true`, this task will crawl all `*.js`, `*.css`, `*.scss` files. You can override this by defining a custom `files` array. The object supports all [minimatch](https://github.com/isaacs/minimatch) options.

###### **`customTests`** (Array)
Have custom Modernizr tests? Add paths to their location here. The object supports all [minimatch](https://github.com/isaacs/minimatch) options.

## License
Copyright (c) 2013 Richard Herrera
Licensed under the MIT license.
