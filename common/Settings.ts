import { ReadWrite } from './ReadWrite';
import { PackageJSON } from '../typings/common/package.json';
import { Directories } from './Directories';

export class Settings {
	public static get APPNAME(): string {
		if (Settings.packageJSON === undefined) {
			Settings.packageJSON = ReadWrite.ReadFromJSONFile<PackageJSON>(Directories.PROJECT, 'package.json');
		}

		return Settings.packageJSON.name;
	}

	protected static packageJSON: PackageJSON;
}