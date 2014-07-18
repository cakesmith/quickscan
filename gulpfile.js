// Plugins supplied by ionic start
var _ = require('lodash');
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');

var bower = require('bower');
var sh = require('shelljs');
var mainBowerFiles = require('main-bower-files');
var karma = require('karma').server;
var stylish = require('jshint-stylish');


gulp.task('default', [
  'sass',
  'tdd']);

var paths = {
  sass: ['./scss/**/*.scss'],
  src : ['./www/js/**/!(*spec).js'],
  spec: ['./www/js/**/*.spec.js'],
  html: ['./www/**/*.html']
};

var bowerFiles = mainBowerFiles().concat(paths.spec.concat(paths.src));

var karmaConf = {
  frameworks: ['jasmine'],
  reporters : ['dots'],
  browsers  : ['PhantomJS'],
  files     : bowerFiles,
  port      : 8080

};

// One shot test run
gulp.task('test', function (done) {
  karma.start(_.extend(karmaConf, {singleRun: true}), done);
});

// Continuous testing
gulp.task('tdd', function (done) {
  gulp.watch(paths.spec.concat(paths.src), ['lint', 'test']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'www',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(paths.html.concat(paths.src))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(paths.html.concat(paths.src), ['html']);
});

gulp.task('serve', ['connect', 'watch']);

gulp.task('lint', [
  'specLint',
  'srcLint'
]);

gulp.task('specLint', function () {
  return gulp.src(paths.spec)
    .pipe(jshint('./.jshintrc-spec'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('srcLint', function () {
  return gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./app/css/'))
    .on('end', done);
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
        '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
        '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
