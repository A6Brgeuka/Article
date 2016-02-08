'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

//var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('js', function () {
  return gulp.src(['public/app/**/*.module.js', 'public/app/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

gulp.task('build', gulp.series('js'));

gulp.task('watch', function () {
  gulp.watch(['public/app/**/*.module.js', 'public/app/**/*.js'], gulp.series('build'));
});

gulp.task('dev', gulp.series('build', 'watch'));
