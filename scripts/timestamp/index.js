import fs from 'fs-extra'
import path from 'path'
import moment from 'moment'
const pathSrc = './src'

export default () => {
	const files = fs.readdirSync(pathSrc)
	return files.forEach(item => {
		if (item.split('_').length < 2) {
			const newName = `${moment().format('YYYYMMDDhhmmss')}_${item}`;
			fs.renameSync(path.join(pathSrc, item), path.join(pathSrc, newName))
			console.log("✔", item, "=>", newName)
		}
	});
}