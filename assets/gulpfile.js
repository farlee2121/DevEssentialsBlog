/* 
 * Use `npm install` to install all the dependencies located in package.json 
 * Then `gulp default` to minimize css and images.
 */
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const gutil = require('gulp-util');
const shell = require('gulp-shell');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin')
const replace = require('gulp-replace');
var sass = require('gulp-sass')(require('sass'));


gulp.task('js', function () {
    gutil.log('... Minifying js');
    return gulp.src(['js/partials/**.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .on('error', (err) => {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest("js/"))
});

gulp.task("img", function () {
    gutil.log('... Minifying images');
    return gulp.src('img/**/*.{png,svg,jpg,gif}')
        .pipe(imagemin())
        .on('error', (err) => {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest('img/'))
});

gulp.task('minify-bootstrap-css', function () {
    gutil.log('... Minifying isolated bootstrap');
    return gulp.src('css/vendor/bootstrap-iso.css')
        .pipe(cssmin())
        .on('error', (err) => {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(concat('bootstrap-iso.min.css'))
        .pipe(gulp.dest('css/vendor/'));
})

gulp.task("isolate-bootstrap-css", function () {
    gutil.log('... Generating isolated bootstrap');
    return gulp.src('css/bootstrap-iso.scss')
        .pipe(sass())
        .pipe(replace('.bootstrap-iso html', ''))
        .pipe(replace('.bootstrap-iso body', ''))
        .pipe(gulp.dest('css/vendor/'));
});

gulp.task('remove-unused-css', () => {
    return gulp
        .src('src/**/*.css')
        .pipe(
            purgecss({
                content: ['src/**/*.html']
            })
        )
        .pipe(gulp.dest('build/'));
});

gulp.task("serve", function () {
    gutil.log('... Launching Web browser');
    gutil.log('... Starting Jelyll');
    let task = shell.task([
        "python -m webbrowser 'http://localhost:4000/Type-on-Strap/'; cd .. && bundle exec jekyll serve --watch"
    ])
    gutil.log('... If you still see this, it might not be working well');
    return task;
});

gulp.task("theme-default", gulp.parallel(['js', 'img']), function () {
    return gutil.log('... Gulp is running!');
});



//NOTE: I moved the bootstrap isolation to the sass folder so it's done as part of the build. 
//   We can move it back to a one-off task if it increases the build time too much. The file shouldn't change often and regenerating it is simple
gulp.task("default", gulp.series(['isolate-bootstrap-css', 'minify-bootstrap-css']), function () {
    return gutil.log('... Gulp is running!');
});