var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var watch       = require('gulp-watch');
var sourcemaps  = require('gulp-sourcemaps');
var ngHtml2Js   = require("gulp-ng-html2js");

gulp.task('scripts', function() {
  gulp.src(['./app_frontend/*.js', './app_frontend/controllers/*.js', './app_frontend/services/*.js', './app_frontend/directives/*.js', '!./app_frontend/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('./main.js'))
    //.pipe(uglify({mangle: true})) //Uncomment on production
    .pipe(gulp.dest('app_frontend'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app_frontend'));

});

gulp.task('watch', function() {
  watch(['./app_frontend/*.js', './app_frontend/controllers/*.js', './app_frontend/services/*.js', './app_frontend/directives/*.js', '!./app_frontend/main.js'], function () {
    gulp.start('scripts');
  })
});

gulp.task('default', ['scripts', 'watch']);
