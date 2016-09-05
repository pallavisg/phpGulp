var gulp = require('gulp');
var config = require('./gulp.config');
var util = require('util');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy:true});

var ignore = require('gulp-ignore');
var uglify = require('gulp-uglifyjs');

//var connect = require('gulp-connect-php');
var browserSync = require('browser-sync');


//GULP-RIMRAF
gulp.task('rimraf-it', function() {
  return gulp.src(config.rimraf2clean , { read: false }) 
    .pipe(ignore('node_modules/**'))
    .pipe($.rimraf());
});



//GULP-COMPOSER
gulp.task('composer', function () {
    $.composer('require "squizlabs/php_codesniffer=*"', {});
    $.composer('require `"neuralys/sonar-runner": "^2.4"`', {});
    $.composer('require "theseer/phpdox=*"', {});
    $.composer('require "sebastian/phpcpd=*"', {});
    $.composer('require "phpunit/phpunit=*"', {});
    $.composer(); //default install
    $.composer('dumpautoload', {optimize: true});
    
});


//GULP-BOWER 

gulp.task('bower', function() {
  return $.bower()
});

gulp.task('dev', ['rimraf-it','bower','composer']);


//GULP-CONNECT-PHP with BROWSER-SYNC
gulp.task('connect-sync', function() {
  connect.server({}, function (){
    browserSync({
      proxy: '127.0.0.1:8001'
       });
  });

  gulp.watch('**/*.php').on('change', function () {
    browserSync.reload();
  });
});



//PHPUnit
gulp.task('phpunit',function() {
    gulp.src('phpunit.xml')
      .pipe($.phpunit('', {notify: true}));
  });

//PHP-CodeSniffer
gulp.task('checkstyle',function () {    
 return gulp.src(config.configphp)
        .pipe(ignore(config.ignore))
        .pipe($.phpcs({bin: 'vendor/bin/phpcs', standard: 'PSR2', warningSeverity: 0}))
        .pipe($.phpcs.reporter('log'));
});

//PHPCPD
gulp.task('cpd',function () {
    return gulp.src(config.configphp)
        .pipe($.phpcpd({bin:'./vendor/bin/phpcpd',minLines: 20 , minTokens: 100 , verbose: true, reportFile: './phpcpd-Reports/phpcpd.xml'}));
    });

//SonarQube
gulp.task('sonar',function () {       
    return gulp.src(config.configphp)
       .pipe($.sonar(config.options))
       .on('error', util.log);
});


//PHPDOX
gulp.task('phpdox', function() {
    gulp.src(config.concatsrc)
    .pipe($.phpdox())
    .pipe(gulp.dest('doc/'));
});

//JSHint 
gulp.task('jshint', function() {
   
    return gulp.src(config.configjs)
           .pipe(ignore('bower_components/**'))
           .pipe($.if(args.verbose, $.print()))
           .pipe($.jshint())
           .pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
           .pipe($.jshint.reporter());
});

//CSSLint
gulp.task('csslint', function() {
  return gulp.src(config.configcss)
    .pipe($.csslint())
    .pipe($.csslint.reporter());
});

//HTMLHint
gulp.task('htmlhint', function () {
    return gulp.src(config.confightml)
    .pipe($.htmlhint())
    .pipe($.htmlhint.failReporter())
});

//.pipe(htmlhint.reporter());


//GULP-CONCAT
gulp.task('concat',function() {
      return gulp.src(config.concatsrc)
    .pipe($.concat({ path: 'new.php', stat: { mode: 777 }}))
    .pipe(gulp.dest('concat/'));
});



//Gulp-Uglify

gulp.task('uglify', function() {
  return gulp.src(config.configJs)
    .pipe(ignore('node_modules/**'))
    .pipe(uglify())
    .pipe(gulp.dest('uglify_dest/'));
});

//GULP-MINIFY-HTML

gulp.task('minify-html',function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src(config.confightml)
    .pipe(ignore('node_modules/**'))
    .pipe($.minifyHtml(opts))
    .pipe(gulp.dest('minifyHTML_dest/'));
});


//GULP-MINIFY-CSS
 
gulp.task('minify-css', function() {
  return gulp.src(config.configcss)
    .pipe(ignore('node_modules/**'))
    .pipe($.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('minifyCSS_dest/'));
});



gulp.task( 'ci',['phpunit','checkstyle','cpd','sonar','phpdox','jshint','csslint','htmlhint','concat','uglify','minify-html','minify-css']);




