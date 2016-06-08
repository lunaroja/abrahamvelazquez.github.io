var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var child_process = require('child_process');
var del = require('del');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('clean', function () {
  return del([
    '_site'
  ]);
});
gulp.task('sass', function () {
    return gulp.src('_scss/*.scss')
        .pipe(sass({
            includePaths: ['scss'],
            outputStyle: 'compressed',
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 2 versions']))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('_site/assets/css'));
});

gulp.task('jekyll-build', ['clean'], function (done) {
    browserSync.notify(messages.jekyllBuild);
    return child_process.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch(['**/*', '!_site/**', '!node_modules/**'], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);
