import fs from 'fs-extra'
import path from 'path'

const pathDist = './dist'

const sortNumber = (a, b) => b.split('#')[0] - a.split('#')[0]

export default (cb) => {
	const files = fs.readdirSync(pathDist)
	let tocData = []
	files.sort(sortNumber).forEach(item => {
		if (item !== "toc.json") {
			let data = JSON.parse(fs.readFileSync(path.join(pathDist, item)))
			tocData.push({
				filename: item,
				title: data.title,
				tag: data.tag || "",
				cover: data.cover || ""
			})
		}
	})
	fs.writeFileSync(path.join(pathDist, 'toc.json'), JSON.stringify(tocData))
	cb();
}