module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            release: {
                src: ['js-dev/*.js'],
                dest: 'web/js/main.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            release: {
                src: 'web/js/main.js',
                dest: 'web/js/main.min.js'
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            // Combine files into one output file
            release: {
                files: {
                    'web/css/main.min.css': ['web/css/site.css']
                }
            }
        },
        /*copy: {
            main: {
                expand: true,
                src: 'src/!*',
                dest: 'dest/'
            }
        },*/
        clean: {
            release: {
                src: ['web/js/*.js', '!web/js/*.min.js']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'clean']);
    grunt.registerTask('release', ['concat:release', 'uglify:release', 'cssmin:release', 'clean:release']);
};