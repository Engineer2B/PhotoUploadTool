import * as path from 'path';

import { Settings } from '../../common/Settings';
import { Logger } from '../../common/Logger';
import * as fs from 'fs';
import { Directories } from '../../common/Directories';

const pSiteData = path.resolve(...Settings.USER.SitePath);

if (!fs.existsSync(pSiteData)) {
	throw new Error(`Path ${pSiteData} does not exist.`);
}
const pSiteGallery = path.resolve(...[pSiteData, 'gallery']);
const pSitePosts = path.resolve(...[pSiteGallery, '_posts']);
if (fs.existsSync(pSitePosts)) {
	fs.rmdirSync(pSitePosts, { recursive: true });
}
Directories.CopyFolderRecursiveSync(path.resolve(...['data', 'Cloudinary', '_posts']), path.resolve(...[pSiteData, 'gallery']));

const pSiteAlbums = path.resolve(...[pSiteData, '_data', 'Albums']);
if (fs.existsSync(pSiteAlbums)) {
	fs.rmdirSync(pSiteAlbums, { recursive: true });
}
const pSiteCloudinary = path.resolve(...[pSiteData, '_data', 'Cloudinary']);
if (fs.existsSync(pSiteCloudinary)) {
	fs.rmdirSync(pSiteCloudinary, { recursive: true });
}

Directories.CopyFolderRecursiveSync(path.resolve(...['data', 'Cloudinary', 'Albums']), path.resolve(...[pSiteData, '_data']));
fs.renameSync(pSiteAlbums, pSiteCloudinary);

Logger.ShowMessage('The end');