
var grunt = require('grunt');
var path = require('path');

module.exports = exports = {

  // get the data
  get_data: function(key, files) {

    grunt.log.debug('get_data(): executed and the current key is ' + key);

    // get the data for this file 
    var this_file_data = files[key];

    // add any additional data specified in pages declaration json file
    if (typeof this_file_data.path_to_data !== 'undefined') {

      grunt.log.debug('get_data(): the path to data is ' + this_file_data.path_to_data);

      data_type_router(this_file_data, this_file_data.path_to_data);

    } else {
      grunt.log.debug('get_data(): the type of data is undefined');
    }

    grunt.log.debug('the file data for ' + key + ' is ' + JSON.stringify(this_file_data, null, 2));
    return this_file_data;

    // PRIVATE FUNCTIONS
    // 

    // route data based on data type (string, object, or array)
    function data_type_router(this_file_data, additional_data) {

      // if path_to_data is a string 
      if (typeof additional_data === 'string') {

        process_string_data(this_file_data, additional_data);

      // if path_to_data is an object
      // http://stackoverflow.com/questions/8834126/how-to-efficiently-check-if-variable-is-array-or-object-in-nodejs-v8
      } else if (Object.getPrototypeOf(additional_data) === Object.prototype) {

        grunt.log.debug('data_type_router(): data item is an object instead of required string or array');

      // if path_to_data is an array, get the specified data for each item in the array
      } else if (Array.isArray(additional_data)) {

        process_array_data(this_file_data, additional_data);

      } else {
        grunt.fail.warn('data_type_router(): data type error');
      }

    }
    // end route data based on if data is a string, object, or array

    function process_string_data(this_file_data, additional_data) {

      grunt.log.debug('the data item is a string');

      // get the filename to use as key when data added to files
      var the_filename = path.basename(additional_data, '.json');

      grunt.log.debug('the filename is ' + the_filename);

      // add the data to the files
      this_file_data[the_filename] = grunt.file.readJSON(additional_data);

    }

    function process_array_data(this_file_data, additional_data) {

      grunt.log.debug('the data item is an array');

      additional_data.forEach(function(data_item) {

        // if data_item is a string
        if (typeof data_item === 'string') {

          // get the filename to use as key when data added to the file
          var the_filename = path.basename(data_item, '.json');

          grunt.log.debug('the filename is ' + the_filename);

          // add the data to the file
          this_file_data[the_filename] = grunt.file.readJSON(data_item);

        // if data_item is an object
        } else if (Object.getPrototypeOf(data_item) === Object.prototype) {

          // TODO this is a little weird bc the key is the path to data, which doesn't make intuitive sense
          Object.keys(data_item).forEach(function(key) {

            // get the filename to use as key when data added to the file
            var the_filename = path.basename(key, '.json');

            var this_data = grunt.file.readJSON(key);

            var this_value = data_item[key];

            // add the data to the file
            this_file_data[the_filename] = this_data[this_value];

            return this_file_data;

          });

        } else {
          grunt.fail.warn('process_array_data(): data type error');
        }

      });

    }

    // 
    // END PRIVATE FUNCTIONS    

  }
  // end get the data 

};