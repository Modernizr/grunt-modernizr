# grunt-modernizr

[![Build Status](https://github.com/Modernizr/grunt-modernizr/actions/workflows/testing.yml/badge.svg)](https://github.com/Modernizr/grunt-modernizr/actions/workflows/testing.yml)
[![npm version](https://badge.fury.io/js/grunt-modernizr.svg)](https://badge.fury.io/js/grunt-modernizr)

A [Grunt](http://gruntjs.com/) wrapper for [Modernizr](https://github.com/Modernizr/Modernizr).

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

## Documentation

### For Full Features & Configuration? → [See Customizr](https://github.com/modernizr/customizr#config-file)

Run the task with `grunt modernizr:dist`.

### Config Options

Add a `modernizr` config object to your Gruntfile.js file. The task supports multiple targets:

```javascript
modernizr: {
  dist: {
    "parseFiles": true,
    "customTests": [],
    "devFile": "/PATH/TO/modernizr-dev.js",
    "dest": "/PATH/TO/modernizr-output.js",
    "tests": [
      // Tests
    ],
    "options": [
      "setClasses"
    ],
    "uglify": true
  }
}
```

You can also generate the configuration file online via the [modernizr build tool](https://modernizr.com/download).
Just configure your build, click the Build button, and download/copy the Grunt Config.

#### Available Settings
##### See the [customizr repository](https://github.com/Modernizr/customizr#config-file) for valid settings.

## License
Copyright (c) 2022 The Modernizr team
Licensed under the MIT license.
