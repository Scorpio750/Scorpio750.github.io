var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var debug = require('gulp-debug');
var uglify = require('gulp-uglify');

gulp.task('sass', function() {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css/'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('scripts', function() {
	return gulp.src('src/js/app.js')
		.pipe(debug({
			title: 'unicorn'
		}))
		.pipe(babel({
			presets: ['es2015']
		}))
		// .pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('serve', ['sass', 'scripts'], function() {
	browserSync.init({
		server: {
			baseDir: '.'
		},
		ghostMode: {
			scroll: false
		},
		minify: false
	});

	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch(['*.html', 'dist/js/*.js'], {
		cwd: './'
	}, reload);
});

gulp.task('ghostMode');
gulp.task('default', ['serve']);
