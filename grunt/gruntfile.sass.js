module.exports = function(grunt) {
	
	// Project configuration.
	grunt.initConfig({
	
		pkg: grunt.file.readJSON('package.json'),
		
		/* Checks changes to the following folders */
		watch: {
			src: {
				files: [
					'common/js/reference/*.js',
					'common/js/lib/*.js',
					'common/js/src/*.js', 
					'common/js/src/pages/*.js', 
					'common/js/src/modules/*.js'
				],
				
				tasks: ['default']
			},
		    inst: {
		    	files: [
		    		'tools/sass/*.scss',
				    'tools/sass/pages/wishlist.scss',
				    'tools/sass/pages/ie-wishlist.scss',
				    'tools/sass/pages/pdp-standard.scss',
				    'tools/sass/pages/ie-pdp-standard.scss',
				    'tools/sass/pages/category.scss',
				    'tools/sass/pages/ie-category.scss'
		    	],
		      tasks: ['instorecopy']
		    },
		},
		
		/* JS Lint */
		jshint: {
			options: {
				force: true,
				bitwise: true,
				camelcase: false,
				curly: true,
				eqeqeq: true,
				/*es3: true,*/
				immed: true,
				/*indent: 4,*/
				/*latedef: false,*/
				newcap: true,
				quotmark: 'single',
				undef: true,
				jquery: true,
				"-W099": true,
				"-W065": true,
				"-W030": true
			},
			
			files: [
				'common/js/src/*.js',
				'common/js/src/modules/*.js', 
				'common/js/src/pages/*.js',
				
				'!common/js/src/*.min.js',
				'!common/js/src/modules/*.min.js', 
				'!common/js/src/pages/*.min.js'
			]
		},
		
		/* Concatenation */
		concat: {
			options: { 
				separator: '/* END FILE */\n',
			},

			dist: {
				src: [
					'common/js/lib/jquery.js', 
					'common/js/lib/jquery.touchSwipe.min.js', 
					'common/js/lib/modernizr.js',
					'common/js/lib/jquery.animate-enhanced.min.js',
					'common/js/lib/jquery-ui-1.10.3.min.js',
					'common/js/lib/jquery.mobile-events.min.js',
					'common/js/lib/jquery.event.special.fastclick.min.js',
					'common/js/lib/jquery.ui.touch-punch.js',
					'common/js/lib/jquery.cookies.2.2.0.min.js', 
					'common/js/lib/swipe.js',
					'common/js/src/*.js',
					'common/js/src/modules/*.js',
					
					/* DO NOT CONCATENATE MINIFIED FILES */
					'!common/js/src/*.min.js',
					'!common/js/src/*-instore.js',
					'!common/js/src/modules/*.min.js'			
				],
				
				dest: 'common/js/samsung.js',				
			},
			
			instore: {
				src: [
					'common/js/lib/jquery.minjs', 
					'common/js/lib/jquery.touchSwipe.min.js', 
					'common/js/lib/modernizr.js',
					'common/js/lib/jquery.animate-enhanced.min.js',
					'common/js/lib/jquery-ui-1.10.3.min.js',
					'common/js/lib/jquery.mobile-events.min.js',
					'common/js/lib/jquery.event.special.fastclick.min.js',
					'common/js/lib/jquery.ui.touch-punch.js',
					'common/js/lib/jquery.cookies.2.2.0.min.js', 
					'common/js/lib/swipe.js',
					'common/js/src/*-instore.js',
					'common/js/src/modules/*.js',
					
					/* DO NOT CONCATENATE MINIFIED FILES */
					'!common/js/src/*.min.js',
					'!common/js/src/modules/*.min.js'
				],
				
				dest: 'common/js/samsung-instore.js',
			}
		},
		
		/* Minification */
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			
			dynamic_mappings: {
				files: [
					{
					  expand: true,     // Enable dynamic expansion.
					  src: [
						  'common/js/src/*.js', 
						  'common/js/src/modules/*.js', 
						  'common/js/src/pages/*.js', 
						  'common/js/*.js', 
						  'common/js/reference/*.js'
					  ],
					  dest: '',
					  ext: '.min.js'
					}
				]
			}
		},
		
		/* YUI Documentation */
		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					outdir: 'tools/yuidoc/docs',
					paths: ['common/js/']
				}
			}
		},

		/* Clone files for instore */
	    copy: {
	        sass: {
				files: [
					{
					  expand: true,
					  src: [
					  	  'tools/sass/*.scss',
						  'tools/sass/pages/wishlist.scss',
						  'tools/sass/pages/ie-wishlist.scss',
						  'tools/sass/pages/pdp-standard.scss',
						  'tools/sass/pages/ie-pdp-standard.scss',
						  'tools/sass/pages/category.scss',
						  'tools/sass/pages/ie-category.scss',

							/* DO NOT COPY INSTORE FILES */
							  '!tools/sass/*-instore.scss',
							  '!tools/sass/pages/*-instore.scss',
					  ],
					  dest: '',
					  ext: '-instore.scss'
					}
				]
	        },

	        dist: {
				files: [
					{
					  expand: true,
					  src: [
						  'common/js/src/*.js',
						  'common/js/src/pages/wishlist.js',
						  'common/js/src/pages/pdp-standard.js',
						  'common/js/src/pages/category.js',

							/* DO NOT COPY INSTORE FILES NOR MINIFIED */
							'!common/js/src/*-instore.js',
						  	'!common/js/src/pages/*-instore.js',
						  	'!common/js/*-instore.js',
							'!common/js/src/*.min.js',
						  	'!common/js/src/pages/*.min.js',
						  	'!common/js/*.min.js',
					  ],
					  dest: '',
					  ext: '-instore.js'
					}
				]
	        }
	    }
	});
	
	// Load thge plugin that provides the "jshint" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	// Load the plugin that provides the "concat" task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// Load the plugin that provides the "yuidoc" task.
	/*grunt.loadNpmTasks('grunt-contrib-yuidoc');*/
	
	// Load the plugin that provides the "watch" task.
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Load the plugin that provides the "copy" task.
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	// Default task(s).
	grunt.registerTask('default', ['copy:dist', 'jshint', 'concat', /*'uglify', 'yuidoc'*/]);

	grunt.registerTask('instorecopy', ['copy:sass']);
	

};
