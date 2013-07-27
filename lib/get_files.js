
var grunt = require('grunt');

module.exports = exports = {

  get_files: function(options) {

    // get data specified in ejs_static options
    if (typeof options.path_to_data === 'string') {

      grunt.log.debug('get_files_to_render(): typeof data.options worked');

      // get the files data
      var files_data = grunt.file.readJSON(options.path_to_data);
      grunt.log.debug(JSON.stringify(files_data, null, 2));

      // return the data
      return files_data;

      grunt.log.debug('Data successfully imported');
      
    } else {

      grunt.fail.warn('The path_to_data option is required, please specify in Gruntfile');
      return false;

    }
    // end get data specified in ejs_static options 

  }   

};