
var grunt = require('grunt');
var ejs = require('ejs');
var _ = require('underscore');

module.exports = exports = {

  // render the file
  render_file: function(layout_data, file_data, helpers) {

    grunt.log.debug('render_file(): executed');

    // set the base dir for includes
    // tj uses filename to set base dir for includes in ejs.js
    // which make the include relative to the file
    // see resolveInclude() in visionmedia/ejs/lib/ejs.js
    file_data.filename = layout_data.path_to_layout;

    // add any helpers to the file_data object
    if (_.keys(helpers).length > 0) {

      _.extend(file_data, helpers);
      grunt.log.debug('render.js render_file() the value of helpers is :' + Object.keys(helpers));

    }

    grunt.log.debug('data available for this template ' + Object.keys(file_data));

    // render the template as html and return the result
    var rendered_file = ejs.render(layout_data.layout, file_data);

    return rendered_file;

  }
  // end render the file

};
