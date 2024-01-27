module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    replace: {
      version: {
        options: {
          patterns: [
            {
              match: /\?v=(\d+)/g,
              replacement: "?v=<%= Date.now() %>",
            },
            {
              match: /<p version="version">([^$]+?)<\/p>/g,
              replacement: '<p version="version"><%= pkg.version %></p>',
            },
          ],
        },
        files: [
          {
            // expand: true,
            // flatten: true,
            src: ["*.html"],
            dest: "./",
          },
        ],
      },
      footer: {
        options: {
          patterns: [
            {
              match: /<footer[^>]+?>([^$]+?)<\/footer>/g,
              replacement: `<footers class="footer">
                <%= grunt.file.read("includes/footer.html") %>
                </footers>`,
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["index.html"],
            dest: "./",
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
          "index.min.js": ["index.js"],
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
          "index.min.css": ["index.css"],
        },
      },
    },
  });
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-replace");
  grunt.registerTask("default", ["cssmin", "uglify", "replace:version"]);
};
