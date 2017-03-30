var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var deporder = require('gulp-deporder');
var stripdebug = require('gulp-strip-debug');

devBuild = (process.env.NODE_ENV !== 'production'),


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task('sass', function(){
  return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('images', function(){
  return gulp.src('images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('img'))
});


gulp.task('useref', function(){
  return gulp.src('*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    // .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('./'))
});

// JavaScript processing
gulp.task('js', function() {

  var jsbuild = gulp.src('js/*.js')
    .pipe(deporder())
    .pipe(concat('main.min.js'));

  jsbuild = jsbuild
    // .pipe(stripdebug())
    .pipe(uglify())
    .pipe(browserSync.reload({
      stream: true
    }));

  return jsbuild.pipe(gulp.dest('js/dist/'));

})


// Gulp watch syntax
gulp.task('watch',  ['browserSync', 'sass'], function(){
  gulp.watch('sass/*.scss', ['sass'], browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/*.js', ['js'], browserSync.reload);
})
