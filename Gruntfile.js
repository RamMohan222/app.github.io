module.exports = function (grunt) {
  const pkg = grunt.file.readJSON("package.json");
  const versions = pkg.version.split(".");
  versions[2] = parseInt(versions[2]) + 1;
  const appVersion = versions.join(".");

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    replace: {
      cdnVersion: {
        options: {
          patterns: [
            {
              match: /\?v=(\d+)/g,
              // replacement: "?v=<%= Date.now() %>",
              replacement: "?v=<%=grunt.template.today('yyyymmdd') %>",
            },
            {
              match: /<p version="version">([^$]+?)<\/p>/g,
              replacement: `<p version="version">v ${appVersion}</p>`,
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
      appVersion: {
        options: {
          patterns: [
            {
              match: /\"version\"\s*:\s*\"\d.\d.\d\s*\"/g,
              replacement: `"version":"${appVersion}"`,
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["package.json"],
            dest: "./",
          },
        ],
      },
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
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
      build: {
        src: "index.js",
        dest: "index.min.js",
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
    watch: {
      scripts: {
        files: ["index.js", "index.css"],
        tasks: ["default"],
      },
    },
  });

  // config end
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-replace");
  grunt.registerTask("default", [
    "build:start",
    "cssmin",
    "uglify",
    "replace:cdnVersion",
    "build:done",
  ]);

  grunt.registerTask("prod", [
    "build:start",
    "replace:appVersion",
    "cssmin",
    "uglify",
    "replace:cdnVersion",
    "build:done",
  ]);

  grunt.registerTask("watch", ["watch"]);

  grunt.registerTask("build:start", function () {
    grunt.log.write(`Build start ${pkg.name}: ${appVersion} `).ok();
    grunt.log.write("*** To persist the version run build:prod ***").ok();
  });
  grunt.registerTask("build:done", function () {
    grunt.log
      .write(`Building is done successfully ${pkg.name}: ${appVersion} `)
      .ok();
  });
};
