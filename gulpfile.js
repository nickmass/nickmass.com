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
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./react-client/js/'));
};

gulp.task('js', bundle);

bundler.on('update', function() { console.log('[watchify] Updating...'); });
bundler.on('update', bundle);
bundler.on('log', function(log) { console.log('[watchify] ' + log); });

gulp.task('test', function() {
	return gulp.src('spec/*.js')
		.pipe(jasmine());
});

gulp.task('dev', ['js'], function() {
	nodemon({ script: 'server.js', ext: 'js', ignore: ['react-client/**/*', 'node_modules/**/*']});
});
