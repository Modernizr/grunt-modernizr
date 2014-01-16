[![Build Status](https://travis-ci.org/doctyper/gulp-modernizr.png?branch=master,develop)](https://travis-ci.org/doctyper/gulp-modernizr)

# grunt-modernizr
A [Grunt](http://gruntjs.com/) wrapper for [Modernizr](https://github.com/doctyper/customizr).

## Usage
Install this grunt plugin next to your project's [Gruntfile.js][getting_started]:

```shell
npm install grunt-modernizr --save
```

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
		// Path to save out the built file
		"dest" : "build/modernizr-custom.js",

		// More settings go here
	}

}
```

#### Available Settings
##### See the [customizr repository](https://github.com/doctyper/customizr#config-file) for valid settings.

[modernizr-travis-url]: http://travis-ci.org/doctyper/gulp-modernizr
[modernizr-travis-image]: https://secure.travis-ci.org/doctyper/gulp-modernizr.png?branch=master
<!---
[modernizr-npm-url]: https://npmjs.org/package/gulp-modernizr
[modernizr-npm-image]: https://badge.fury.io/js/gulp-modernizr.png
-->

## License
Copyright (c) 2013 Richard Herrera
Licensed under the MIT license.
