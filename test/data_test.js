'use strict';

var grunt = require('grunt');
var ejs_static = require('../tasks/ejs_static');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.tests = {

  get_data: function(test) {

    test.expect(1);

    var test_object = grunt.file.read('fixtures/object.js');

    var returned_value =

    test.ok(true, 'data_type_router(): passed test');

    test.done();

  },

  // 'apples and oranges': function (test) {
  //       test.equal('apples', 'oranges', 'comparing apples and oranges');
  //       test.done();
  // },

  'apples and apples': function (test) {
        test.equal('apples', 'apples', 'comparing apples and apples');
        test.done();
  }

};
