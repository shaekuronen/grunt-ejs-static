# grunt-ejs-static

Compile static html from ejs templates

Files to render are defined in JSON.  Layout is defined using EJS Includes.

Plugin includes a basic demo in demo/

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

If layout paths are specified in data.json (recommended), not necessary.  If layout paths are not specified, ejs_static falls back to searching the dir specified by path_to_layouts.

If there is global data in the data.json file, then global_data option necessary.  If no global data, not necessary.     

```js
grunt.initConfig({

    ejs_static: {
      preview: {
        options: {
          dest: 'preview',
          path_to_data: 'demo/dev/data/data.json',
          path_to_layouts: 'demo/dev/layouts',
          global_data: 'global'
        }
      },
      optimize: {
        options: {
          dest: 'production',
          path_to_data: 'demo/dev/data/data.json',
          path_to_layouts: 'demo/dev/layouts',
          global_data: 'global'
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

#### options.global_data
Optional
Type: `String`

Global data can be included.  To include, add into data.json   

#### options.index_page
Optional
Type: `String`

This sets the index page for the site 

#### options.parent_dirs
Optional
Type: `Boolean`

This defines how files are output.

If true, files are output as <key>.html (for example, about.html)

If false, files are output as <key>/index.html (for example, about/index.html)

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

This builds EJS templates as html into demo/preview/ from layout files in demo/dev/pages/ (see demo/dev/pages/home/index.html for an example of layout using EJS includes)

To demo optimizing the site for deployment to production

```shell
grunt optimize
```

This builds static html into demo/production/ 

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
### 0.3.0 
* Complete rewrite.  More flexible, less opinionated.
* Now data-driven. Files to be rendered are defined in JSON file, not in the file structure
* Backwards compatible, though ejs_static options need to be updated in Gruntfile
* Adds options: parent_dirs, underscores_to_dashes, file_extension, global_data

### 0.2.0
* Added a way to get site-wide variables into the models for individual layouts.
* Added logging of debugging information to show what is happening in the task.
