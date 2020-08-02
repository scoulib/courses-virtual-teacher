import { v4 as uuid } from 'uuid';

export class Resource {
    public id: string = uuid();
}
