var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Less task to compile the less files and add the banner
function lessTask() {
    return gulp.src('less/grayscale.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// Minify CSS
function minifyCSS() {
    return gulp.src('css/grayscale.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// Minify JS
function minifyJS() {
    return gulp.src('js/grayscale.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// Copy Bootstrap core files
function bootstrap() {
    return gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))
}

// Copy jQuery core files
function jquery() {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))
}

// Copy Font Awesome files
function fontawesome() {
    return gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
}

// Configure the browserSync task
function browserSyncTask(done) {
    browserSync.init({
        server: {
            baseDir: ''
        },
    });
    done();
}

// Watch task
function watchTask() {
    gulp.watch('less/*.less', lessTask);
    gulp.watch('css/*.css', minifyCSS);
    gulp.watch('js/*.js', minifyJS);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);
}

// Define complex tasks
const vendor = gulp.parallel(bootstrap, jquery, fontawesome);
const build = gulp.series(lessTask, gulp.parallel(minifyCSS, minifyJS), vendor);
const watch = gulp.series(build, gulp.parallel(watchTask, browserSyncTask));

// Export tasks
exports.less = lessTask;
exports.css = minifyCSS;
exports.js = minifyJS;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;