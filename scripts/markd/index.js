import gulp from 'gulp'
import markdown from 'gulp-marked-json'
import nunjucks from 'gulp-nunjucks-render'
import nunjucksENV from '../nunjucks'

export default () => {
	return gulp.src('./src/**/*.md')
			.pipe(nunjucks({
				ext: '.md',
				manageEnv: nunjucksENV
			}))
			.pipe(markdown({
				pedantic: true,
				smartypants: true,
			}))
			.pipe(gulp.dest('./dist'))
}