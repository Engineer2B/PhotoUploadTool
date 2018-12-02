import * as cloudinary from 'cloudinary';

export class Cloudinary {
	public static Upload(fileName, folderName): Promise<any> {
		return new Promise((resolve, reject) => {
			cloudinary.v2.uploader.upload(fileName, {
				folder: folderName
			},
				(error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
		});
	}
	public static GetAllResources(nextCursor?): Promise<any> {
		return new Promise((resolve, reject) => {
			cloudinary.v2.api.resources({ nextCursor: nextCursor, max_results: 500 },
				(error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
		});
	}
}