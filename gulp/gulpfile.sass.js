var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');

var input = './stylesheets/**/*.scss';
var output = './public/css';

gulp.task('compile', function () {
  return gulp
    .src(input)
    .pipe(sass())
    .pipe(gulp.dest(output));
});

gulp.task('sourcemaps', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output));
});

gulp.task('Autoprefixer ', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
    .pipe(sassdoc())
    .resume();
});

gulp.task('default', ['compile', 'sourcemaps', 'Autoprefixer ']);