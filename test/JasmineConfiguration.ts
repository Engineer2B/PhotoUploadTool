export class JasmineConfiguration {
	public static ParseArguments(argv: string[]): { [key: string]: any } {
		const outputValue = {};
		const tests = [
			{ reg: /^spec_files=(.*)$/, key: "SpecFiles" }
		];
		argv.slice(2).forEach(argument => {
			tests.forEach(test => {
				const result = test.reg.exec(argument);
				if (result && result.length > 1) {
					outputValue[test.key] = result[1];

					return;
				}
			});
		});

		return outputValue;
	}
}