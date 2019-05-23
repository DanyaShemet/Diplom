var gulp     = require('gulp'), // Подключаем Gulp
	sass     = require('gulp-sass'), //Подключаем Sass пакет,
	concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename  = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	browserSync = require('browser-sync').create(); // Подключаем Browser Sync
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/sass/**/*.sass') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('css-libs', function() {
	return gulp.src('app/libs/normalize-css/normalize.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});



gulp.task('browser-sync', () => {
  browserSync.init({
    server: { baseDir: 'app' }
  })
})

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
	.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', gulp.parallel('clean', 'img', 'sass' , function() {
	var buildCss = gulp.src( // Переносим библиотеки в продакшен
		'app/css/**/*'
		)
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))

	var buildJs = gulp.src(['app/js/**/*'])
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
}));

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/*.html', gulp.series(reload)); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', gulp.series(reload));   // Наблюдение за JS файлами в папке js
});

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'css-libs' ));

