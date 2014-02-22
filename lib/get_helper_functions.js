
var grunt = require('grunt');
var path = require('path');
var _ = require('underscore');

module.exports = exports = {

  // get helper functions
  get_helper_functions: function(options) {

    // PRIVATE FUNCTIONS
    //

    // create the helpers global object
    var helpers_global = {};

    // create the helpers object
    var helpers = options.helper_functions;

    // route data based on data type (object or array)
    function data_type_router(options) {

      // if helpers option is an object
      if (_.isObject(helpers)) {

        process_object_data(helpers);

      // if path_to_data is an array, get the specified data for each item in the array
      } else if (_.isArray(helpers)) {

        process_array_data(helpers);

      } else {
        grunt.fail.warn('helper_functions.js data_type_router(): data type error: options.helpers must be object or array');
      }

    }
    // end route data based on if data is a string, object, or array

    // iterate through functions specified in options.helpers object
    function process_object_data(helpers) {

      Object.keys(helpers).forEach(function(key) {

        helpers_global[key] = helpers[key];

        grunt.log.debug('process_object_data() helpers_global is ' + helpers_global);

      });

    }
    // get iterate through functions specified in options.helpers object

    // iterate through files specified in options.helpers array
    function process_array_data(helpers_global, helpers) {

      helpers.forEach(function(file) {

        // add to global object
        _.extend(helpers_global, get_file(file));

      });

    }
    // end iterate through files specified in options.helpers array

    // get contents of a file
    function get_file(file_path) {

      return grunt.file.read(file_path);

    }
    // end get contents of a file

    //
    // END PRIVATE FUNCTIONS

    // start
    data_type_router(options);

    return helpers_global;

  }
  // end get helper functions

};
