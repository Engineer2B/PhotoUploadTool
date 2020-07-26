import { IResource } from './IResource';

export class Resource implements IResource {
	public public_id: string;
	public format: string;
	public version: number;
	public resource_type: string;
	public type: string;
	public created_at: string;
	public bytes: number;
	public width: number;
	public height: number;
	public url: string;
	public secure_url: string;

}