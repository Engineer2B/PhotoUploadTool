export class Delay {
	/**
	 * The delay time.
	 */
	public get Time(): number {
		return this.time;
	}

	/**
	 * The next delay will take time+increase time units.
	 */
	public get Increase(): number {
		return this.increase;
	}

	/**
	 * Number of retries left.
	 */
	public get Retries(): number {
		return this.retries;
	}

	private constructor(private readonly time: number,
		private readonly increase: number,
		private readonly retries: number) {
	}

	/**
	 * Delay an action with a constant delay.
	 * @param {number} time Time of delay. [s]
	 * @param {number} retries Number of retries.
	 */
	public static Constant(time: number, retries: number): Delay {
		return new Delay(time, 0, retries);
	}

	/**
	 * Delay an action with an increasing delay.
	 * @param {number} time Time of delay. [s]
	 * @param {number} increase The amount the delay increases with. [s]
	 * @param {number} retries Number of retries.
	 */
	public static Increasing(time: number, increase: number, retries: number): Delay {
		return new Delay(time, increase, retries);
	}

	public Next(): Delay {
		return new Delay(this.time + this.increase, this.increase, this.retries - 1);
	}
}