import * as cloudinary from 'cloudinary';
import { Settings } from '../../common/Settings';
import { Delay } from '../../common/timing/Delay';
import { Cloudinary } from '../Repository/Cloudinary';
import { WithRetries } from '../Action/WithRetries';
import { EventEmitter } from 'events';
import { ReadWrite } from '../../common/ReadWrite';
import { Directories } from '../../common/Directories';

cloudinary.config({
	cloud_name: Settings.USER.Cloudinary.CloudName,
	api_key: Settings.USER.Cloudinary.Key,
	api_secret: Settings.USER.Cloudinary.Secret
});

const action = next_cursor => WithRetries.TryGetAllResources(Cloudinary, next_cursor, Delay.Constant(Settings.USER.Cloudinary.Delay.Time, Settings.USER.Cloudinary.Delay.Retries))
	.then(result => {
		emitter.emit('retrievalSuccesful', result);
	});

const emitter = new EventEmitter();
emitter.on('retrievalSuccesful', result => {
	result.resources.forEach(resource => {
		allData.push(resource);
	});
	if (!result.next_cursor) {
		ReadWrite.WriteToJSONFile(allData, Directories.JoinPathStrings([Directories.DATA, 'Cloudinary']), 'AllResources');
		process.exit(0);
	}
	action(result.next_cursor);
});

let allData = [];

action(undefined);