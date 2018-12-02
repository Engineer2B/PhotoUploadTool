import { Delay } from '../../common/timing/Delay';
import { Logger } from '../../common/Logger';
import { Timing } from '../../common/timing/Timing';

export class WithRetries {
	public static TryUpload<TResult>(repo, fileName: string, folderName, delay: Delay): Promise<TResult> {
		const action = changedDelay => WithRetries.TryUpload(repo, fileName, folderName, changedDelay);

		return repo.Upload(fileName, folderName)
			.then(result => {
				Logger.SpamMessage(`Upload successful @ server time: ${result.created_at} public id: ${result.public_id} secure link: ${result.secure_url}`);
			})
			.catch(error => {
				if (error.http_code === 499) {
					Logger.ShowMessage(`Server unavailable retries left: ${delay.Retries}.`);

					return Timing.DelayWithAction(delay, action, error);
				}
			});
	}

	public static TryGetAllResources<TResult>(repo, next_cursor, delay: Delay): Promise<TResult> {
		const action = changedDelay => WithRetries.TryGetAllResources(repo, next_cursor, changedDelay);

		return repo.GetAllResources(next_cursor)
			.catch(error => {
				if (error.http_code === 499) {
					Logger.ShowMessage(`Server unavailable retries left: ${delay.Retries}.`);

					return Timing.DelayWithAction(delay, action, error);
				}
			});
	}
}
