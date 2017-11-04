var gulp = require('gulp'),
  clean = require('gulp-clean'),
  header = require('gulp-header'),
  jshint = require('gulp-jshint'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  size = require('gulp-size'),
  stylish = require('jshint-stylish'),
  package = require('./package.json');

var paths = {
  output: 'dist/',
  scripts: 'src/emergence.js'
};

var banner = [
  '/*! ',
  '<%= package.name %> ',
  'v<%= package.version %> | ',
  '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
  ' <%= package.homepage %>',
  ' */',
  '\n'
].join('');

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(header(banner, { package: package }))
    .pipe(gulp.dest(paths.output))
    .pipe(size({ showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(size({ showFiles: true }))
    .pipe(header(banner, { package: package }))
    .pipe(gulp.dest(paths.output))
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function() {
  return gulp.src(paths.output, { read: false })
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['default']);
});

gulp.task('default', [
  'lint',
  'clean',
  'scripts',
  'watch'
]);
