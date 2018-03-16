import RSS from 'rss';
import { join } from 'path';
import _ from 'lodash';
import moment from 'moment';
import marked from 'marked';
import fs from 'fs-extra';

const SITE     = 'canisminor.cc';
const pathDist = './dist';
marked.setOptions({
	                  renderer   : new marked.Renderer(),
	                  gfm        : true,
	                  tables     : true,
	                  breaks     : false,
	                  pedantic   : false,
	                  sanitize   : false,
	                  smartLists : true,
	                  smartypants: false
                  });

const feed = new RSS(
	{
		title         : 'CanisMinor',
		description   : '来自 CanisMinor 博客的订阅信息 - CanisMinor RSS Feed',
		site_url      : 'https://' + SITE,
		feed_url      : 'https://' + join(SITE, 'rss.xml'),
		image_url     : 'https://' + join(SITE, 'favicons/favicon-32x32.png'),
		managingEditor: 'CanisMinor',
		webMaster     : 'CanisMinor',
		copyright     : 'CanisMinor 2018 版权所有',
		language      : 'zh-cn',
		categories    : ['design', 'coding', 'ued', 'fe', 'ui/ux']
	});

export default cb => {

	const Toc = JSON.parse(fs.readFileSync(join(pathDist, 'toc')));

	_.forEach(Toc, item => {
		feed.item(
			{
				title      : item.title,
				description: marked(item.body) + '...',
				url        : `https://${join(SITE, 'blog', item.filename)}?source=feed`,
				author     : 'CanisMinor',
				categories : item.tag,
				date       : moment(item.filename.split(/_/g)[0], 'YYYYMMDDhhmmss').format()
			});
	});

	fs.writeFileSync(join(pathDist, 'rss.xml'), feed.xml());
	cb();
}