"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer");

/*
 |--------------------------------------------------------------------------
 | Compile & autoprefix CSS
 |--------------------------------------------------------------------------
 */
gulp.task("css", function() {
  return gulp.src("css/style.scss")
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(autoprefixer({browsers: ["> 1%", "last 3 versions", "Firefox ESR"]}))
    .pipe(gulp.dest("css/"));
});

/*
 |--------------------------------------------------------------------------
 | Concat + Uglify JS
 |--------------------------------------------------------------------------
 */
gulp.task("js", function() {
  // TODO:
});

/*
 |--------------------------------------------------------------------------
 | Watch style
 |--------------------------------------------------------------------------
 */
gulp.task("watch", function() {
  gulp.watch("./css/**/*.scss", ["css"]);
});
