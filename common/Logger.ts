import { Timing } from './timing/Timing';

/**
 * An enum for verbosity of the logger.
 */
export enum Logging {
	Normal, Verbose, Warning
}

/**
 * The debugging settings, some console messages can be enabled.
 */
export class Logger {
	public static Verbosity = Logging.Verbose;
	public static ObjectLoggingOn: boolean = true;
	private static prefix: string = '';

	/**
	 * Makes debugging messages normal.
	 */
	public static NormalDebugging() {
		Logger.Verbosity = Logging.Normal;
	}

	/**
	 * Makes debugging messages verbose.
	 */
	public static VerboseLogging() {
		Logger.Verbosity = Logging.Verbose;
		Logger.ShowMessage('Verbose logging enabled!');
	}

	public static DisableObjectLogging(): void {
		Logger.ObjectLoggingOn = false;
	}

	public static SetPrefix(prefix: string): void {
		Logger.prefix = prefix;
	}

	/**
	 * Displays a debugging message.
	 * @param {string} message The message
	 */
	public static ShowMessage(message: string) {
		switch (Logger.Verbosity) {
			case Logging.Warning:
				break;
			case Logging.Verbose:
			case Logging.Normal:
				// tslint:disable-next-line:no-console
				console.log(`${Logger.prefix} ${Timing.Now} ${message}`);
				break;
			default:
				break;
		}
	}

	public static SpamMessage(message: string) {
		switch (Logger.Verbosity) {
			case Logging.Warning:
			case Logging.Normal:
				break;
			case Logging.Verbose:
				// tslint:disable-next-line:no-console
				console.log(`${Logger.prefix} ${Timing.Now} ${message}`);
				break;
			default:
				break;
		}
	}
}