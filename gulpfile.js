"use strict"

// -- DEPENDENCIES -------------------------------------------------------------
var gulp    = require('gulp');
var coffee  = require('gulp-coffee');
var concat  = require('gulp-concat');
var connect = require('gulp-connect');
var header  = require('gulp-header');
var uglify  = require('gulp-uglify');
var gutil   = require('gulp-util');
var pkg     = require('./package.json');

if(typeof Utyl == "undefined")
  require("./source/utyl/utyl.js");

// -- FILES --------------------------------------------------------------------
var assets  = './public/assets';
var source  = {
  client:   [
    'source/client/main.coffee',
    'source/client/config.coffee',
    'source/client/chat/*.coffee',
    'source/client/login/*.coffee'
  ],
  server: [
    'source/server/*.coffee',
  ],
};

var banner  = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link    <%= pkg.homepage %>',
  ' * @author  <%= pkg.author.name %> (<%= pkg.author.site %>)',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// -- TASKS --------------------------------------------------------------------
gulp.task('client', function()
{
  gulp.src(source.client)
    .pipe(concat(pkg.name.toLowerCase() +'.coffee'))
    .pipe(coffee().on('error', gutil.log))
    //.pipe(uglify({mangle: false}))//Comment this to debug
    .pipe(gulp.dest(assets+"/js"))
    .pipe(connect.reload());
});

gulp.task('server', function()
{
  gulp.src(source.server)
    .pipe(concat('core.coffee'))
    .pipe(coffee().on('error', gutil.log))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./bin'))
    .pipe(connect.reload());
});

gulp.task('init', function()
{
  gulp.run(['client']);
  gulp.run(['server']);
});

gulp.task('default', function()
{
  gulp.run(['init']);
  new require("./bin/core")({env: "production"});
});

gulp.task('dev', function()
{
  gulp.run(['init']);
  new require("./bin/core")({env: "development"});
  gulp.watch(source.client, ['client']);
});
