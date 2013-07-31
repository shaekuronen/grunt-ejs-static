
var grunt = require('grunt');
var path = require('path');

module.exports = exports = {

  write_file: function(key, files, rendered_file, options) {

    // PRIVATE FUNCTIONS
    // 

    // create dir structure and render templates as html
    function create_file_router(key, files, rendered_file, options) {

      // if the page is the index page specified in ejs_static options
      if ( key === options.index_page ) {
        
        create_index_file(rendered_file, options);

      // if the page is a category page, build the category dir structure
      } else if ( files[key].hasOwnProperty('category') ) {
        
        create_category_file(key, files, rendered_file, options);

      // the page has no category and is therefore rendered at root level
      } else if ( !files[key].hasOwnProperty('category') ) {

        create_root_level_file(key, files, rendered_file, options);

      } else {
        grunt.log.error('create_file_router(): error');
      }

    }
    // end create dir structure and render templates as html

    // create the index.html file specified in options
    function create_index_file(file, options) {

      grunt.log.debug('the file is options.index_page');

      // create path to the rendered html file
      var path_to_file = path.join(options.dest, 'index' + options.file_extension);

      path_to_file = underscores_to_dashes(path_to_file);

      grunt.log.debug('path to file is ' + path_to_file);

      // write file to the destination directory
      grunt.file.write(path_to_file, rendered_file);
      grunt.log.debug('Rendered index file written to ' + path_to_file);

    }
    // end create the index.html file specified in options

    // create a file that is in a category
    function create_category_file(key, files, rendered_file, options) {

      grunt.log.debug('the file is in a category');

      var path_to_file = '';

      // if the parent_dirs option is true
      if (options.parent_dirs) {

        // create the file as an index.html file inside a parent directory
        path_to_file = path.join(options.dest, files[key].category, key, 'index' + options.file_extension);

        path_to_file = underscores_to_dashes(path_to_file);

        grunt.log.debug('path to html file is ' + path_to_file);

        // write file to the destination directory
        grunt.file.write(path_to_file, rendered_file);
        grunt.log.debug('Rendered category file written to ' + path_to_file);           

      } else {

        // create the file with the key as the file name
        path_to_file = path.join(options.dest, files[key].category, key + options.file_extension);

        path_to_file = underscores_to_dashes(path_to_file);

        grunt.log.debug('path to html file is ' + path_to_file); 

        // write file to the destination directory
        grunt.file.write(path_to_file, rendered_file);
        grunt.log.debug('Rendered category file written to ' + path_to_file); 

      }

    }
    // end create a file that is in a category

    // create a file at root level
    function create_root_level_file(key, files, rendered_file, options) {

      grunt.log.debug('the page has no category');

      var path_to_file = '';

      // if the parent_dirs option is true
      if (options.parent_dirs) {

        // create path to the rendered html file
        path_to_file = path.join(options.dest, key, 'index' + options.file_extension);

        path_to_file = underscores_to_dashes(path_to_file);

        grunt.log.debug('path to html file is ' + path_to_file); 

        // write file to the destination directory
        grunt.file.write(path_to_file, rendered_file);
        grunt.log.debug('Rendered root level file written to ' + path_to_file);        

      } else {

        // create the file with the key as the file name
        path_to_file = path.join(options.dest, key + options.file_extension);

        path_to_file = underscores_to_dashes(path_to_file);

        grunt.log.debug('path to html file is ' + path_to_file);

        // write file to the destination directory
        grunt.file.write(path_to_file, rendered_file);
        grunt.log.debug('Rendered root level file written to ' + path_to_file);  

      }

    }
    // end create a file at root level

    // make file name url ready by replacing underscores with dashes
    function underscores_to_dashes(item) {

      // if the underscores_to_dashes option is true
      if (options.underscores_to_dashes) {

        var modified_item = '';

        modified_item = item.replace(/_/g, "-");
        grunt.log.debug('underscores_to_dashes was set to true and processed ' + item);
        return modified_item;

      } else {
        return item;
      }

    }
    // end make file name url ready by replacing underscores with dashes 

    //
    // END PRIVATE FUNCTIONS 

    create_file_router(key, files, rendered_file, options);

  }   

};