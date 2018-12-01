import * as path from 'path';
import { ReadWrite } from './ReadWrite';

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

	public static JoinPathStringsAndFileName(pathStrings: string[], fileName: string): string {
		const directory = Directories.JoinPathStrings(pathStrings);

		return path.join.apply(undefined, [directory].concat(fileName));
	}

	public static JoinPathStrings(pathStrings: string[]): string {
		return path.join.apply(undefined, pathStrings);
	}
}
