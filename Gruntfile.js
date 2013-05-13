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
      preview: ['example/preview'],
      optimize: ['example/production'],
      post_optimize: [
        'example/production/pages', 
        'example/production/templates',
        'example/production/head.ejs',
        'example/production/scripts.ejs'
      ]
    },

    copy: {
      preview: {
        files: [
          {expand: true, cwd: 'example/dev/', src: ['img/**'], dest: 'example/preview/'},
          {expand: true, cwd: 'example/dev/', src: ['css/**'], dest: 'example/preview/'},
          {expand: true, cwd: 'example/dev/', src: ['js/**'], dest: 'example/preview/'}
        ]
      },
      optimize: {
        files: [
          // temporary files for usemin task
          {expand: true, flatten: true, cwd: 'example/dev/', src: ['templates/global/head.ejs'], dest: 'example/production/', filter: 'isFile'},
          {expand: true, flatten: true, cwd: 'example/dev/', src: ['templates/global/scripts.ejs'], dest: 'example/production/', filter: 'isFile'},
          // end temporary files for usemin task
          // temporary files for ejs_static task
          {expand: true, cwd: 'example/dev/', src: ['pages/**'], dest: 'example/production/'},
          {expand: true, cwd: 'example/dev/', src: ['templates/**'], dest: 'example/production/'},
          // end temporary files for ejs_static task
          {expand: true, cwd: 'example/dev/', src: ['img/**'], dest: 'example/production/'},
          {expand: true, cwd: 'example/dev/', src: ['css/**'], dest: 'example/production/'},
          {expand: true, cwd: 'example/dev/', src: ['js/**'], dest: 'example/production/'},
          {expand: true, cwd: 'example/dev/', src: ['data/**'], dest: 'example/production/'}
        ]
      }
    },

    // get the scripts inside preview:js block
    'useminPrepare': {
      html: [
        'example/production/head.ejs',
        'example/production/scripts.ejs'
      ]     
    },

    // update the scripts links to point to the concatenated and minified js/main.js
    usemin: {
      html: [
        'example/production/templates/global/head.ejs',
        'example/production/templates/global/scripts.ejs'
      ]
    },

    ejs_static: {
      preview: {
        options: {
          src: 'example/dev/',
          index_page: 'example/dev/pages/home/index.html',
          data: 'example/dev/data/pages.json'
        },
        files: {
          'example/preview/': 'example/dev/pages/**/index.html'
        },
      },
      optimize: {
        options: {
          src: 'example/production/',
          index_page: 'example/production/pages/home/index.html',
          data: 'example/production/data/pages.json'
        },
        files: {
          'example/production/': 'example/production/pages/**/index.html'
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
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // build the site for preview during development
  grunt.registerTask('preview', [
    'clean:preview',
    'copy:preview', 
    'ejs_static:preview'
    // , 
    // 'nodeunit'
  ]);

  // optimize the site before deploying to production
  grunt.registerTask('optimize', [
    'clean:optimize',
    'copy:optimize',
    'useminPrepare', 
    'concat', 
    'cssmin', 
    'uglify',  
    'usemin', 
    'ejs_static:optimize',
    'clean:post_optimize'
    // , 
    // 'nodeunit'
  ]);

};
