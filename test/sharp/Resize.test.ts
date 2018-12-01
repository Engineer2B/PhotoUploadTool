import * as assert from 'assert';
import * as sharp from 'sharp';
import { Directories } from '../../common/Directories';

describe('Resize', () => {
	it('test pattern', done => {
		sharp(Directories.DirPlusFileName(Directories.DATA, 'test-pattern-152459_1280.png'))
			.metadata((err, metaData) => {
				assert.equal(metaData.width, 1280);
				assert.equal(metaData.height, 800);
				done();
			});
	});
});
