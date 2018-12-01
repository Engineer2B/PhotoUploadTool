import * as assert from 'assert';
import * as sharp from 'sharp';
import { Directories } from '../../common/Directories';
import * as fs from 'fs';

describe('Resize', () => {
	const testDataDirectory = [Directories.DATA, 'test'];
	const imageDirectory = Directories.JoinPathStringsAndFileName(testDataDirectory, 'test-pattern-152459_1280.png');
	const outImage = Directories.JoinPathStringsAndFileName(testDataDirectory, 'test-pattern-152459_1280-resized.png');
	const original = { width: 1280, height: 800 };
	const adjusted = { width: 100, height: 100 };
	it('should yield image with changed dimensions', done => {
		sharp(imageDirectory)
			.metadata((_metadataError, metadata) => {
				assert.equal(metadata.width, original.width);
				assert.equal(metadata.height, original.height);
			})
			.resize(adjusted.width, adjusted.height)
			.toFile(outImage,
				(_outputError, _info) => {
					sharp(outImage)
						.metadata((_metadataError, metadata) => {
							assert.equal(metadata.width, adjusted.width);
							assert.equal(metadata.height, adjusted.height);
							done();
						});
				});
	});
	afterAll(done => {
		fs.unlink(outImage, err => { done(); });
	});
});
