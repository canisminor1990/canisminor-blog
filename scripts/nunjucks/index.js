import addTag from './addTag'
import filters from './filters'
import tags from './tags'

export default (env) => {
	for (let name in filters) {
		env.addFilter(name, filters[name]);
	}
	for (let name in tags) {
		addTag(env, name, tags[name], {ends: true})
	}
	env.opts.autoescape = false;
}