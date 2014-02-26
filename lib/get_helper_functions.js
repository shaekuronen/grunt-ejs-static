
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
    var helpers = options.helpers;

    // route data based on data type (object or array)
    function data_type_router(helpers) {

      // if helpers option is a string
      if (typeof helpers === 'string') {

        console.log('HELPERS IS A STRING');

        // convert to an array
        helpers = [helpers];

        process_array_data(helpers);

      // if helpers option is an object
      } else if (Object.getPrototypeOf(helpers) === Object.prototype) {

        process_object_data(helpers);

      // if path_to_data is an array, get the specified data for each item in the array
      } else if (_.isArray(helpers)) {

        process_array_data(helpers);

      } else {
        grunt.fail.warn('get_helper_functions.js data_type_router(): data type error: options.helpers must be object or array');
      }

    }
    // end route data based on if data is a string, object, or array

    // iterate through functions specified in options.helpers object
    function process_object_data(helpers) {

      Object.keys(helpers).forEach(function(key) {

        helpers_global[key] = helpers[key];

        grunt.log.debug('process_object_data() the current key is ' + key);

      });

    }
    // get iterate through functions specified in options.helpers object

    // iterate through files specified in options.helpers array
    function process_array_data(helpers) {

      grunt.log.debug('process_array_data() helpers is ' + helpers);

      helpers.forEach(function(filepath) {

        console.log('the cwd is ' + process.cwd());

        var this_path = path.join(process.cwd(), filepath);

        console.log('this path is ' + this_path);

        var this_file = require(this_path);

        // add to global object
        _.extend(helpers_global, this_file);

      });

    }
    // end iterate through files specified in options.helpers array

    //
    // END PRIVATE FUNCTIONS

    // start
    data_type_router(helpers);

    return helpers_global;

  }
  // end get helper functions

};
