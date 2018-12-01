import { ReadWrite } from './ReadWrite';
import { PackageJSON } from '../typings/common/package.json';
import { Directories } from './Directories';
import * as sharp from 'sharp';
import { UserJSON } from '../typings/common/user.json';

export class Settings {
	public static get USER(): UserJSON {
		if (Settings.user === undefined) {
			Settings.user = ReadWrite.ReadFromJSONFile<UserJSON>(Directories.PROJECT, 'user.json');
		}

		return Settings.user;
	}

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
	protected static user: UserJSON;
}