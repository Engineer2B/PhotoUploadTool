import * as cloudinary from 'cloudinary';
import { EventEmitter } from 'events';

import { Directories } from '../../common/Directories';
import { ReadWrite } from '../../common/ReadWrite';
import { Settings } from '../../common/Settings';
import { Delay } from '../../common/timing/Delay';
import { WithRetries } from '../Action/WithRetries';
import { Cloudinary } from '../Repository/Cloudinary';
import { Logger } from '../../common/Logger';

cloudinary.v2.config({
	cloud_name: Settings.USER.Cloudinary.CloudName,
	api_key: Settings.USER.Cloudinary.Key,
	api_secret: Settings.USER.Cloudinary.Secret
});

const action = (next_cursor, firstVal) => WithRetries.TryGetAllResources(Cloudinary, next_cursor, Delay.Constant(Settings.USER.Cloudinary.Delay.Time, Settings.USER.Cloudinary.Delay.Retries))
	.then(result => {
		emitter.emit('retrievalSuccesful', { Data: result, PreviousCursor: next_cursor, PreviousFirstValue: firstVal });
	});

const emitter = new EventEmitter();
emitter.on('retrievalSuccesful', result => {
	result.Data.resources.forEach(resource => {
		allData.push(resource);
	});

	if (!result.Data.next_cursor || (result.PreviousFirstValue !== undefined && result.PreviousFirstValue.url === result.Data.resources[0].url)) {
		const outPath = Directories.JoinPathStrings([Directories.DATA, 'Cloudinary']);
		ReadWrite.WriteToJSONFile(allData, outPath, 'AllResources');
		Logger.ShowMessage(`Resources file generated; "${outPath}AllResource.json".`);
		Logger.ShowMessage(`Next step: generate album posts...`);
		process.exit(0);
	}
	action(result.Data.next_cursor, result.Data.resources[0]);
});

let allData = [];

action(undefined, undefined);