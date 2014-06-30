module.exports = function(grunt) {
  	grunt.initConfig({
  		pkg: grunt.file.readJSON('package.json'),
  		options: {
  			sass: {
  				src: 'css/',
  				dest: 'css/'
  			},
  			css: {
	  			src: 'css/*.css',
	  			dest: 'css/'  				
  			}
  		},
  		sass: {
  			dist: {
  				options: {
  					style: 'compressed',
  					compass: true
  				},
  				files: {
  					'<%= options.sass.dest %>style.css': '<%= options.sass.src %>style.sass'
  				}
  			},
  			dev: {
  				options: {
  					style: 'expanded',
  					lineNumbers: true,
  					quiet: true,
  					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy hh:mm:ss") %> */\n',
  					compass: true
  				},
  				files: {
  					'<%= options.sass.dest %>style.css': '<%= options.sass.src %>style.sass'
  				}
  			}
  		},
  		watch: {
  			css: {
  				files: ['css/*.sass'],
  				tasks: ['sass']
  			}
  		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass:dev', 'watch']);
};