export interface UserJSON {
	SmallFileLimit: number;
	Cloudinary: {
		CloudName: string;
		Key: number;
		Secret: string;
		Delay: {
			Time: number,
			Retries: number
		}
	};
	SitePath: string[];
}
