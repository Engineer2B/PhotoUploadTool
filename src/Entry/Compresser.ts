import * as sharp from 'sharp';
import { ReadWrite } from '../../common/ReadWrite';
import { Directories } from '../../common/Directories';
import { Prompt } from '../Input/Prompt';
import * as fs from 'fs';
import * as path from 'path';
import { Settings } from '../../common/Settings';
import { Logger } from '../../common/Logger';

sharp.queue.on('change', queueLength => {
	Logger.ShowMessage(`Queue contains ${queueLength} task(s)`);
	if (queueLength === 0) {
		process.exit(0);
	}
});
Prompt.AskForPath('from which pictures are to be compressed', (pathName, folderName) => {
	const outputRoot = Directories.JoinPathStrings([pathName, '..', `${folderName}-compressed`]);
	ReadWrite.MakeDirectory(outputRoot);
	ReadWrite.ForAllFiles(pathName, pathName, (rootPath, entryPath, innerEntry) => {
		if (Settings.SHARP_SUPPORTED_EXTENSIONS.includes(path.extname(innerEntry).replace('.', '').toLowerCase())) {
			const differencePath = path.relative(rootPath, entryPath);
			const differencePathFolders = differencePath.split(path.sep);
			differencePathFolders.reduce<string>((totalPath, newEntry) => {
				const intermediatePath = Directories.JoinPathStrings([totalPath, newEntry]);
				ReadWrite.MakeDirectory(intermediatePath);

				return intermediatePath;
			}, outputRoot);
			const outputPath = Directories.JoinPathStrings([outputRoot, differencePath]);
			const outFileName = Directories.JoinPathStringsAndFileName([outputPath], innerEntry);
			const inFileName = Directories.JoinPathStringsAndFileName([entryPath], innerEntry);
			const stats = fs.statSync(inFileName);
			if (stats.size > Settings.USER.SmallFileLimit) {
				sharp(inFileName)
					.jpeg({
						quality: 70
					})
					.toFile(outFileName);
			} else {
				fs.copyFileSync(inFileName, outFileName);
			}
		}
	});
});
