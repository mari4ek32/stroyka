const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gulpData = require('gulp-data');
const gulpTwig = require('gulp-twig');
const gulpSass = require('gulp-sass');
const gulpRename = require('gulp-rename');
const gulpSvgSprite = require('gulp-svg-sprite');
const gulpCssNano = require('gulp-cssnano');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpAutoprefixer  = require('gulp-autoprefixer');
const gulpHtmlBeautify = require('gulp-html-beautify');
const gulpAppendPrepend = require('gulp-append-prepend');
const browserSync = require('browser-sync');
const del = require('del');
const path = require('path');
const fs = require('fs');


/**
 * Compiles twig files to html
 */
exports.makeTwigPipe = function(config) {
    return gulp.src(config.twigSrc)
        .pipe(gulpData(() => {
            const result = {};
            const files = fs.readdirSync(config.twigDataDir);

            for (let file of files) {
                result[path.basename(file, '.json')] = JSON.parse(fs.readFileSync(config.twigDataDir+'/'+file).toString());
            }

            return Object.assign(result, config.twigData);
        }))
        .pipe(gulpTwig({base: config.twigBasePath}))
        .pipe(gulpHtmlBeautify({indent_size: 4, max_preserve_newlines: 0}))
        .pipe(gulpIf(!config.pack, gulp.dest(config.distDir)));
};


/**
 * Compiles scss files to css
 */
exports.makeSassPipe = function(config) {
    let prependText = '//\n';

    if (config.direction) {
        prependText += '$direction: '+config.direction+';\n';
        prependText += '$both-directions: false;\n';
    }

    if (config.theme !== 'default') {
        prependText += '@import "themes/'+config.theme+'";\n';
    }

    return gulp.src(config.sassSrc)
        .pipe(gulpIf(!config.production, gulpSourcemaps.init()))
        .pipe(gulpIf(config.pack, gulpAppendPrepend.prependText(prependText)))
        .pipe(gulpSass({outputStyle: 'expanded'}))
        .pipe(gulpAutoprefixer({
            browsers: [
                'last 2 versions',
                'IE 11',
                'Firefox ESR'
            ]
        }))
        .pipe(gulpIf(config.production, gulpCssNano()))
        .pipe(gulpIf(!config.production, gulpSourcemaps.write('./')))
        .pipe(gulpRename(path => path.dirname = `css/${path.dirname}`))
        .pipe(gulpIf(!config.pack, gulp.dest(config.distDir)));
};


/**
 * Copies vendor directory to dist directory
 */
exports.makeVendorPipe = function(config) {
    return gulp.src(config.vendorSrc)
        .pipe(gulpRename(path => path.dirname = `vendor/${path.dirname}`))
        .pipe(gulpIf(!config.pack, gulp.dest(config.distDir)));
};


/**
 * Compiles svg sprite
 */
exports.makeSvgPipe = function(config) {
    return gulp.src(config.svgSrc)
        .pipe(gulpSvgSprite({
            mode: {
                symbol: {
                    dest: '',
                    sprite: config.svgFileName,
                    prefix: 'svg-%s'
                }
            }
        }))
        .pipe(gulpRename(path => path.dirname = `images/${path.dirname}`))
        .pipe(gulpIf(!config.pack, gulp.dest(config.distDir)));
};


/**
 * Copies images to dist directory
 */
exports.makeImagesPipe = function(config) {
    return gulp.src(config.imagesSrc)
        .pipe(gulpRename(path => path.dirname = `images/${path.dirname}`))
        .pipe(gulpIf(!config.pack, gulp.dest(config.distDir)));
};


/**
 * Compiles js
 */
exports.makeJsPipe = function(config) {
    return gulp.src(config.jsSrc)
        .pipe(gulpRename(path => path.dirname = `js/${path.dirname}`))
        .pipe(gulpIf(!config.pack, gulp.dest(config.distDir)));
};


/**
 * Copies fonts to dist directory
 */
exports.makeFontsPipe = function(config) {
    return gulp.src(config.fontsSrc)
        .pipe(gulpRename(path => path.dirname = `fonts/${path.dirname}`))
        .pipe(gulpIf(!config.pack, gulp.dest(config.distDir)));
};


/**
 * Makes tasks for gulp
 */
exports.makeTasks = function(config) {
    const server = browserSync.create();
    // tasks
    const twigTask = function twig() { return exports.makeTwigPipe(config); };
    const sassTask = function sass() { return exports.makeSassPipe(config).pipe(server.stream()); };
    const vendorTask = function vendor() { return exports.makeVendorPipe(config); };
    const svgTask = function svg() { return exports.makeSvgPipe(config); };
    const imagesTask = function images() { return exports.makeImagesPipe(config); };
    const jsTask = function js() { return exports.makeJsPipe(config); };
    const fontsTask = function fonts() { return exports.makeFontsPipe(config); };

    /**
     * Removes the dist directory
     */
    const cleanTask = function() {
        return del([config.distDir]);
    };

    /**
     * Reloads page in browser
     */
    const reloadTask = function(done) {
        server.reload();
        done();
    };

    /**
     * Builds a template
     */
    const buildTask = gulp.series(cleanTask, gulp.parallel(
        twigTask, sassTask, vendorTask, svgTask, imagesTask, jsTask, fontsTask
    ));

    /**
     * Builds a template and watch for files changes
     */
    const watchTask = function() {
        gulp.watch(config.twigWatch, {ignoreInitial: false}, gulp.series(twigTask, reloadTask));
        gulp.watch(config.sassWatch, {ignoreInitial: false}, sassTask);
        gulp.watch(config.vendorWatch, {ignoreInitial: false}, gulp.series(vendorTask, reloadTask));
        gulp.watch(config.svgWatch, {ignoreInitial: false}, gulp.series(svgTask, reloadTask));
        gulp.watch(config.imagesWatch, {ignoreInitial: false}, gulp.series(imagesTask, reloadTask));
        gulp.watch(config.jsWatch, {ignoreInitial: false}, gulp.series(jsTask, reloadTask));
        gulp.watch(config.fontsWatch, {ignoreInitial: false}, gulp.series(fontsTask, reloadTask));
    };

    /**
     * Runs a local http server
     */
    const startServerTask = function(done) {
        server.init(config.browserSync);
        done();
    };

    /**
     * Runs a local http server and watch for files changes
     */
    const serveTask = gulp.series(startServerTask, watchTask);

    return {
        twig: twigTask,
        sass: sassTask,
        vendor: vendorTask,
        svg: svgTask,
        images: imagesTask,
        js: jsTask,
        fonts: fontsTask,
        clean: cleanTask,
        build: buildTask,
        watch: watchTask,
        serve: serveTask,
        default: buildTask
    };
};
