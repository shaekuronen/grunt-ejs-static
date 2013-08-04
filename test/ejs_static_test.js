'use strict';

var grunt = require('grunt');
var path = require('path');

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

exports.ejs_static = {

  test1: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tests/test1/index.html');
    var expected = grunt.file.read('test/expected/index.html');
    test.equal(actual, expected, 'Test1 should output files without parent dirs');

    test.done();
  },

  test2: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tests/test2/about/index.html');
    var expected = grunt.file.read('test/expected/about/index.html');
    test.equal(actual, expected, 'Test2 should output files with parent dirs');

    test.done();
  },

  test3: function(test) {
    test.expect(1);

    var file = grunt.file.read('tests/test3/project/project-name.html');
    test.ok(file, 'Test3 should find file project/project-name.html');

    test.done();
  },

  test4: function(test) {
    test.expect(1);

    var file = grunt.file.read('tests/test4/project/project_name.html');
    test.ok(file, 'Test4 should find file project/project_name.html');

    test.done();
  },

  test5: function(test) {
    test.expect(1);

    var file = grunt.file.read('tests/test5/index.php');
    test.ok(file, 'Test5 should find file index.php');

    test.done();
  }

};
