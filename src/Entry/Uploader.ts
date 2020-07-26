import * as cloudinary from 'cloudinary';
import { Settings } from '../../common/Settings';
import { Prompt } from '../Input/Prompt';
import { Directories } from '../../common/Directories';
import { ReadWrite } from '../../common/ReadWrite';
import * as path from 'path';
import { Delay } from '../../common/timing/Delay';
import { Cloudinary } from '../Repository/Cloudinary';
import { WithRetries } from '../Action/WithRetries';
import { EventEmitter } from 'events';

cloudinary.v2.config({
	cloud_name: Settings.USER.Cloudinary.CloudName,
	api_key: Settings.USER.Cloudinary.Key,
	api_secret: Settings.USER.Cloudinary.Secret
});

const emitter = new EventEmitter();
emitter.on('uploadSuccessful', () => {
	uploadsActive--;
	if (uploadsActive === 0) {
		process.exit(0);
	}
});
let uploadsActive = 0;
Prompt.AskForPath('from which pictures are to be uploaded', (pathName, _folderName) => {
	ReadWrite.ForAllFiles(pathName, pathName, (rootPath, entryPath, innerEntry) => {
		const differencePath = path.relative(rootPath, entryPath);
		const differencePathFolders = differencePath.split(path.sep);
		const folderName = differencePathFolders[0];
		const inFileName = Directories.JoinPathStringsAndFileName([entryPath], innerEntry);
		uploadsActive++;
		WithRetries.TryUpload(Cloudinary, inFileName, folderName, Delay.Constant(Settings.USER.Cloudinary.Delay.Time, Settings.USER.Cloudinary.Delay.Retries))
			.then(() => {
				emitter.emit('uploadSuccessful');
			});
	});
});
