module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    replace: {
      timestamp: {
        options: {
          patterns: [
            {
              match: /\?v=(\d+)/g,
              replacement: "?v=<%= Date.now() %>",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["src/views/*.html"],
            dest: "./build/",
          },
        ],
      },
      footer: {
        options: {
          patterns: [
            {
              match: /<footer[^>]+?>([^$]+?)<\/footer>/g,
              replacement: `<footers class="footer">
                <%= grunt.file.read("src/views/includes/footer.html") %>
                </footers>`,
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["build/*.html"],
            dest: "./build/",
          },
        ],
      },
      version: {
        options: {
          patterns: [
            {
              match: /<p version="version">([^$]+?)<\/p>/g,
              replacement: '<p version="version">v <%= pkg.version %></p>',
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["build/*.html"],
            dest: "./build/",
          },
        ],
      },
    },
    uglify: {
      options: {
        mangle: {
          reserved: ["jQuery"],
          keep_fargs: false,
          keep_fnames: true,
        },
        compress: {
          drop_console: true,
        },
      },
      target: {
        files: {
          "build/index.min.js": ["src/js/index.js"],
        },
      },
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          "build/index.min.css": ["src/css/index.css"],
        },
      },
    },
    cp: {
      options: {},
      target: {
        src: "assets/",
        dest: "build/assets/",
      },
    },
  });
  grunt.loadNpmTasks("grunt-cp");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-replace");
  grunt.registerTask("default", [
    "cssmin",
    "uglify",
    "replace:timestamp",
    "replace:footer",
    "replace:version",
    "cp",
  ]);
};
