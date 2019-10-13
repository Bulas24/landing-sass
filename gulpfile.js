var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    gulpIf = require('gulp-if'),
    browserSync = require('browser-sync').create();

const config = {
        paths : {
            scss : './src/scss/**/*.scss',
            html: './public/index.html'
        },
        output : {
            cssName : 'bundle.min.css',
            path : './public'
        },
        isDevelop : false
};

gulp.task('scss', function () {
    return gulp.src(config.paths.scss)
        .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(gulpIf(!config.isDevelop,cleanCss()))
        .pipe(gulpIf(config.isDevelop,sourcemaps.write()))
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());

});

gulp.task('serve',function () {
    browserSync.init({
        server : {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.scss, gulp.series('scss'));
    gulp.watch(config.paths.html).on('change',function () {
        browserSync.reload()
    });
});

gulp.task('default',gulp.series('scss','serve'));

