// tslint:disable-next-line:no-require-imports
import Jasmine = require('jasmine');
// tslint:disable-next-line:no-require-imports
import spec = require('jasmine-spec-reporter');
import { JasmineConfiguration } from './JasmineConfiguration';

const argvObject = JasmineConfiguration.ParseArguments(process.argv);
const jasmine = new Jasmine(argvObject);
jasmine.loadConfig({
	spec_dir: 'test',
	spec_files: [
		argvObject.SpecFiles
	]
});

const specReporter = new spec.SpecReporter({
	colors: {
		enabled: true
	},
	spec: { displayStacktrace: spec.StacktraceOption.PRETTY },
	summary: { displayDuration: true },
});

jasmine.env.addReporter(specReporter);

jasmine.onComplete(passed => {
	if (passed) {
		console.log('All specs have passed');
	} else {
		console.log('At least one spec has failed');
	}
});

jasmine.execute();
