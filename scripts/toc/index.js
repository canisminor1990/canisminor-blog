import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

const pathDist = './dist';

const sortNumber = (a, b) => b.split('_')[0] - a.split('_')[0];

export default (cb) => {
	const files = fs.readdirSync(pathDist);
	let tocData = [];
	files.sort(sortNumber).forEach(item => {
		if (item !== 'toc') {
			const newName = item.split('.')[0];
			fs.renameSync(path.join(pathDist, item), path.join(pathDist, newName));
			let data   = JSON.parse(fs.readFileSync(path.join(pathDist, newName)));
			const row  = 8;
			const body = data.body.split('\n\n');
			let cutRow = (body.length > row) ? row : body.length;
			let desc   = [];
			for (let i = 0; i <= cutRow; i++) {
				desc.push(body[i]);
			}
			let descStr = desc.join('\n\n');
			if (descStr.match(/```/g).length % 2 !== 0) {
				descStr         = _.compact(descStr.split('```'));
				let rightiIndex = (_.last(descStr).replace(/ |\n/g, '') === '') ? 2 : 1;
				descStr = _.dropRight(descStr, rightiIndex).join('```');
			}

			tocData.push({
				             filename: newName,
				             title   : data.title,
				             tag     : data.tag || '',
				             body    : descStr,
				             full    : body.length === row
			             });
		}
	});

	fs.writeFileSync(path.join(pathDist, 'toc'), JSON.stringify(tocData));
	cb();
}