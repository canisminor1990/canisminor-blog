import gulp from 'gulp';
import runSequence from 'run-sequence'
import del from 'del';
import buildToc from "./scripts/toc";
import buildFiles from "./scripts/build";
import addHash from './scripts/timestamp'

gulp.task('del', () => del.sync(["dist/**/*"]));

gulp.task('add:hash', addHash);

gulp.task('build:files', buildFiles);

gulp.task('build:toc', buildToc);

gulp.task('build', () => {
	return runSequence(
			[
				'del',
				'add:hash',
				'build:files',
			]
	)
});