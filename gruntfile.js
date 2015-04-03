module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
      files: {
        'dest/output.min.js': ['src/*.js']
      }
    }
    },
    includeSource: {
    	options: {
      basePath: '.',
      baseUrl: 'src/'
    },
    myTarget: {
      files: {
        'dist/index.html': 'app/index.html'
      }
    }
  }
    // ,
    // includeSource: {
    //   options: {
    //     basePath: 'app',
    //     baseUrl: 'public/',
    //     templates: {
    //       html: {
    //         js: '<script src="{filePath}"></script>',
    //         css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
    //       },
    //       haml: {
    //         js: '%script{src: "{filePath}"}/',
    //         css: '%link{href: "{filePath}", rel: "stylesheet"}/'
    //       },
    //       jade: {
    //         js: 'script(src="{filePath}", type="text/javascript")',
    //         css: 'link(href="{filePath}", rel="stylesheet", type="text/css")'
    //       },
    //       scss: {
    //         scss: '@import "{filePath}";',
    //         css: '@import "{filePath}";',
    //       },
    //       less: {
    //         less: '@import "{filePath}";',
    //         css: '@import "{filePath}";',
    //       }
    //     }
    //   },
    //   myTarget: {
    //     files: {
    //       'dist/index.html': 'app/index.tpl.html'
    //     }
    //   }
    // }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-include-source');
  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};


