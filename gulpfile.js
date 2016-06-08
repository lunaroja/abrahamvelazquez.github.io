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
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8'], { cascade: true }))
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
        notify: {
            styles: [
                'display: none; ',
                'pointer-events: none',
                'padding: 6px 15px 3px;',
                'position: fixed;',
                'font-size: 0.8em;',
                'z-index: 9999;',
                'left: 0px;',
                'bottom: 0px;',
                'color: rgb(74, 74, 74);',
                'background-color: rgb(17, 17, 17);',
                'color: rgb(229, 229, 229);'
            ]
        },
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
