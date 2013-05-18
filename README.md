# grunt-ejs-static

> Compile static html from ejs templates

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ejs-static --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ejs-static');
```

## The "ejs_static" task

### Overview
In your project's Gruntfile, add a section named `ejs_static` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
ejs_static: {
  preview: {
    options: {
      src: 'example/dev/',
      layout_src: 'example/dev/pages/',
      index_page: 'example/dev/pages/home/index.html',
      data: 'example/dev/data/pages.json'
    },
    files: {
      'example/preview/': 'example/dev/pages/**/index.html'
    },
  },
  optimize: {
    options: {
      src: 'example/production/',
      layout_src: 'example/production/pages/',
      index_page: 'example/production/pages/home/index.html',
      data: 'example/production/data/pages.json'
    },
    files: {
      'example/production/': 'example/production/pages/**/index.html'
    },
  }
}
})
```

### Options

#### options.src
Type: `String`

This is the development directory (example/dev/)

#### options.layout_src
Type: `String`

The directory where layout manager files are located (index.html files in example/dev/pages/)

#### options.index_page
Type: `String`

This sets the index page for the site (example/dev/pages/home/index.html)

#### options.data
Type: `String`

The json data to populate EJS templates

### Files

#### files.dest
Type: `String`

Sets the destination directory that static html is built into (example/preview/)

#### files.src
Type: `String`

The files to be iterated through to find layout managers.  Can use globbing. (example/dev/pages/**/index.html)

### Usage Examples

To demo how grunt-ejs-static works
-- git clone https://github.com/shaekuronen/grunt-ejs-static.git
-- cd grunt-ejs-static
-- grunt preview

This builds the static html into example/preview/ using EJS from layout manager files in example/dev/pages/

To demo optimizing the site for deployment to production, run "grunt optimize" from command line.  This builds static html into example/production/ 

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
