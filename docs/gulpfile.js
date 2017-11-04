var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  changed = require('gulp-changed'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  size = require('gulp-size'),
  sass = require('gulp-sass'),
  cssmin = require('gulp-cssmin'),
  autoprefixer = require('gulp-autoprefixer'),
  imageop = require('gulp-image-optimization'),
  stylish = require('jshint-stylish'),
  package = require('./package.json'),
  browserSync = require('browser-sync'),
  del = require('del'),
  reload = browserSync.reload;

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ''
    }
  });
});

gulp.task('styles', function() {
  return gulp.src('src/sass/demo.scss')
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 1%', 'Firefox >= 20', 'Firefox < 20', 'Firefox ESR', 'Opera > 0', 'Explorer > 0'],
      cascade: true,
      remove: false
    }))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'))
    .pipe(size({ showFiles: true }))
    .pipe(reload({ stream: true }));
});

gulp.task('scripts', function() {
  return gulp.src(['src/js/vendors/*.js', 'src/js/demo.js'])
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('demo.js'))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({ stream: true }));
});

gulp.task('emergence', function() {
  return gulp.src(['../dist/emergence.js', '../dist/emergence.min.js'])
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('lint', function() {
  return gulp.src('src/js/demo.js')
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function(cb) {
  del(['dist/css/*.css', 'dist/js/*.js'], cb);
});

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts', browserSync.reload]);
});

gulp.task('default', ['browser-sync', 'lint', 'styles', 'scripts', 'emergence', 'watch']);

gulp.task('img-dist', function() {
  return gulp.src([
      'src/images/*.png',
      'src/images/*.jpg',
      'src/images/*.jpeg',
      'src/images/*.gif',
      'src/images/*.ico',
      'src/images/*.svg'
    ])
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('img', ['img-dist'], function(cb) {
  gulp.src([
      'dist/images/**/*.png',
      'dist/images/**/*.jpg',
      'dist/images/**/*.jpeg',
      'dist/images/**/*.gif'
    ])
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(changed('dist/images/**/*'))
    .pipe(imageop({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('dist/images'))
    .on('end', cb)
    .on('error', cb);
});

gulp.task('img-clean', function(cb) {
  del(['dist/images/**/*'], cb);
});
