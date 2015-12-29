var browserSync = require('browser-sync');


/**
 * 刷新游览器任务
 */
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'Sevice'
    },
  });
});


gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['browserSync']);
  // Other watchers
})