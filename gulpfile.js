"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp       = require("gulp"),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    typescript = require('typescript'),
    webserver  = require('gulp-webserver'),
    browserify = require('browserify'),
    tsify      = require('tsify');

//******************************************************************************
//* BUILD
//******************************************************************************
gulp.task('build', function() {

  var mainTsFilePath = "src/main.ts";
  var outputFolder   = "dist/";
  var outputFileName = "bundle.js";

  var bundler = browserify({
    debug: true,
    standalone : "tschess"
  });

  // TS compiler options are in tsconfig.json file
  return bundler.add(mainTsFilePath)
                .plugin(tsify)
                .bundle()
                .pipe(source(outputFileName))
                .pipe(buffer())
                .pipe(gulp.dest(outputFolder));
});

//******************************************************************************
//* SERVE
//******************************************************************************
gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      directoryListing: true,
      open: "http://localhost:8000/index.html",
      livereload: {
        enable: true,
        filter: function(fileName) {
          // exclude all source maps from livereload
          if (fileName.match(/.map$/)) {
            return false;
          } else {
            return true;
          }
        }
      }
    }));
});
