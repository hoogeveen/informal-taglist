'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	browserify = require('gulp-browserify');

gulp.task('scripts', function(){
	gulp.src('src/js/index.js')
	.pipe(browserify({
		insertGlobals: true
	})).pipe(gulp.dest('public/js'));
});

gulp.task('sass', function () {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function(){
	gulp.watch(['src/**/*.js', 'src/**/*.json'], ['scripts']);
	gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);
