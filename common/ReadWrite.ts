import * as fs from 'fs';
import * as path from 'path';

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
		ReadWrite.mkDir(fileDir);
		const filePath = path.join(fileDir, fileName + '.json');
		const exportString = JSON.stringify(exportedObject);
		fs.writeFileSync(filePath, exportString, { encoding: 'utf8' });
	}

	/**
	 * Checks whether a directory exists, then creates it.
	 * @param {string} dirPath Path to the new directory.
	 */
	protected static mkDir(dirPath: string): void {
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath);
		}
	}
}
