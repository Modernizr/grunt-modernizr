# grunt-modernizr

[![Build Status](https://secure.travis-ci.org/Modernizr/grunt-modernizr.png?branch=master,develop)](https://travis-ci.org/Modernizr/grunt-modernizr)

[![NPM](https://nodei.co/npm/grunt-modernizr.png?compact=true)](https://nodei.co/npm/grunt-modernizr/)

A [Grunt](http://gruntjs.com/) wrapper for [Modernizr](https://github.com/doctyper/customizr).

## Usage
Install this grunt plugin next to your project's [Gruntfile.js][getting_started]:

When you're ready to build, `grunt-modernizr` will crawl your project for Modernizr test references and save out a minified, uglified, customized version using only the tests you've used in your JavaScript or (S)CSS.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with:

```bash
npm install grunt-modernizr --save-dev
```

Then add this line to your project's `Gruntfile.js`:

```javascript
grunt.loadNpmTasks("grunt-modernizr");
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

### For Full Features & Configuration? → [See Customizr](https://github.com/doctyper/customizr#config-file)

### From the Command Line

Run the task with `grunt modernizr:dist`.

### Basic Grunt Config Example - Crawl Project (Default)
Crawls your project for modernizr tests and adds the ones found to your custom build. Add this to your Gruntfile.js file:

```javascript
modernizr: {
	{
    // Path to save out the built file
    "dest" : "build/modernizr-custom.js",
	}
}
```

### Basic Grunt Config Example - Custom Tests
Adds css classes on the body element for specified tests. Add this to your Gruntfile.js file:

```javascript
modernizr: {
	{
    // Path to save out the built file
    "dest" : "build/modernizr-custom.js",

    // Based on default settings on http://modernizr.com/download/
    "options" : [
        "setClasses"
    ],

    // Define any tests you want to explicitly include
    "tests" : [
		'touchevents',
		'css/flexbox',
        'css/flexboxlegacy',
		'forms/placeholder'
	],

    // By default, will crawl your project for references to Modernizr tests
    // Set to false to disable
    "crawl" : false,
	}
}
```
### Automatically Generate Grunt Configuration
You can also generate the configuration file online via the [modernizr build tool](https://modernizr.com/download).
Just configure your build, click the Build button, and download/copy the Grunt Config.

## License
Copyright (c) 2015 Richard Herrera
Licensed under the MIT license.
