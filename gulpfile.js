var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename');


gulp.task('minifyJs',['jsConcat'], function () {
    console.log("Running js minify task...");
    gulp.src('dist/js/*.js')
        .pipe(uglify()).on('error', gutil.log)
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist/js/'))

});

gulp.task('minifyCss', ['cssConcat'], function () {
    console.log("Running css minify task...");
    gulp.src('dist/style/*.css')
        .pipe(cleanCss()).on('error', gutil.log)
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('dist/style/'))

});


// Less to css and concant
gulp.task('cssConcat', function() {
    console.log("Running concat and less task...");
    return gulp.src('src/style/*.less')
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/style/'));
});


// Concat js
gulp.task('jsConcat', function () {
    console.log("Running js concat task...");
    gulp.src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('copyImg', function() {
    gulp.src('src/img/*.{ttf,woff,eof,svg,jpg}')
        .pipe(gulp.dest('dist/img/'));
});


gulp.task('build', ['minifyJs', 'minifyCss','copyImg']);