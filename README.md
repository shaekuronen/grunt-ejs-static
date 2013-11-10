# grunt-ejs-static

[![Build Status](https://travis-ci.org/shaekuronen/grunt-ejs-static.png?branch=master)](https://travis-ci.org/shaekuronen/grunt-ejs-static)

Grunt EJS Static takes an MVC approach to building a static site generator using EJS and Grunt.

Models can be defined in multiple JSON files, which helps keep logic out of the templates and the data more maintainable.

Views are defined in layout files, which are top-level templates utilizing EJS Includes to manage layout.

The controller is a JSON file (such as routes.json) which defines files to render, as well as each file's layout and any additional data needed for rendering.

For examples, please see demo/ and Usage section below.

There is also a project boilerplate available [grunt-ejs-static-boilerplate](https://github.com/shaekuronen/grunt-ejs-static-boilerplate)

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

The required options are dest and path_to_data.

Conditionally required options are path_to_layouts.  If options.path_to_layouts is specified, layout can be specified in the controller json (such as routes.json).

If path_to_layout is specified in routes.json, options.path_to_layouts is not necessary.  This option does not work well with grunt-usemin, so if you're using it may be better to specify options.path_to_layouts + layout in controller json file.

Important note:  to use a layout for multiple pages, there are two methods.  One is to specify path_to_layout in routes.json.  The other is to specify options.path_to_layouts + layout in controller json file.

If layout paths are not specified, ejs_static falls back to searching the dir specified in options.path_to_layouts.

```js
grunt.initConfig({

    ejs_static: {
      preview: {
        options: {
          dest: 'preview',
          path_to_data: 'demo/dev/data/data.json',
          path_to_layouts: 'demo/dev/layouts',
          index_page: 'home',
          parent_dirs: false,
          underscores_to_dashes: true,
          file_extension: '.html'
        }
      },
      optimize: {
        options: {
          dest: 'production',
          path_to_data: 'demo/dev/data/data.json',
          path_to_layouts: 'demo/dev/layouts',
          index_page: 'home',
          parent_dirs: true,
          underscores_to_dashes: true,
          file_extension: '.html'
        }
      }
    },

})
```

### Usage
Files to render in `routes.json` (this is options.path_to_data in Gruntfile)
```json
{
  "home": {
    "path_to_layout": "dev/layouts/home.ejs",
    "path_to_data": [
      "dev/data/global.json",
      {"dev/data/meta.json": "home"}
    ]
  }
}
```
Additional data from `global.json`
```json
{
  "site_name": "Grunt EJS Static",
  "google_analytics": "XOXOXO"
}
```
Additional data from `meta.json`
```json
{
  "home": {
    "title": "Grunt EJS Static | Home",
    "description": "The demo page for Grunt EJS Static",
    "keywords": "gruntplugin, ejs, static html, static site generator, templates, templating engine, template, embedded js"
  }
}
```
Generates this JSON data model
```json
{
  "global": {
    "site_name": "Grunt EJS Static",
    "google_analytics": "XOXOXO"
  },
  "meta": {
    "title": "Home",
    "description": "The demo page for Grunt EJS Static",
    "keywords": "gruntplugin, ejs, static html, static site generator, templates, templating engine, template, embedded js"
  }
}
```
Layout defined in `home.ejs`
```js
<% include ../templates/global/head %>

<% include ../templates/global/header %>

<% include ../templates/home/hero %>

<% include ../templates/home/body %>

<% include ../templates/global/footer %>
```
Which includes templates like `head.ejs`
```html
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

  <head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title><%= global.site_name %> | <%= meta.title %></title>
    <meta name="<%= meta.description %>" content="">
    <meta name="<%= meta.keywords %>" content="" >

    <!-- css -->
    <link rel="stylesheet" href="/css/main.css">
    <!-- end css -->

    <!-- modernizr -->
    <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    <!-- end modernizr -->

    <!-- google analytics -->
    <script>
      var _gaq=[['_setAccount','<%= global.google_analytics %>'],['_trackPageview']];
      (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
      s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
    <!-- end google analytics -->

  </head>
```

Outputs this HTML
```html
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

  <head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title>Grunt EJS Static | Home</title>
    <meta name="The demo page for Grunt EJS Static" content="">
    <meta name="gruntplugin, ejs, static html, static site generator, templates, templating engine, template, embedded js" content="" >

    <!-- css -->
    <link rel="stylesheet" href="/css/main.css">
    <!-- end css -->

    <!-- modernizr -->
    <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    <!-- end modernizr -->

    <!-- google analytics -->
    <script>
      var _gaq=[['_setAccount','XOXOXO'],['_trackPageview']];
      (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
      s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
    <!-- end google analytics -->

  </head>


  <body>

    <!-- hero here -->

    <!-- body content here -->

  <!-- footer -->
  <div class="container">

    <footer>
        <p>&copy; Company 2012</p>
    </footer>

  </div>
  <!-- end footer -->

  <script src="js/main.js"></script>

  </body>
</html>
```


### Options

#### options.dest
Required
Type: `String`

Files are rendered into this directory

#### options.path_to_data
Required
Type: `String`

This is the path to the JSON file that determines what files are rendered

#### options.path_to_layouts
Optional
Type: `String`

This is the path to the layout files directory

#### options.index_page
Optional
Type: `String`

This sets the index page for the site

#### options.parent_dirs
Optional
Type: `Boolean`

This defines how files are output.

If true, files are output as filename.html (for example, about.html)

If false, files are output as filename/index.html (for example, about/index.html)

#### options.underscores_to_dashes
Optional
Type: `Boolean`

Filenames are defined in data.json as the key

If true, any underscores in the key are converted to dashes

If false, underscores are not converted

#### options.file_extension
Optional
Type: `String`

This defines the file extension of rendered files

Defaults to .html, but could be .php, .aspx, etc


### Examples

To demo how grunt-ejs-static works

```shell
git clone https://github.com/shaekuronen/grunt-ejs-static.git

cd grunt-ejs-static

grunt preview
```

This builds EJS templates as html into demo/preview/ from layout files in demo/dev/layouts/ (see demo/dev/layouts/home.ejs for an example of layout using EJS includes)

To demo optimizing the site for deployment to production

```shell
grunt optimize
```

This builds static html into demo/production/

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
### 0.3.7
* Added dashed_file_name variable to make easier to include page name into CSS.
* Added option to specify layout (vs. path_to_layout) in controller json file. This can be used in combination with path_to_layouts, which is specified in Gruntfile ejs_static options.

### 0.3.5
* Added file_name variable to allow template extension.
* See discussion on [Github](https://github.com/shaekuronen/grunt-ejs-static/issues/2).

### 0.3.2
* Moved logic into modules.
* Improved management of data files. Combine files, or parse for a specific key, prior to rendering.

### 0.3.0
* Complete rewrite.  More flexible, less opinionated.
* Now data-driven. Files to be rendered are defined in JSON file, not in the file structure.
* Backwards compatible, though ejs_static options need to be updated in Gruntfile.
* Added options: parent_dirs, underscores_to_dashes, file_extension, global_data.

### 0.2.0
* Added a way to get site-wide variables into the models for individual layouts.
* Added logging of debugging information to show what is happening in the task.
