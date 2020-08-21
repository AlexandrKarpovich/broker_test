const 	gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		sourcemaps = require('gulp-sourcemaps'),
		notify = require('gulp-notify'),
		plumber = require('gulp-plumber'),
		del = require('del'),
		watch = require('gulp-watch'),
		browserSync = require('browser-sync').create();

// Pug
gulp.task('pug', function(callback) {
	return gulp.src('./src/pug/index.pug')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'Pug',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe( pug({
			pretty: true
		}) )
		.pipe( gulp.dest('./build/') )
		.pipe( browserSync.stream() )
	callback();
});

//SCSS
gulp.task('scss', function(callback) {
	return gulp.src('./src/scss/main.scss')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'Styles',
			        sound: false,
			        message: err.message
				}
			})
		}))
		.pipe( sourcemaps.init() )
		.pipe( sass() )
		.pipe( autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('./build/css/') )
		.pipe( browserSync.stream() )
	callback();
});

// Копирование Изображений
gulp.task('copy:img', function(callback) {
	return gulp.src('./src/img/**/*.*')
	  .pipe(gulp.dest('./build/img/'))
	callback();
});

// Копирование Скриптов
gulp.task('copy:js', function(callback) {
	return gulp.src('./src/js/**/*.*')
	  .pipe(gulp.dest('./build/js/'))
	callback();
});

// Слежение за HTML и CSS и обновление браузера
gulp.task('watch', function() {

	// Следим за картинками и скриптами и обновляем браузер
	watch( ['./build/js/**/*.*', './build/img/**/*.*'], gulp.parallel(browserSync.reload) );

	// Запуск слежения и компиляции SCSS с задержкой
	watch('./src/scss/**/*.scss', function(){
		setTimeout( gulp.parallel('scss'), 500 )
	})

	// Слежение за PUG и сборка
	watch('./src/pug/**/*.pug', gulp.parallel('pug'))

	// Следим за картинками и скриптами, и копируем их в build
	watch('./src/img/**/*.*', gulp.parallel('copy:img'))
	watch('./src/js/**/*.*', gulp.parallel('copy:js'))

});

// Задача для старта сервера из папки app
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}
	})
});

gulp.task('clean', function() {
	return del('./build')
});


// Запускаем одновременно задачи server и watch
gulp.task(
	'default', 
	gulp.series( 
		gulp.parallel('clean'),
		gulp.parallel('scss', 'pug', 'copy:img', 'copy:js'), 
		gulp.parallel('server', 'watch'), 
		)
);

