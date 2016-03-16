var gulp 		= require('gulp');
var sass		= require('gulp-ruby-sass');
var babel		= require('gulp-babel');
var browserSync = require('browser-sync').create();
var reload 		= browserSync.reload;
var debug 		= require('gulp-debug');
var uglify		= require('gulp-uglify');

gulp.task('sass', function() {
	return sass('app/src/scss/style.scss')
			.pipe(gulp.dest('app/dist/css/'))
			.pipe(reload({ stream:true }));
});

gulp.task('scripts', function() {
	return gulp.src('app/src/js/app.js')
		.pipe(debug({title : 'unicorn'}))
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('app/dist/js'));
});

gulp.task('serve', ['sass', 'scripts'], function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		ghostMode: { scroll: false },
		startPath: 'dist',
		minify: true
	});

	gulp.watch('app/src/scss/*.scss', ['sass']);
	gulp.watch('app/src/js/app.js', ['scripts']);
	gulp.watch(['app/dist/*.html', 'app/dist/css/*.css', 'app/dist/js/*.js'], {cwd: './'}, reload);
});

gulp.task('ghostMode');
gulp.task('default', ['serve']);
