const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const jsonminify = require('gulp-jsonminify');
const concat = require('gulp-concat');
const { deleteAsync } = require('del');
const { Transform } = require('stream');

let cssContent = '';
let jsContent = '';

function clean() {
  return deleteAsync(['dist']);
}

function compileCSS() {
  return gulp.src('css/*.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(new Transform({
      objectMode: true,
      transform(file, enc, cb) {
        cssContent = file.contents.toString();
        cb(null, file);
      }
    }));
}

function compileJS() {
  return gulp.src([
    'js/data.js',
    'js/components.js',
    'js/projects.js',
    'js/case-study.js',
    'js/form.js',
    'js/navbar.js',
    'js/particles.js',
    'js/theme.js',
    'js/main.js'
  ])
    .pipe(concat('bundle.js'))
    .pipe(terser())
    .pipe(new Transform({
      objectMode: true,
      transform(file, enc, cb) {
        jsContent = file.contents.toString();
        cb(null, file);
      }
    }));
}

function html() {
  return gulp.src('index.html')
    .pipe(new Transform({
      objectMode: true,
      transform(file, enc, cb) {
        let html = file.contents.toString();

        html = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/gi, '');
        html = html.replace('</head>', `<style>${cssContent}</style></head>`);
        html = html.replace(/<script[^>]*src="[^"]*bundle\.js"[^>]*>[\s\S]*?<\/script>/gi, '');
        html = html.replace('</body>', `<script>${jsContent}</script></body>`);

        file.contents = Buffer.from(html);
        cb(null, file);
      }
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: false
    }))
    .pipe(gulp.dest('dist'));
}

function sw() {
  return gulp.src('sw.js')
    .pipe(terser())
    .pipe(gulp.dest('dist'));
}

function manifest() {
  return gulp.src('manifest.webmanifest')
    .pipe(jsonminify())
    .pipe(gulp.dest('dist'));
}

function sitemap() {
  return gulp.src('sitemap.xml')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist'));
}

function copyStatic() {
  return gulp.src([
    'robots.txt',
    'favicon-32x32.png',
    'favicon-16x16.png',
    'favicon.ico',
    'apple-touch-icon.png',
    'android-chrome-512x512.png',
    'android-chrome-192x192.png',
    'netlify.toml'
  ], { encoding: false }).pipe(gulp.dest('dist'));
}

const build = gulp.series(
  clean,
  gulp.parallel(compileCSS, compileJS),
  gulp.parallel(html, sw, manifest, sitemap, copyStatic)
);

exports.clean = clean;
exports.compileCSS = compileCSS;
exports.compileJS = compileJS;
exports.html = html;
exports.sw = sw;
exports.manifest = manifest;
exports.sitemap = sitemap;
exports.copyStatic = copyStatic;
exports.build = build;
exports.default = build;