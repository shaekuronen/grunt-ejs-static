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

  // create grunt multitask
  grunt.registerMultiTask('ejs_static', 'Render EJS templates as static HTML.', function() {

    // set defaults for options
    var options = this.options({
      dest: 'preview',
      parent_dirs: false,
      file_extension: '.html',
      underscores_to_dashes: true
    });

    grunt.log.debug(path.sep);

    // override path.sep if needed
    if (options.path_separator) {
      path.sep = options.path_separator;
      grunt.log.debug('path.sep is now: ' + path.sep);
    }
    // end override path.sep if needed

    // get data specified in ejs_static options
    if (options.path_to_data) {

      var data = grunt.file.readJSON(options.path_to_data);
      grunt.log.debug('Data successfully imported');

      // parse global data out from main data
      // this allows global data to be attached to the file data before rendering template
      if (options.global_data) {
        var global_data = data[options.global_data];
      } else {
        grunt.log.debug('global data not set');
      }
      
    } else {

      grunt.fail.warn('The path_to_data option is required, please specify in Gruntfile');
      return false;

    }
    // end get data specified in ejs_static options

    // iterate through items in data file
    // http://stackoverflow.com/questions/7440001/iterate-over-object-keys-in-node-js
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    function parse_data_file(data_object) {

      Object.keys(data_object).forEach(function(key) {

        path_to_layout_validator(key, data_object);

      });

    }
    // end iterate through items in data file

    // start the ejs_static task
    parse_data_file(data);
    // end start the ejs_static task

    // test for path_to_layout value for key in data.json
    function path_to_layout_validator(key, data_object) {

      var path_to_layout = path_to_layout_generator(key, data_object);

      if (path_to_layout) {
        create_files_router(key, data_object, path_to_layout);
      } else {
        grunt.log.debug('file NOT CREATED for key: ' + key);
      }

    }
    // end test for path_to_layout value for key in data.json

    // generate path to layout
    function path_to_layout_generator(key, data_object) {

      // if the key is global
      if ( key === options.global_data ) {

        grunt.log.debug('path_to_layout_validator: the key is global_data');
        return false;

      // if path_to_layout exists
      } else if (data_object[key].path_to_layout) {

        return data_object[key].path_to_layout;

      // if a layouts dir is specified
      } else if (options.path_to_layouts) {

        return search_layouts_dir(key);

      } else {
        grunt.fail.warn('A value for path_to_layout is required, please specify in data file for key: ' + key);
      }      

    }
    // end generate path to layout

    // search the layouts dir for a dir or file that matches key
    function search_layouts_dir(key) {

      var search_pattern1 = path.join(options.path_to_layouts, '**', key + '.ejs');
      grunt.log.debug('search pattern1 is ' + search_pattern1);

      var search_pattern2 = path.join(options.path_to_layouts, '**', key, 'index' + options.file_extension);
      grunt.log.debug('search pattern2 is ' + search_pattern2);

      var search_pattern3 = path.join(options.path_to_layouts, '**', key, 'index.ejs');
      grunt.log.debug('search pattern3 is ' + search_pattern3);

      var path_to_layout = grunt.file.expand(search_pattern1, search_pattern2, search_pattern3);

      // if exactly one path to layout is returned, return that path
      if (path_to_layout.length === 1) {

        grunt.log.debug('PATH TO LAYOUT is ' + path_to_layout);
        return path_to_layout;

      // if more than one path to layout is returned, throw error
      } else if (path_to_layout.length > 1) {

        var multiple_layout_paths = "";

        Object.keys(path_to_layout).forEach(function(key) {
          multiple_layout_paths += path_to_layout[key] + '\n';
        });

        grunt.fail.warn('More than 1 path to layout file was not found for key: ' + key + 
                        '\nThe paths found were: \n' + multiple_layout_paths + 
                        '\nResolve in the project dir structure and/or data file\n');

      // if no path to layout is returned, throw error
      } else {
        grunt.fail.warn('path to layout file was not found for key: ' + key);
      }

    }
    // end search the layouts dir for a dir or file that matches key

    // create dir structure and render templates as html
    function create_files_router(key, data_object, path_to_layout) {

      // if the page is the index page specified in ejs_static options
      if ( key === options.index_page ) {
        
        create_index_file(key, data_object, path_to_layout);

      // if the page is a category page, build the category dir structure
      } else if ( data_object[key].hasOwnProperty('category') ) {
        
        create_category_file(key, data_object, path_to_layout);

      // the page has no category and is therefore rendered at root level
      } else if ( !data_object[key].hasOwnProperty('category') ) {

        create_root_level_file(key, data_object, path_to_layout);

      } else {
        grunt.log.error('error in create_files_router() in ejs_static.js');
      }

    }
    // end create dir structure and render templates as html

    // create the index.html file specified in options
    function create_index_file(key, data_object, path_to_layout) {

      grunt.log.debug('the file is the index page');

      // create path to the rendered html file
      var path_to_file = path.join(options.dest, 'index' + options.file_extension),
          path_to_file = underscores_to_dashes(path_to_file);

      grunt.log.debug('path to html file is ' + path_to_file);

      // render the template
      render_template(key, data_object, path_to_file, path_to_layout); 

    }
    // end create the index.html file specified in options

    // create a file that is in a category
    function create_category_file(key, data_object, path_to_layout) {

      grunt.log.debug('the file is in a category');

      // if the parent_dirs option is true
      if (options.parent_dirs) {

        // create the file as an index.html file inside a parent directory
        var path_to_file = path.join(options.dest, data_object[key].category, key, 'index' + options.file_extension),
            path_to_file = underscores_to_dashes(path_to_file);

        grunt.log.debug('path to html file is ' + path_to_file);           

      } else {

        // create the file with the key as the file name
        var path_to_file = path.join(options.dest, data_object[key].category, key + options.file_extension),
            path_to_file = underscores_to_dashes(path_to_file);

        grunt.log.debug('path to html file is ' + path_to_file); 

      }

      // render the template
      render_template(key, data_object, path_to_file, path_to_layout); 

    }
    // end create a file that is in a category

    // create a file at root level
    function create_root_level_file(key, data_object, path_to_layout) {

      grunt.log.debug('the page has no category');

      // if the parent_dirs option is true
      if (options.parent_dirs) {

        // create path to the rendered html file
        var path_to_file = path.join(options.dest, key, 'index' + options.file_extension),
            path_to_file = underscores_to_dashes(path_to_file);  

        grunt.log.debug('path to html file is ' + path_to_file);        

      } else {

        // create the file with the key as the file name
        var path_to_file = path.join(options.dest, key + options.file_extension),
            path_to_file = underscores_to_dashes(path_to_file);

        grunt.log.debug('path to html file is ' + path_to_file); 

      }

      // render the template
      render_template(key, data_object, path_to_file, path_to_layout); 

    }
    // end create a file at root level

    // prepare layout file
    function prepare_layout(key, data_object, path_to_layout) {

      // get the layout
      var layout = grunt.file.read(path_to_layout);

      return layout;      

    }
    // end prepare layout file

    // prepare template for rendering
    function prepare_template(layout, path_to_file) {

      // make the template file
      grunt.file.write(path_to_file, layout);
      grunt.log.debug('Created file at ' + path_to_file);

      // get the template
      var the_template = grunt.file.read(path_to_file);
      grunt.log.debug('Read template from ' + path_to_file);

      return the_template;

    }
    // end prepare template for rendering

    // prepare data for rendering
    function prepare_data(key, data_object, global_data, path_to_layout) {

      // get the data for this file 
      var the_data = data_object[key];

      // add any global data to it
      if (global_data) {
        the_data.global = global_data;
        grunt.log.debug('Added global data to data object');
      }  

      // set the base dir for includes
      // tj uses filename to set base dir for includes in ejs.js
      // which make the include relative to the file
      // see resolveInclude() in visionmedia/ejs/lib/ejs.js
      the_data.filename = path_to_layout;
      grunt.log.debug('THIS DATA FILENAME IS ' + the_data.filename);

      return the_data;      

    }
    // end prepare data for rendering

    // render the template
    function render_template(key, data_object, path_to_file, path_to_layout) {

      // prepare the layout
      var prepped_layout = prepare_layout(key, data_object, path_to_layout);

      // prepare the template
      var prepped_template = prepare_template(prepped_layout, path_to_file);

      // prepare the data
      var prepped_data = prepare_data(key, data_object, global_data, path_to_layout); 

      // render the template as html
      var the_rendered_template = ejs.render(prepped_template, prepped_data);
      grunt.log.debug('Created a rendered template using ' + path_to_file);

      // write the compiled template to the destination directory
      grunt.file.write(path_to_file, the_rendered_template);
      grunt.log.debug('Rendered HTML to ' + path_to_file);

    }
    // end render the template

    // make file name url ready by replacing underscores with dashes
    function underscores_to_dashes(item) {

      // if the underscores_to_dashes option is true
      if (options.underscores_to_dashes) {

        var item = item.replace(/_/g, "-");
        grunt.log.debug('underscores_to_dashes was set to true and processed ' + item);
        return item;

      } else {
        return item;
      }

    }
    // end make file name url ready by replacing underscores with dashes

  });

};
