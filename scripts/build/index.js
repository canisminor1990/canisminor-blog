import frontMatter from 'front-matter'
import path from 'path'
import fs from 'fs-extra'

const pathSrc = './src'
const pathDist = './dist'

export default () => {
	const files = fs.readdirSync(pathSrc)
	return files.forEach(item => {
		const data = fs.readFileSync(path.join(pathSrc,item),'utf-8')
		const parsed = frontMatter(data);
		const json = {...parsed.attributes}
		json.body = parsed.body.replace(/^`````([\w\:]+)$/gm, '`````$1-');
		fs.writeFileSync(path.join(pathDist,item.replace('.md','.json')),JSON.stringify(json))
	})
}