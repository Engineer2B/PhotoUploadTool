import { Directories } from '../../common/Directories';
import { ReadWrite } from '../../common/ReadWrite';
import { Resource } from '../Model/Resource';
import { writeFileSync } from 'fs';
import { Logger } from '../../common/Logger';
import * as fs from 'fs';

const allResources = ReadWrite.ReadFromJSONFile<Resource[]>(Directories.JoinPathStrings([Directories.DATA, 'Cloudinary']), 'AllResources');

const outResources = {};
allResources.forEach(resource => {
	const albumName = resource.public_id.replace(/(.*?)\/.*/, '$1');
	const relativeFileName = resource.url.replace(/.*?upload\/(.*)/, '$1');
	if (!outResources[albumName]) {
		outResources[albumName] = [];
	}
	outResources[albumName].push(relativeFileName);
});
const pLocalPosts = Directories.JoinPathStrings([Directories.DATA, 'Cloudinary', '_posts']);
if (fs.existsSync(pLocalPosts)) {
	fs.rmdirSync(pLocalPosts, { recursive: true });
}
fs.mkdirSync(pLocalPosts);
const pLocalAlbums = Directories.JoinPathStrings([Directories.DATA, 'Cloudinary', 'Albums']);
if (fs.existsSync(pLocalAlbums)) {
	fs.rmdirSync(pLocalAlbums, { recursive: true });
}
fs.mkdirSync(pLocalAlbums);
Object.keys(outResources)
	.forEach(albumKey => {
		const albumRegex = new RegExp(/(\d+)[ |\-].*/gm);
		const isOtherAlbum = !albumRegex.test(albumKey);
		let yearString = albumKey.replace(/(\d+)[\s|\-].*/gm, '$1');
		if (isOtherAlbum) {
			yearString = 'Other';
		}
		const yearRegex = new RegExp(`${yearString}[\-| ](.*)`);
		let albumName = albumKey.replace(yearRegex, '$1').replace(/\'/gm, '');
		const monthDayRegex = new RegExp(/(\d+-\d+).*/gm);
		if (!monthDayRegex.test(albumName)) {
			albumName = `01-01 ${albumName}`;
		}
		const postName = `${yearString}-${albumName}.md`.replace(/ /gm, '-').toLowerCase();
		const monthDayString = albumName.replace(/(\d+-\d+).*/, '$1');
		const postURL = postName.replace(new RegExp(`${yearString}-${monthDayString}-(.*?).md`), '$1');
		const [month, day] = monthDayString.split('-');
		const albumValues = {
			year: isOtherAlbum ? '' : yearString,
			urls: outResources[albumKey],
			short_name: `${albumName.replace(/\d+-\d+\s+(.*)/, '$1')}`,
			long_name: `${albumName.replace(/\d+-\d+\s+(.*)/, '$1')} ${day !== undefined ? day + '-' + month + '-' + yearString : ''}`,
			post: postURL,
			date: `${yearString}-${monthDayString}`,
			thumbnail: `${outResources[albumKey][0]}`
		};
		const jsonOutFolder = Directories.JoinPathStrings([Directories.DATA, 'Cloudinary', 'Albums', yearString]);
		ReadWrite.WriteToJSONFile(albumValues, jsonOutFolder, albumName.toLowerCase());
		Logger.ShowMessage(`Wrote .json files to "${jsonOutFolder}".`);
		const postString = `---\r\n` +
			`tags: []\r\n` +
			`---\r\n` +
			`<div itemscope itemtype="http://schema.org/Photograph">\r\n` +
			`  <h1>{{site.data.Cloudinary['${yearString}']['${albumName.replace(/\s/gm, '_').toLowerCase()}'].short_name}}</h1>\r\n` +
			`  <h2 class="event-date">{{site.data.Cloudinary['${yearString}']['${albumName.replace(/\s/gm, '_').toLowerCase()}'].date}}</h2>\r\n` +
			`  {% for url in site.data.Cloudinary['${yearString}']['${albumName.replace(/\s/gm, '_').toLowerCase()}'].urls %}\r\n` +
			`    <a itemprop="image" class="swipebox" title="" href="{{ site.cloudinary.baseurl }}/{{ url }}">\r\n` +
			`      <img alt="" itemprop="thumbnailUrl" src="{{ site.cloudinary.baseurl }}/h_150/{{ url }}" />\r\n` +
			`      <meta itemprop="isFamilyFriendly" content="true" />\r\n` +
			`    </a>\r\n` +
			`  {% endfor %}\r\n` +
			`</div>\r\n`;
		const postFilePath = Directories.JoinPathStrings([pLocalPosts, postName]);
		writeFileSync(postFilePath, postString, { encoding: 'utf8' });
		Logger.ShowMessage(`Wrote .md files to "${postFilePath}".`);
	});
Logger.ShowMessage(`Album posts generated...`);
Logger.ShowMessage(`Next step: move assets.`);

process.exit(0);