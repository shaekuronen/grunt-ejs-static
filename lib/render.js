
var grunt = require('grunt');
var ejs = require('ejs');

module.exports = exports = {

  // render the file
  render_file: function(layout_data, file_data) {

    grunt.log.debug('render_file(): executed');

    // set the base dir for includes
    // tj uses filename to set base dir for includes in ejs.js
    // which make the include relative to the file
    // see resolveInclude() in visionmedia/ejs/lib/ejs.js
    file_data.filename = layout_data.path_to_layout;
    grunt.log.debug('THIS DATA FILENAME IS ' + file_data.filename);

    // render the template as html and return the result
    var rendered_file = ejs.render(layout_data.layout, file_data);
    grunt.log.debug(rendered_file.toString());
    return rendered_file;

  }
  // end render the file

};
