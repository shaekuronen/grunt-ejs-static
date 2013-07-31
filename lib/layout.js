
var grunt = require('grunt');
var path = require('path');

module.exports = exports = {

  // prepare layout file
  get_layout: function(key, files, options) {

    // PRIVATE FUNCTIONS
    //

    // generate path to layout
    function path_to_layout_generator(key, files, options) {

      // if path_to_layout exists
      if (typeof files[key].path_to_layout === 'string') {

        return files[key].path_to_layout;

      // if a layouts dir is specified
      } else if (typeof options.path_to_layouts === 'string') {

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

    // 
    // END PRIVATE FUNCTIONS

    grunt.log.debug('get_layout(): executed and the key is ' + key);

    // get path to layout
    var path_to_layout = path_to_layout_generator(key, files, options);

    // get the layout
    var layout = grunt.file.read(path_to_layout);

    // create layout data object to return both path_to_layout and layout
    var layout_data = {
      path_to_layout: path_to_layout,
      layout: layout
    };

    grunt.log.debug('The layout data is ' + JSON.stringify(layout_data, null, 2));
    return layout_data;

  }
  // end prepare layout file

};