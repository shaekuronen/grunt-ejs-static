/*
 * grunt-ejs-static
 * https://github.com/shaekuronen/grunt-ejs-static
 *
 * Copyright (c) 2013 Shae Kuronen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    copy: {
      preview: {
        files: [
          {expand: true, cwd: 'example/dev/', src: ['img/**'], dest: 'example/preview/'},
          {expand: true, cwd: 'example/dev/', src: ['css/**'], dest: 'example/preview/'},
          {expand: true, cwd: 'example/dev/', src: ['js/**'], dest: 'example/preview/'},
          {expand: true, cwd: 'example/dev/', src: ['.ht*'], dest: 'example/preview/'}
        ]
      }
    },

    // Configuration to be run (and then tested).
    ejs_static: {
      preview: {
        options: {
          src: 'example/dev/pages/',
          dest: 'example/preview/',
          index_page: 'example/dev/pages/home/index.html',
          data: 'example/dev/data/pages.json'
        },
        files: {
          'example/preview/': 'example/dev/pages/**/index.html'
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean', 
    'ejs_static'
    // , 
    // 'nodeunit'
  ]);

  // preview the site during development
  grunt.registerTask('preview', [
    'clean',
    'copy:preview', 
    'ejs_static'
    // , 
    // 'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', [
    'jshint', 
    'test'
  ]);

};
