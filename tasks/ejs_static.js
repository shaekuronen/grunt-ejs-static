/*
 * grunt-ejs-static
 * https://github.com/shaekuronen/grunt-ejs-static
 *
 * Copyright (c) 2013 Shae Kuronen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var ejs = require('ejs');
  var path = require('path');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('ejs_static', 'Render EJS templates as static HTML.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    var the_data = grunt.file.readJSON(options.data);

    // iterate over all specified files
    this.files.forEach(function(f) {

      f.src.filter(function(filepath) {

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })
      .forEach(function(filepath) {

        // get the parent directory of layout manager
        var the_parent_directory = get_parent_directory(filepath);

        // get the path to the parent directory
        var the_path_to_rendered_template = get_path_to_rendered_template(filepath, options.src, options.dest);

        // get the template
        var the_template = grunt.file.read(filepath);

        // get the data using bracket notation so it's possible for the identifier to start with a number
        var this_data = the_data[the_parent_directory];

        // set the base dir for includes
        // tj uses filename to set base dir for includes in ejs.js
        // which make the include relative to the file
        // see resolveInclude() in visionmedia/ejs/lib/ejs.js
        // this sets the include relative to base dir defined in ejs_static options
        // vs setting the include relative to the file which is the default behavior in ejs.js
        this_data.filename = options.src + "index.html";  

        // render the template as html
        var the_rendered_template = ejs.render(the_template, this_data);

        // check to see if the current file is specified as the root index.html page
        if (filepath === options.index_page) {

          // write the compiled template to the document root
          grunt.file.write(options.dest + 'index.html', the_rendered_template);

        } else {

          // write the compiled template to the destination directory
          grunt.file.write(the_path_to_rendered_template, the_rendered_template);

        }

      });

    });
    // end iterate over all specified files

    // get the parent directory of layout manager 
    function get_parent_directory(path_to_file) {

        var tokens = [];

        tokens = path_to_file.split('/');

        // remove the index.html file from array
        var the_file = tokens.splice(-1, 2);

        var the_parent_directory = tokens.pop();

        return the_parent_directory;

    }
    // end get the parent directory of layout manager

    // get the path to the rendered template
    function get_path_to_rendered_template(path_to_file, path_to_source, destination) {

      // remove src (options.src) from beginning of path
      var path_to_rendered_template = path_to_file.replace(path_to_source, "");

      // add destination (options.dest) to beginning of path
      path_to_rendered_template = destination + path_to_rendered_template;

      return path_to_rendered_template;     
      
    }
    // end get the path to the rendered template

  });

};
