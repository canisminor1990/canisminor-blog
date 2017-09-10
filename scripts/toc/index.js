import fs from 'fs-extra'
import path from 'path'

const pathDist = './dist'

const sortNumber = (a, b) => b.split('_')[0] - a.split('_')[0]

export default (cb) => {
	const files = fs.readdirSync(pathDist)
	let tocData = []
	files.sort(sortNumber).forEach(item => {
		if (item !== "toc") {
			const newName = item.split(".")[0];
			fs.renameSync(path.join(pathDist, item), path.join(pathDist, newName))
			let data = JSON.parse(fs.readFileSync(path.join(pathDist, newName)))
			tocData.push({
				filename: newName,
				title: data.title,
				tag: data.tag || "",
				cover: data.cover || ""
			})
		}
	})
	fs.writeFileSync(path.join(pathDist, 'toc'), JSON.stringify(tocData))
	cb();
}