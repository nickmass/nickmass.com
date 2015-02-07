var gulp = require('gulp');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var jasmine = require('gulp-jasmine');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

var bundler = watchify(browserify({
	entries: ['./react-client/js/app.js'],
	debug: true
}, watchify.args));

var bundle = function() {
	return bundler
		.transform(reactify)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
	//	.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js/'));
};

gulp.task('js', bundle);

bundler.on('update', function() { console.log('[watchify] Updating...'); });
bundler.on('update', bundle);
bundler.on('log', function(log) { console.log('[watchify] ' + log); });

gulp.task('css', function() {
	gulp.src(['./react-client/css/normalize.css', './react-client/css/skeleton.css', './react-client/css/site.css'])
		.pipe(concat('bundle.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('html', function() {
	gulp.src('./react-client/*.html')
		.pipe(gulp.dest('./dist/'));
});

gulp.task('test', function() {
	return gulp.src('spec/*.js')
		.pipe(jasmine());
});

gulp.task('dev', ['js', 'css', 'html'], function() {
	var cssWatch = gulp.watch('./react-client/css/*.css', ['css']);
	cssWatch.on('change', function(event) {
		console.log('[gulp] Bundling CSS');
	});

	var htmlWatch = gulp.watch('./react-client/*.html', ['html']);
	htmlWatch.on('change', function(event) {
		console.log('[gulp] Moving HTML');
	});
	nodemon({ script: 'server.js', ext: 'js', ignore: ['react-client/**/*', 'node_modules/**/*', 'spec/**/*', 'dist/**/*']});
});
