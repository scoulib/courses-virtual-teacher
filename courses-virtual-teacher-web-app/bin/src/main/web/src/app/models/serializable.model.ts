import { Resource } from './resource.model';

export interface Serializable<T extends Resource> {
    fromJson(json: any): T;
    toJson(resource: T): any;
}
