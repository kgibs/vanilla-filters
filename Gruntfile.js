module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: false,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          'dist/js/vanilla-filters.js': 'src/js/vanilla-filters.js'
        }
      }
    },
    sass: {
      dist: {
        files: {
          'dist/css/style-philters.css': 'src/scss/style-philters.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['src/scss/style-philters.scss'],
        tasks: ['sass'],
      },
      another: {
        files: ['src/js/vanilla-filters.js'],
        tasks: ['babel'],
      }
    }
  });

  // Load the plugin(s)
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['babel']);
  grunt.registerTask('default', ['sass']);
  grunt.registerTask('default', ['watch']);

};