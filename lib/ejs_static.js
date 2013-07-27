
var EJS_Static = function() {

  // private functions
  // 
  var get_files = require('./get_files').get_files,
      get_data = require('./data').get_data,
      get_layout = require('./layout').get_layout,
      render_file = require('./render').render_file,
      write_file = require('./write_file').write_file;

  // 
  // end private functions

  // public functions
  // 
  return {

    // get files to render
    get_files: get_files,

    // get data
    get_data: get_data,

    // get layout
    get_layout: get_layout,

    // render file
    render_file: render_file,

    // write file
    write_file: write_file
  
  }
  // 
  // end public functions

};

module.exports = exports = new EJS_Static();