# grunt-ejs-static

Grunt EJS Static is an MVC approach to building a static site generator using EJS and Grunt.  Models are defined in multiple JSON files, which helps keep logic out of the templates and makes the data more maintainable.  Views are defined in layout files, which are top-level templates utilizing EJS Includes to manage templates.  The controller is a JSON file (such as routes.json) which defines files to render, as well as each file's layout and data.   

For examples, please see demo/

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

Conditionally required options are path_to_layouts.  

If layout paths are specified in data.json (recommended), options.path_to_layouts is not necessary.  

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


### Usage Examples

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
