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
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var del = require('del');
var s3 = require('s3');

var bundler = browserify({
	entries: ['./react-client/js/client.js'],
	debug: true,
	fullPaths: false
});

gulp.task('js', function() {
	return bundler
		.transform(reactify)
		.bundle()
		.on('error', function(err) {
			console.log('[error] ' + err.message);
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('css', function() {
	gulp.src(['react-client/css/normalize.css', 'react-client/css/skeleton.css', 'react-client/css/site.css'])
		.pipe(concat('bundle.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('html', function() {
	gulp.src('react-client/*.html')
		.pipe(minifyHTML())
		.pipe(gulp.dest('dist/'));
});

gulp.task('test', function() {
	return gulp.src('spec/*.js')
		.pipe(jasmine());
});

gulp.task('clean', function(cb) {
	del(['dist'], cb);
});

gulp.task('build', ['js', 'css', 'html'], function() {
});

gulp.task('deploy', ['build'], function() {
	var keys = require('./keys');
	
	var client = s3.createClient({
		s3Options: {
			accessKeyId: keys.S3AccessKey,
			secretAccessKey: keys.S3SecretKey,
			region: 'us-west-2'
		}
	});

	var params = {
		localDir: 'dist/',
		deleteRemoved: true,
		s3Params: {
			Bucket: 'files.nickmass.com',
			Prefix: 'static-files/'
		}
	};

	var uploader = client.uploadDir(params);

	uploader.on('error', function(err) {
		console.log('Unable to upload: ', err.stack);
		console.log(err);
	});

	uploader.on('end', function() {
		console.log('Upload Complete');
	});
});

gulp.task('default', ['js', 'css', 'html'], function() {
	gulp.watch('react-client/css/*.css', ['css']);
	gulp.watch('react-client/*.html', ['html']);
	gulp.watch(['react-client/**/*.js', 'react-client/**/*.jsx'], ['js']);
	nodemon({ script: 'server.js', ext: 'js jsx', ignore: ['node_modules/**/*', 'spec/**/*', 'dist/**/*']});
});
