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
}