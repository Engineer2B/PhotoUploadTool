import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

export class Prompt {
	protected static readLine = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	public static AskForPath(reason: string, callbackFn: (inPath: string, inFolder: string) => any): void {
		Prompt.readLine.question(`Path where ${reason}:`, pathName => {
			if (!fs.existsSync(pathName)) {
				Prompt.AskForPath(reason, callbackFn);
			}
			callbackFn(pathName, path.basename(pathName));
		});
	}
}
