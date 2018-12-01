export interface PackageJSON {
	name: string;
	version: string;
	description: string;
	main: string;
	dependencies: { [index: string]: string };
	devdependencies: { [index: string]: string; };
	scripts: { [index: string]: string; };
	keywords: string[];
	author: string;
	license: string;
}
