import frontMatter from 'front-matter';
import path from 'path';
import fs from 'fs-extra';
import _ from 'lodash';

const pathSrc  = './src';
const pathDist = './dist';

export default () => {
	const files = fs.readdirSync(pathSrc);
	return files.forEach(item => {
		const data   = fs.readFileSync(path.join(pathSrc, item), 'utf-8');
		const parsed = frontMatter(data);
		const json   = {...parsed.attributes};
		json.filename = item.replace('.md', '')
		json.tag=_.compact(json.tag.split(' '))
		json.body    = parsed.body.replace(/^`````([\w\:]+)$/gm, '`````$1-').replace(/(\n){3,}/g,'\n\n')
		json.body = json.body.replace(/(#(.*))\n/,(m,m1)=> {
			json.title = m1.replace("#",'').replace(/^ /,'')
			return m.replace(m1,'')
		})
		fs.writeFileSync(path.join(pathDist, item.replace('.md', '.json')), JSON.stringify(json));
	});
}