module.exports = function(grunt) {
	grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			concurrent: {
				options: {
					logConcurrentOutput: true
				},
				dev: ['nodemon', 'watch']
			},
			nodemon: {
				dev: {
					script: 'server.js'
				}
			},
			jasmine_node: {
				options: {
					specFolders: ['spec/'],
					forceExist: true
				},
				test: {}
			},
			karma: {
				options: {
					configFile: 'karma.conf.js'
				},
				watch: {
					background: true
				},
				test: {
				}
			},
			watch: {
				watch: {
					files: '**/*.js',
					tasks: ['karma:watch:run', 'jasmine_node']
				}
			}
	});

	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['karma:watch:start', 'concurrent:dev']);
	grunt.registerTask('test', ['jasmine_node', 'karma:test']);
};
