module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
                concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'vendor/events.js',
                    'vendor/scroller.js',
                    'src/parallax.js'
                ],
                dest: 'dist/scripts/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/scripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            options: {
              curly: true,
              eqeqeq: true, 
              eqnull: true,
              browser: true,
              reporter: 'jslint',
              reporterOutput: 'reports/jshint.xml',
              globals: {
                  jQuery: true
              },
            },
            all: ['src/**/*.js']
        },
        sass: {
            dist: {
               options: {
                   style: 'expanded'
               },
               files: {
                   'src/styles/css/<%= pkg.name %>.css': 'src/styles/scss/main.scss'
               }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/styles/<%= pkg.name %>.min.css': ['src/styles/css/<%= pkg.name %>.css']
                }
            }
        },
        csslint: {
            options: {
                formatters: [
                    {id: 'junit-xml', dest: 'reports/csslint_junit.xml'},
                    {id: 'csslint-xml', dest: 'reports/csslint.xml'}
                ]
            },
            strict: {
                options: {
                  import: 2
                },
                src: ['src/styles/css/<%= pkg.name %>.css'],
            }
        },
        watch: {
            styles: {
                files: ['src/styles/**/*.scss'],
                tasks: ['build-css'],
                options: {
                    spawn: false,
                },
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('build-css', ['sass', 'csslint', 'cssmin']);
    grunt.registerTask('build-js', ['jshint', 'concat']);
    grunt.registerTask('build', ['build-css', 'build-js']);
};