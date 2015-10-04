var gulp = require('gulp'),
    sass =  require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect')

    input = './stylesheets/**/*.scss',
    output = './public/css',
    sassOptions = {
      errLogToConsole: true,
      outputStyle: 'expanded'
    },
    autoprefixerOptions = {
      browsers: ['last 2 versions']
    }

gulp.task('webserver', function() {
  connect.server({
    port: 8888,
    livereload: true
  })
})

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
    .pipe(connect.reload())
})


gulp.task('watch', function(){
   gulp.watch(input, ['sass'])
   gulp.watch(['*.html'], ['html'])
})

gulp.task('default', ['sass', 'watch', 'webserver'])
