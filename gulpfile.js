var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var watch       = require('gulp-watch');
var sourcemaps  = require('gulp-sourcemaps');
var ngHtml2Js   = require("gulp-ng-html2js");

gulp.task('scripts', function() {
  gulp.src(['./app_client/*.js', './app_client/controllers/*.js', './app_client/services/*.js', './app_client/directives/*.js', '!./app_client/app.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('./app.js'))
    //.pipe(uglify({mangle: true})) //Uncomment on production
    .pipe(gulp.dest('app_client'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app_client'));

});

gulp.task('watch', function() {
  watch(['./app_client/*.js', './app_client/controllers/*.js', './app_client/services/*.js', './app_client/directives/*.js', '!./app_client/app.js'], function () {
    gulp.start('scripts');
  })
});

gulp.task('default', ['scripts', 'watch']);
