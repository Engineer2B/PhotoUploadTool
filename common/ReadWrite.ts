import * as fs from 'fs';
import * as path from 'path';

import { Directories } from './Directories';

/**
 * This class reads and writes json objects to files.
 */
export class ReadWrite {

	/**
	 * Read the contents of the file.
	 * @param {string} fileDir The directory of the file.
	 * @param {string} fileName The name of the file.
	 * @returns {G} The output.
	 */
	public static ReadFromJSONFile<G>(fileDir: string, fileName: string): G {
		const filePath = path.join(fileDir, fileName + '.json');
		if (fs.existsSync(filePath)) {
			const stringImport = fs.readFileSync(filePath, 'utf8');

			return JSON.parse(stringImport);
		} else {
			return undefined;
		}
	}

	/**
	 * Write the contents to the file.
	 * @param {any} exportedObject The object that is to be exported.
	 * @param {string} fileDir The directory of the file.
	 * @param {string} fileName The name of the file.
	 */
	public static WriteToJSONFile(exportedObject: any, fileDir: string, fileName: string): void {
		ReadWrite.MakeDirectory(fileDir);
		const filePath = path.join(fileDir, fileName + '.json');
		const exportString = JSON.stringify(exportedObject);
		fs.writeFileSync(filePath, exportString, { encoding: 'utf8' });
	}

	/**
	 * Checks whether a directory exists, then creates it.
	 * @param {string} dirPath Path to the new directory.
	 */
	public static MakeDirectory(dirPath: string): void {
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath);
		}
	}

	public static ForAllFiles(rootPath: string, entryPath: string, cb: (rootPath: string, entryPath: string, innerEntry: string) => any) {
		ReadWrite.forAllEntries(rootPath, entryPath, fs.readdirSync(entryPath), cb);
	}

	protected static forAllEntries(rootPath, entryPath, innerEntries, cb: (rootPath: string, entryPath: string, innerEntry: string) => any) {
		innerEntries.forEach(innerEntry => {
			const dirName = Directories.JoinPathStrings([entryPath, innerEntry]);
			const stats = fs.statSync(dirName);
			if (stats.isDirectory()) {
				ReadWrite.ForAllFiles(rootPath, dirName, cb);
			} else {
				cb(rootPath, entryPath, innerEntry);
			}
		});
	}
}
