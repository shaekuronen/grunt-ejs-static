/*
 * grunt-ejs-static
 * https://github.com/shaekuronen/grunt-ejs-static
 *
 * Copyright (c) 2013 Shae Kuronen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // create grunt multitask
  grunt.registerMultiTask('ejs_static', 'Render EJS templates as static HTML.', function() {

    // get ejs_static methods
    var ejs_static = require('../lib/ejs_static');

    // get underscore
    var _ = require('underscore');

    // set defaults for options
    var options = this.options({
      dest: 'dist',
      parent_dirs: false,
      file_extension: '.html',
      underscores_to_dashes: true,
      underscore: true
    });

    // helper functions

    // create a global object to attach any helper functions to
    var helpers_global = {};

    if (options.helpers) {
      // process specified helper functions
      var helpers = ejs_static.get_helper_functions(options);
      // add them to the global object
      _.extend(helpers_global, helpers);
      grunt.log.debug('helpers are ' + helpers);
    } else {
      grunt.log.debug('no helper functions in options object');
    }

    // make underscore available in the templates
    if (options.underscore === true) {
      _.extend(helpers_global, _);
    } else {
      grunt.log.debug('options.underscore not set to Boolean true');
    }

    // end helper functions


    // get the files to render, which are declared in the options.path_to_data JSON file
    var files = ejs_static.get_files(options);

    // iterate through the files
    Object.keys(files).forEach(function(key) {

      // get the data specified for the file
      var file_data = ejs_static.get_data(key, files);

      // get the layout specified for the file
      var layout_data = ejs_static.get_layout(key, files, options);

      // render the file
      var rendered_file = ejs_static.render_file(layout_data, file_data, helpers_global);

      // write the file to the destination directory
      ejs_static.write_file(key, files, rendered_file, options);

    });

  });

};
