# grunt-ejs-static

Compile static html from ejs templates

This plugin includes a basic example

For a static site generator &#8212; built as a grunt-init template &#8212; utilizing grunt-ejs-static, see [Spandex](https://github.com/shaekuronen/spandex)

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

The json data to populate EJS templates. The parent directory of a layout manager is used as the key into the JSON file and is case-sensitive. There must be an entry in the json data for each layout manager.

The JSON element with the empty string as its name is injected into all the other objects as the `global` property.

### Files

#### files.dest
Type: `String`

Sets the destination directory that static html is built into (example/preview/)

#### files.src
Type: `String`

The files to be iterated through to find layout managers.  Can use globbing. (example/dev/pages/**/index.html)

### Usage Examples

To demo how grunt-ejs-static works

```shell
git clone https://github.com/shaekuronen/grunt-ejs-static.git

cd grunt-ejs-static

grunt preview
```

This builds EJS templates as html into example/preview/ from layout manager files in example/dev/pages/ (see example/dev/pages/home/index.html for example of layout using EJS includes)

To demo optimizing the site for deployment to production

```shell
grunt optimize
```

This builds static html into example/production/ 

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
### 0.2.0 
* Added a way to get site-wide variables into the models for individual layouts.
* Added logging of debugging information to show what is happening in the task.
