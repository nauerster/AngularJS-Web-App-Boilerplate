module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dist: {
        files: {
          "app/css/build/style.css": ["app/less/app.less"]
        }
      }
    },
    autoprefixer: {
      dist: {
        src: 'app/css/build/style.css',
        dest: 'app/css/build/style.prefix.css'
      }
    },
    csscomb: {
      dist: {
        files: {
          'app/css/build/style.csscomb.css': ['app/css/build/style.prefix.css'],
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'app/css/vendor.min.css': [
            'app/libraries/thirdparty/bootstrap/dist/css/bootstrap.min.css', 
            'app/libraries/thirdparty/font-awesome/css/font-awesome.min.css'
          ],
          'app/css/style.min.css': ['app/css/build/style.csscomb.css']
        }
      }
    },
    concat: {
      vendor: {
        src: [
          'app/libraries/thirdparty/jquery/jquery.min.js', 
          'app/libraries/thirdparty/bootstrap/dist/js/bootstrap.min.js', 
          'app/libraries/thirdparty/angular/angular.min.js', 
          'app/libraries/thirdparty/jquery.ui/ui/jquery.ui.effect.js', 
          'app/libraries/thirdparty/jquery-hoverIntent/jquery.hoverintent.js'
        ],
        dest: 'app/js/vendor.min.js'
      }
    },
    uglify: {
      dist: {
        options: {
          preserveComments: false,
          compress: false
        },
        files: {
          'app/js/app-angular.min.js': [
            'app/js/angular/app.js',
            'app/js/angular/controllers/*.js',
            'app/js/angular/directives/*.js',
            'app/js/angular/filters/*.js',
            'app/js/angular/services/*.js'
          ],
          'app/js/app.min.js': [
            'app/js/app/*.js',
            'app/js/main.js'
          ]
        }
      }
    },
    faker: {
      task: {
        options: {
          jsonFormat: 'app/js/json/faker-format.json',
          out: 'app/js/json/faker.json'
        }
      }
    },
    watch: {
      less: {
        files: 'app/less/*.less',
        tasks: [
          'less', 
          'autoprefixer', 
          'csscomb', 
          'cssmin'
        ],
        options: {
          livereload: true
        }
      },
      js: {
        files: [
          'app/js/main.js',
          'app/js/app/*.js', 
          'app/js/angular/*/*.js'
        ],
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      },
      faker: {
        files: [ 'app/js/json/faker-format.json'],
        tasks: ['faker'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load the plugins that provide the task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-faker');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less', 'autoprefixer', 'csscomb', 'cssmin', 'concat', 'uglify', 'faker', 'watch'])

};