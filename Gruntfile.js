module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    polyfill: {
        options: {
            uglify: true,
            features: ['es5', 'es6.object.assign'],
            output: 'lib/polyfill.js'
        }
    },
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
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-polyfill-builder');

  // Default task(s).
  grunt.registerTask('default', ['babel', 'sass', 'watch', 'polyfill']);
};