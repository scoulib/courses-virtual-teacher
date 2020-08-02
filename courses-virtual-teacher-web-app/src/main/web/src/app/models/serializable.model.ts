import { Resource } from './resource.model';

/**
 * Interface qui permet de sérialiser et de désérialiser un objet en JSON
 */
export interface Serializable<T extends Resource> {
    /**
     * Convert json to object
     * @param json
     */
    fromJson(json: any): T;

    /**
     * Convert object to json
     * @param resource
     */
    toJson(resource: T): any;
}
