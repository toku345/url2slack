var gulp       = require('gulp');
var babel      = require('gulp-babel');
var babelify   = require('babelify');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');

gulp.task('build', function() {
  /* No browserify */
  // gulp.src('src/options.js')
  //   .pipe(babel())
  //   .pipe(gulp.dest('dest'));
  browserify('./src/options.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log("Error: " + err.message); })
    .pipe(source('options.js'))
    .pipe(gulp.dest('./dest'));

  browserify('./src/popup.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log("Error: " + err.message); })
    .pipe(source('popup.js'))
    .pipe(gulp.dest('./dest'));
});

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);
