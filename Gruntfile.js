/* global module */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),


        // -- Tasks
        clean: {
            dist: [
                'dist/css/jquery-tubular.min.css',
                'dist/js/jquery-tubular.min.js'
            ]
        }, // clean

        recess: {
            minified: {
                options: {
                    compress: true
                },
                files: {
                    'dist/css/jquery-tubular.min.css': [
                        'src/less/jquery-tubular.less'
                    ]
                }
            } // minified
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/js/*.js',
                '!dist/js/*.min.js'
            ]
        },

        uglify: {
            minified: {
                options: {
                    banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>' +
                        '* by <%= pkg.author %> (http://monkeymonk.be)' +
                        '* forked from Sean McCambridge (http://www.seanmccambridge.com/tubular)' + '* licensed under the MIT License '+
                        '*/'
                },
                files: {
                    'dist/js/jquery-tubular.min.js': [
                        'src/js/jquery-tubular.js'
                    ]
                }
            }, // minified
        }, // uglify


        shell: {
            done: {
                command: 'terminal-notifier -message "Bazinga! Grunt Tasks done!" -title "Gruntfile.js"'
            }
        }, // shell

        connect: {
            server: {
                options: {
                    port: 8800,
                    base: '.'
                }
            }
        }, // connect

        watch: {
            less: {
                files: [
                    'src/less/*.less'
                ],

                tasks: ['recess', 'shell:done']
            },

            js: {
                files: [
                    '<%= jshint.all %>'
                ],

                tasks: ['jshint', 'uglify', 'shell:done']
            }
        }, // watch
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-shell');


    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });


    // -- Tasks

    grunt.registerTask('before-test', [
        'clean'
    ]);
    grunt.registerTask('test', [
        'recess',
        'uglify'
    ]);
    grunt.registerTask('after-test', [
        'shell:done'
    ]);

    grunt.registerTask('js', [
        'uglify',
        'shell:done'
    ]);
    grunt.registerTask('css', [
        'recess',
        'shell:done'
    ]);

    grunt.registerTask('default', ['before-test', 'test', 'after-test']);
};
