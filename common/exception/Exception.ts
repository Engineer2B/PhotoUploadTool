export class Exception extends Error {
	public constructor(
		public message: string = '',
		public innerException?: Exception) {
		super(message);
		// Guard against throw Exception(...) usage.
		if (!(this instanceof Exception)) {
			return new Exception(message, innerException);
		}
		this.stack = new Error(message).stack;
		this.name = 'Exception';
	}

	public ToString(level = 1): string {
		return `${level} level${level > 1 ? 's' : ''} deep)\n${this.stack}\n${this.innerException ? this.innerException.ToString(level + 1) : ''}`;
	}
}
