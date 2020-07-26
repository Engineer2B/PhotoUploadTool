import * as path from 'path';
import { ReadWrite } from './ReadWrite';
import * as fs from 'fs';

/**
 * Stores the directory information.
 */
export class Directories {
	/**
	 * The directory of this file.
	 */
	public static THIS_FILE = __dirname;
	/**
	 * The root directory of the disk where this solution is located.
	 */
	public static SYSTEM_ROOT = path.parse(__dirname).root;

	/**
	 * This project's directory.
	 */
	public static PROJECT = path.resolve(__dirname, '..');

	/**
	 * The logging directory.
	 */
	public static LOGGING = path.join(path.parse(__dirname).root, 'Log', 'PhotoUploadTool');

	/**
	 *The data directory.
	 */
	public static DATA = path.resolve(__dirname, '..', 'data');

	/**
	 * The dropbox directory.
	 */
	public static get DROPBOX(): string {
		if (Directories.dropbox === undefined) {
			Directories.dropbox = ReadWrite.ReadFromJSONFile<{
				personal: {
					path: string;
				}
			}>(`${process.env.LOCALAPPDATA}\\Dropbox`, 'info').personal.path;
		}

		return Directories.dropbox;
	}

	protected static dropbox: string;

	public static CopyFolderRecursiveSync(source: string, target: string) {
		// Check if folder needs to be created or integrated
		const targetFolder = path.join(target, path.basename(source));
		if (!fs.existsSync(targetFolder)) {
			fs.mkdirSync(targetFolder);
		}

		// Copy
		if (fs.lstatSync(source).isDirectory()) {
			const files = fs.readdirSync(source);
			files.forEach((file: string) => {
				const curSource = path.join(source, file);
				if (fs.lstatSync(curSource).isDirectory()) {
					this.CopyFolderRecursiveSync(curSource, targetFolder);
				} else {
					this.CopyFileSync(curSource, targetFolder);
				}
			});
		}
	}

	public static CopyFileSync(source: string, target: string) {
		let targetFile = target;

		// If target is a directory a new file with the same name will be created
		if (fs.existsSync(target)) {
			if (fs.lstatSync(target).isDirectory()) {
				targetFile = path.join(target, path.basename(source));
			}
		}

		fs.writeFileSync(targetFile, fs.readFileSync(source));
	}

	public static JoinPathStringsAndFileName(pathStrings: string[], fileName: string): string {
		const directory = Directories.JoinPathStrings(pathStrings);

		return path.join.apply(undefined, [directory].concat(fileName));
	}

	public static JoinPathStrings(pathStrings: string[]): string {
		return path.join.apply(undefined, pathStrings);
	}
}
