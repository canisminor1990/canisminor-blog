import fs from 'fs-extra'
import path from 'path'

const addZero = (num) => {
	num = num.toString()
	return (num.length === 1 ) ? '0' + num : num
}

const addTimeHash = () => {
	const nowDate = new Date(),
			year = addZero(nowDate.getFullYear()),
			month = addZero(nowDate.getMonth() + 1),
			day = addZero(nowDate.getDate()),
			hour = addZero(nowDate.getHours()),
			minute = addZero(nowDate.getMinutes()),
			second = addZero(nowDate.getSeconds())

	return `${year}${month}${day}${hour}${minute}${second}`
}

const pathSrc = './src'

export default () => {
	const files = fs.readdirSync(pathSrc)
	return files.forEach(item => {
		if (item.split('_').length < 2) {
			const newName = `${addTimeHash()}_${item}`;
			fs.renameSync(path.join(pathSrc, item), path.join(pathSrc, newName))
			console.log("✔", item, "=>", newName)
		}
	});
}