
module.exports = exports = {

  build_url: function(scheme, hostname, path, queries) {
    console.log('this hnappen ' + queries);
    var url = "";
    url += scheme;
    url += "://";
    url += hostname;
    url += path;
    if (queries.length > 0) {
      url += "?";
      queries.forEach(function(query, index) {
        if (index === 0) {
          url += query;
        } else {
          url += "&" + query;
        }
      });
    }
    return url;
  },

  print_object: function(obj) {
    var output = '';
    for(var property in obj) {
      output += property + ': ' + obj[property]+'; \n';
    }
    console.log(output);
  },

  highlight: function(text) {
    return "<h1 style='color:red;'>" + text + "</h1>";
  }

};
