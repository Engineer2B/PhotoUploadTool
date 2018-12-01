import * as assert from 'assert';
import { Directories } from '../../common/Directories';
import { ReadWrite } from '../../common/ReadWrite';
import { Logger } from '../../common/Logger';

describe('ReadWrite', () => {
	const testDataDirectory = Directories.JoinPathStrings([Directories.DATA, 'test']);
	it('should list all files', () => {
		ReadWrite.ForAllFiles(testDataDirectory, testDataDirectory,
			(rootPath, entryPath, innerEntry) => {
				assert.equal(rootPath, testDataDirectory);
				Logger.ShowMessage(`Root path: ${rootPath}`);
				Logger.ShowMessage(`Entry path: ${entryPath}`);
				Logger.ShowMessage(`Inner entry: ${innerEntry}`);
			});
	});
});
