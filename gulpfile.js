const args = require("yargs").argv;
const { src, dest, watch, series } = require("gulp");
const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const sass = gulpSass(dartSass);
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require('browser-sync');
const minify = require("gulp-minify");
const concat = require("gulp-concat");
const spawn = require('child_process').spawn;
const del = require('del');

const isDev = !!args.dev;


const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};
function clean (){
return del([
    '_site'
    ]);
}

function style() {
    return src('_scss/*.scss')
        .pipe(sass({
            includePaths: ['scss'],
            outputStyle: 'compressed',
            onError: browserSync.notify
        }))
        .pipe(autoprefixer(['last 2 versions']))
        .pipe(dest('assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(dest('_site/assets/css'));
}
function js() {
    return src([
      "_js/index.js",
    ])
      .pipe(concat("scripts.js"))
      .pipe(
        minify({
          ext: {
            min: '.js'
          },
          noSource: !isDev,
        }),
      )
      .pipe(dest("_site/assets/js/"));
  }

function jekyllBuild(done) {
    browserSync.notify(messages.jekyllBuild);
    return spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
}
function jekyllRebuild() {
    browserSync.reload();
}

function sync (){
    sync({
        server: {
            baseDir: '_site'
        }
    });
}

function watcher(done) {
    // watch(["./scss/**/*.scss"], series(style));
    // watch(["./js/**/*.js"], series(js));
    done();
  }
  


exports.default = isDev ? series(jekyllBuild, style, js, watcher) : series(jekyllBuild, style, js);
