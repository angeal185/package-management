var gulp = require('gulp');
var data = require('gulp-data');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('one', function () {
  return gulp.src('./css/one.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css/build'));
});


gulp.task('compress', function () {
  return gulp.src('./css/compressed.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./css/build'));
});



gulp.task('linenos', function () {
  return gulp.src('./css/linenos.styl')
    .pipe(stylus({linenos: true}))
    .pipe(gulp.dest('./css/build'));
});


gulp.task('include-css', function() {
  return gulp.src('./css/*.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest('./'));

});


gulp.task('sourcemaps-inline', function () {
  return gulp.src('./css/sourcemaps-inline.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css/build'));
});


gulp.task('sourcemaps-external', function () {
  return gulp.src('./css/sourcemaps-external.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css/build'));
});


var data = {red: '#ff0000'};
gulp.task('pass-object', function () {
  gulp.src('./sty/main.styl')
    .pipe(stylus({ rawDefine: { data: data }}))
    .pipe(gulp.dest('./css/build'));
});


gulp.task('gulp-data', function() {
  gulp.src('./components/**/*.styl')
    .pipe(data(function(file){
      return {
        componentPath: '/' + (file.path.replace(file.base, '').replace(/\/[^\/]*$/, ''))
      };
    }))
    .pipe(stylus())
    .pipe(gulp.dest('./css/build'));
});


gulp.task('default', ['one', 'compress', 'linenos', 'sourcemaps-inline', 'sourcemaps-external', 'pass-object']);