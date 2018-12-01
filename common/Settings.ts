import { ReadWrite } from './ReadWrite';
import { PackageJSON } from '../typings/common/package.json';
import { Directories } from './Directories';
import * as sharp from 'sharp';

export class Settings {
	public static SMALL_FILE_LIMIT = 750000;

	public static get APPNAME(): string {
		if (Settings.package_JSON === undefined) {
			Settings.package_JSON = ReadWrite.ReadFromJSONFile<PackageJSON>(Directories.PROJECT, 'package.json');
		}

		return Settings.package_JSON.name;
	}

	public static get SHARP_SUPPORTED_EXTENSIONS(): string[] {
		if (Settings.sharp_supported_extensions === undefined) {
			Settings.sharp_supported_extensions = Object.keys(sharp.format).concat(['jpg']);
		}

		return Settings.sharp_supported_extensions;
	}

	protected static package_JSON: PackageJSON;
	protected static sharp_supported_extensions: string[];
}