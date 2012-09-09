# grunt-modernizr

Build out a lean, mean Modernizr machine.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-modernizr`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks("grunt-modernizr");
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

Add a `modernizr` config object to your grunt.js file:

```javascript
modernizr: {
	// Based on default settings on http://modernizr.com/download/
	"extra" : {
		"shiv" : true,
		"printshiv" : false,
		"load" : true,
		"mq" : false,
		"cssclasses" : true
	},

	// Based on default settings on http://modernizr.com/download/
	"extensibility" : {
		"addtest" : false,
		"prefixed" : false,
		"teststyles" : false,
		"testprops" : false,
		"testallprops" : false,
		"hasevents" : false,
		"prefixes" : false,
		"domprefixes" : false
	},

	// Define any tests you want to impliticly include
	"tests" : [],

	// Path to the build you're using for development.
	"devFile" : "lib/modernizr-dev.js",

	// Path to save out the built file
	"outputFile" : "build/modernizr-custom.js",

	// By default, this task will crawl your project for references to Modernizr tests
	// Set to false to disable
	"parseFiles" : true,

	// When parseFiles = true, this task will crawl all *.js, *.css files.
	// You can override this by defining a "files" array below
	// files : [],

	// Have custom Modernizr tests? Add paths to their location here.
	"customTests" : [],

	// Files added here will be excluded when looking for Modernizr refs.
	"excludeFiles" : []
}
```

### Config Options

###### **`extra`** (Object)
An object of extra configuration options. Check the extra section on [modernizr.com/download](http://modernizr.com/download/) for complete options. Defaults are as they appear on the official site.

###### **`extensibility`** (Object)
An object of extensibility options. Check the section on [modernizr.com/download](http://modernizr.com/download/) for complete options. Defaults are as they appear on the official site.

###### **`tests`** (Array)
Define any tests you want to impliticly include. Test names are lowercased, separated by underscores (if needed). Check out the full set of test options [here](https://github.com/Modernizr/modernizr.com/blob/gh-pages/i/js/modulizr.js#L15-157).

###### **`devFile`** (String)
Path to the build file you're using for development.

###### **`outputFile`** (String)
Path to save the customized Modernizr build.

###### **`parseFiles`** (Boolean)
By default, this task will crawl your project for references to Modernizr tests. Set to false to disable.

###### **`files`** (Array)
When `parseFiles` = `true`, this task will crawl all `*.js`, `*.css` files. You can override this by defining a custom `files` array below. The object supports all [minimatch](https://github.com/isaacs/minimatch) options.

###### **`customTests`** (Array)
Have custom Modernizr tests? Add paths to their location here. The object supports all [minimatch](https://github.com/isaacs/minimatch) options.

###### **`excludeFiles`** (Array)
Files added here will be excluded when looking for Modernizr refs. The object supports all [minimatch](https://github.com/isaacs/minimatch) options.

## License
Copyright (c) 2012 Richard Herrera
Licensed under the MIT license.
